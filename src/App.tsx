import { useState } from 'react';
import type { AISettings, OptimizationLevel, OptimizationResult } from './types';
import { SAMPLE_LATEX_RESUME, SAMPLE_JOB_DESCRIPTION } from './templates/sampleResume';
import { optimizeLatexResume } from './services/ai';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './components/ui/dialog';

const DEFAULT_SETTINGS: AISettings = {
  provider: 'cerebras',
  cerebrasModel: 'gpt-oss-120b',
  geminiModel: 'gemini-2.5-flash',
  cerebrasApiKey: import.meta.env.VITE_CEREBRAS_API_KEY || '',
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || ''
};

export function App() {
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);
  const [latexCode, setLatexCode] = useState(SAMPLE_LATEX_RESUME);
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_DESCRIPTION);
  const [companyTarget, setCompanyTarget] = useState('Stripe / Tier-1 Product');
  const [optimizationLevel, setOptimizationLevel] = useState<OptimizationLevel>('Aggressive ATS Match (95%+ Target)');

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          targetRole: 'Senior Software Engineer', // Defaulted now since UI is removed
          companyTarget,
          optimizationLevel
        },
        settings
      );
      setResult(res);
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
        optimizationLevel={optimizationLevel}
        onUpdateOptimizationLevel={setOptimizationLevel}
      />

      <main className="flex-1 overflow-hidden px-5 pb-5 flex flex-col gap-4 max-w-[100vw]">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError(null)} className="font-bold uppercase">Dismiss</button>
          </div>
        )}

        <div className="flex-1 min-h-0 grid gap-4 grid-cols-1 lg:grid-cols-2">
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
        </div>
      </main>

      <Dialog open={!!result} onOpenChange={(open) => { if (!open) setResult(null); }}>
        <DialogContent 
          showCloseButton={false} 
          className="w-full max-w-none md:w-[85vw] h-[100vh] md:h-[85vh] p-0 overflow-hidden flex flex-col bg-slate-50 border-none shadow-2xl md:rounded-2xl"
        >
          <DialogTitle className="hidden">Optimization Result</DialogTitle>
          <DialogDescription className="hidden">Your tailored resume output</DialogDescription>
          {result && <OutputSection result={result} onClose={() => setResult(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
