import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { AISettings, OptimizationRequest, OptimizationResult } from '../types';
import { buildOptimizationPrompt } from '../prompts/tailor';
import { calculateAtsScore } from './scorer';
import { preserveLatexSyntax } from './parser';

export async function optimizeLatexResume(
  request: OptimizationRequest,
  settings: AISettings
): Promise<OptimizationResult> {
  const currentScore = calculateAtsScore(request.latexCode, request.jobDescription);
  
  const basePrompt = buildOptimizationPrompt(request);
  const prompt = `${basePrompt}

CURRENT REAL-TIME ATS SCORE: ${currentScore.score}/100
CURRENT MATCHED KEYWORDS: ${currentScore.matched.join(', ')}
MISSING CRITICAL KEYWORDS: ${currentScore.missing.join(', ')}

Please use these actual metrics as your baseline for "beforeAtsScore" and ensure you integrate the missing keywords organically.`;

  let attempts = 0;
  const MAX_ATTEMPTS = 2;
  
  while (attempts < MAX_ATTEMPTS) {
    attempts++;
    try {
      let result: OptimizationResult;
      if (settings.provider === 'cerebras') {
        result = await callCerebras(prompt, settings);
      } else {
        result = await callGemini(prompt, settings);
      }

      // Preserve the structure just in case the LLM truncated the preamble
      if (result.tailoredLatex) {
        result.tailoredLatex = preserveLatexSyntax(request.latexCode, result.tailoredLatex);
      }
      
      // Validation Guard
      if (!validateContactInfo(request.latexCode, result.tailoredLatex)) {
        throw new Error('Something went wrong — the output didn\'t preserve your original details. Please try again.');
      }

      return result;
    } catch (err: any) {
      if (attempts >= MAX_ATTEMPTS) {
        throw err;
      }
      console.warn(`Optimization attempt ${attempts} failed. Retrying...`, err);
    }
  }
  
  throw new Error('Optimization failed after retries.');
}

function validateContactInfo(original: string, tailored: string): boolean {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/gi;
  const originalEmails = original.match(emailRegex) || [];
  
  const tailoredLower = tailored.toLowerCase();
  for (const email of originalEmails) {
    if (!tailoredLower.includes(email.toLowerCase())) {
      console.error(`Validation failed: missing ${email}`);
      return false;
    }
  }
  return true;
}

async function callCerebras(
  prompt: string,
  settings: AISettings
): Promise<OptimizationResult> {
  const apiKey = settings.cerebrasApiKey;
  if (!apiKey) {
    throw new Error('Cerebras API key is missing. Please enter it in Settings.');
  }

  const client = new Cerebras({ apiKey });
  const response: any = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: settings.cerebrasModel || 'gpt-oss-120b',
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  const content = response?.choices?.[0]?.message?.content || '';
  return parseResultJson(content);
}

async function callGemini(
  prompt: string,
  settings: AISettings
): Promise<OptimizationResult> {
  const apiKey = settings.geminiApiKey;
  if (!apiKey) {
    throw new Error('Gemini API key is missing. Please enter it in Settings.');
  }

  const modelName = settings.geminiModel === 'gemini-2.5-flash' ? 'gemini-2.5-flash' : 'gemini-3.5-flash-lite';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return parseResultJson(textContent);
}

function parseResultJson(text: string): OptimizationResult {
  try {
    let cleanText = text.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    const parsed = JSON.parse(cleanText);

    return {
      tailoredLatex: parsed.tailoredLatex || '',
      beforeAtsScore: Number(parsed.beforeAtsScore) || 60,
      afterAtsScore: Number(parsed.afterAtsScore) || 95,
      matchedKeywords: Array.isArray(parsed.matchedKeywords) ? parsed.matchedKeywords : [],
      missingKeywordsAdded: Array.isArray(parsed.missingKeywordsAdded) ? parsed.missingKeywordsAdded : [],
      keyChanges: Array.isArray(parsed.keyChanges) ? parsed.keyChanges.map((kc: any) => ({
        section: kc.section || '',
        originalBullet: kc.originalBullet || '',
        optimizedBullet: kc.optimizedBullet || '',
        reason: kc.reason || '',
        sourceGrounded: !!kc.sourceGrounded
      })) : [],
      executiveSummary: parsed.executiveSummary || 'Resume tailored successfully.'
    };
  } catch (err: any) {
    console.error('Failed to parse AI output JSON:', err, text);
    throw new Error('Failed to parse AI response. Please try again or switch model.');
  }
}
