import { useState, useEffect } from 'react';
import type { AISettings, RoleLevel, OptimizationLevel, OptimizationResult } from './types';
import { SAMPLE_LATEX_RESUME, SAMPLE_JOB_DESCRIPTION } from './templates/sampleResume';
import { optimizeLatexResume } from './services/ai';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { SettingsModal } from './components/SettingsModal';
import { AlertTriangle } from 'lucide-react';

const DEFAULT_SETTINGS: AISettings = {
  provider: 'cerebras',
  cerebrasModel: 'gpt-oss-120b',
  geminiModel: 'gemini-2.5-flash',
  cerebrasApiKey: import.meta.env.VITE_CEREBRAS_API_KEY || '',
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
};

export function App() {
  const [settings, setSettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('resumatch_ai_settings');
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [latexCode, setLatexCode] = useState(SAMPLE_LATEX_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [targetRole, setTargetRole] = useState<RoleLevel>('Senior Software Engineer');
  const [companyTarget, setCompanyTarget] = useState('Stripe / Tier-1 Product');
  const [optimizationLevel, setOptimizationLevel] = useState<OptimizationLevel>('Aggressive ATS Match (95%+ Target)');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('resumatch_ai_settings', JSON.stringify(settings));
  }, [settings]);

  const handleUpdateSettings = (partial: Partial<AISettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const handleOptimize = async () => {
    if (!latexCode.trim() || !jobDescription.trim()) {
      setError('Please provide both LaTeX code and target Job Description.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const res = await optimizeLatexResume(
        {
          latexCode,
          jobDescription,
          targetRole,
          companyTarget,
          optimizationLevel
        },
        settings
      );
      setResult(res);
      // Smooth scroll down to output
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Optimization error:', err);
      setError(err.message || 'An error occurred during resume optimization. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        targetRole={targetRole}
        onUpdateRole={setTargetRole}
        optimizationLevel={optimizationLevel}
        onUpdateOptimizationLevel={setOptimizationLevel}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-1 overflow-hidden p-4 flex flex-col gap-4 max-w-[100vw]">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="font-bold uppercase">Dismiss</button>
          </div>
        )}

        <div className={`flex-1 min-h-0 grid gap-4 ${result ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
          <InputSection
            latexCode={latexCode}
            onChangeLatex={setLatexCode}
            jobDescription={jobDescription}
            onChangeJD={setJobDescription}
            companyTarget={companyTarget}
            onChangeCompany={setCompanyTarget}
            isProcessing={isProcessing}
            onOptimize={handleOptimize}
          />
          {result && <OutputSection result={result} />}
        </div>
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => setSettings(newSettings)}
      />
    </div>
  );
}

export default App;
