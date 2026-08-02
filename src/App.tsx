import { useState, useEffect } from 'react';
import type { AISettings, RoleLevel, OptimizationLevel, OptimizationResult } from './types';
import { SAMPLE_LATEX_RESUME, SAMPLE_JOB_DESCRIPTION } from './templates/sampleResume';
import { optimizeLatexResume } from './services/ai';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { SettingsModal } from './components/SettingsModal';
import { AlertTriangle, Sparkles } from 'lucide-react';

const DEFAULT_SETTINGS: AISettings = {
  provider: 'cerebras',
  cerebrasModel: 'gpt-oss-120b',
  geminiModel: 'gemini-2.5-flash',
  cerebrasApiKey: '',
  geminiApiKey: ''
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
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        targetRole={targetRole}
        onUpdateRole={setTargetRole}
        optimizationLevel={optimizationLevel}
        onUpdateOptimizationLevel={setOptimizationLevel}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isProcessing={isProcessing}
        onOptimize={handleOptimize}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {/* Error Alert Toast */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-slate-400 hover:text-slate-200 font-bold text-xs uppercase"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Quick Banner */}
        <div className="bg-gradient-to-r from-indigo-950/30 via-slate-900/60 to-purple-950/30 border border-slate-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">High-Paying Product Engineering Focus</h2>
              <p className="text-xs text-slate-400">Tailors bullet points using Google's XYZ formula, extracts hard technical keywords, and preserves LaTeX syntax.</p>
            </div>
          </div>
        </div>

        {/* Input Section (LaTeX Code + Job Description) */}
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

        {/* Output Section (Tailored Code + Score + Audit Log) */}
        {result && <OutputSection result={result} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 px-6 text-center text-xs text-slate-500">
        ResuMatch AI — Powered by Cerebras Cloud Hardware Inference & Google Gemini 3.5
      </footer>

      {/* Settings Modal */}
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
