export type AIProvider = 'cerebras' | 'gemini';

export type CerebrasModel = 'gpt-oss-120b' | 'gemma-4-31b' | 'zai-glm-4.7';

export type GeminiModel = 'gemini-2.5-flash' | 'gemini-3.5-flash-lite';

export type RoleLevel = 'Senior Software Engineer' | 'Staff / Lead Engineer' | 'Fullstack Product Engineer' | 'AI / Machine Learning Engineer' | 'Engineering Manager / Director';

export type OptimizationLevel = 'Aggressive ATS Match (95%+ Target)' | 'Balanced Technical Depth' | 'Executive Impact & Metrics Focus';

export interface AISettings {
  provider: AIProvider;
  cerebrasModel: CerebrasModel;
  geminiModel: GeminiModel;
  cerebrasApiKey: string;
  geminiApiKey: string;
}

export interface OptimizationRequest {
  latexCode: string;
  jobDescription: string;
  targetRole: RoleLevel;
  companyTarget: string;
  optimizationLevel: OptimizationLevel;
}

export interface KeyChange {
  section: string;
  originalBullet: string;
  optimizedBullet: string;
  reason: string;
  sourceGrounded: boolean;
}

export interface OptimizationResult {
  tailoredLatex: string;
  beforeAtsScore: number;
  afterAtsScore: number;
  matchedKeywords: string[];
  missingKeywordsAdded: string[];
  keyChanges: KeyChange[];
  executiveSummary: string;
}
