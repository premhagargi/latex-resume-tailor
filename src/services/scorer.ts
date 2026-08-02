// A simple list of common tech keywords to look for if no NLP is available.
// In a real app, you might use a more comprehensive dictionary or tf-idf.
const TECH_KEYWORDS = new Set([
  'react', 'typescript', 'javascript', 'node.js', 'python', 'java', 'c++', 'c#', 'go', 'rust',
  'aws', 'gcp', 'azure', 'docker', 'kubernetes', 'ci/cd', 'git', 'sql', 'nosql', 'mongodb',
  'postgresql', 'redis', 'graphql', 'rest', 'api', 'microservices', 'machine learning', 'ai',
  'data structures', 'algorithms', 'system design', 'agile', 'scrum', 'next.js', 'tailwind',
  'redux', 'express', 'django', 'flask', 'spring boot', 'kafka', 'rabbitmq', 'elasticsearch'
]);

export interface ScoreResult {
  score: number;
  matched: string[];
  missing: string[];
}

export function extractKeywords(text: string): string[] {
  if (!text) return [];
  const normalized = text.toLowerCase();
  const found = Array.from(TECH_KEYWORDS).filter(kw => {
    // Basic word boundary regex, escaping special chars like . or + in keywords
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(normalized);
  });
  return found;
}

export function calculateAtsScore(resumeText: string, jobDescription: string): ScoreResult {
  if (!resumeText || !jobDescription) {
    return { score: 0, matched: [], missing: [] };
  }

  const jdKeywords = extractKeywords(jobDescription);
  if (jdKeywords.length === 0) {
    return { score: 50, matched: [], missing: [] }; // Neutral score if no keywords found
  }

  const resumeKeywords = extractKeywords(resumeText);
  
  const matched = jdKeywords.filter(kw => resumeKeywords.includes(kw));
  const missing = jdKeywords.filter(kw => !resumeKeywords.includes(kw));

  // Base score 40, up to 60 points for keyword matches
  const matchRatio = matched.length / jdKeywords.length;
  const score = Math.min(100, Math.round(40 + (matchRatio * 60)));

  return { score, matched, missing };
}
