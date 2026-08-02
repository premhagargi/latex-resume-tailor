import React from 'react';
import { FileCode, FileText, RotateCcw, Sparkles, Building2 } from 'lucide-react';
import { SAMPLE_LATEX_RESUME, SAMPLE_JOB_DESCRIPTION } from '../templates/sampleResume';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface InputSectionProps {
  latexCode: string;
  onChangeLatex: (val: string) => void;
  jobDescription: string;
  onChangeJD: (val: string) => void;
  companyTarget: string;
  onChangeCompany: (val: string) => void;
  isProcessing: boolean;
  onOptimize: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  latexCode,
  onChangeLatex,
  jobDescription,
  onChangeJD,
  companyTarget,
  onChangeCompany,
  isProcessing,
  onOptimize
}) => {
  const handleLoadSample = () => {
    onChangeLatex(SAMPLE_LATEX_RESUME);
    onChangeJD(SAMPLE_JOB_DESCRIPTION);
    onChangeCompany('Stripe / Meta / Tier-1 Product');
  };

  const handleClear = () => {
    onChangeLatex('');
    onChangeJD('');
    onChangeCompany('');
  };

  return (
    <>
      <Card className="relative flex flex-col h-full bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl overflow-hidden group">
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/60 shadow-sm transition-opacity opacity-100">
            <div className="p-1 rounded bg-blue-50 text-blue-600">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-[13px] font-semibold text-slate-800 tracking-tight">Job Description</h2>
          </div>
          <div className="pointer-events-auto bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200/60 shadow-sm flex items-center gap-1.5 focus-within:border-[#da7756] focus-within:ring-2 focus-within:ring-[#da7756]/20 transition-all">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <Input
              type="text"
              value={companyTarget}
              onChange={(e) => onChangeCompany(e.target.value)}
              placeholder="Target Co (e.g. Stripe)"
              className="h-5 p-0 bg-transparent border-0 text-slate-700 font-medium text-xs outline-none w-28 focus-visible:ring-0 placeholder:text-slate-400"
            />
          </div>
        </div>

        <Textarea
          value={jobDescription}
          onChange={(e) => onChangeJD(e.target.value)}
          placeholder="Paste the target Job Description (Responsibilities, Tech Stack, Requirements)..."
          className="w-full h-full border-0 bg-transparent text-slate-700 text-xs leading-relaxed rounded-2xl resize-none focus-visible:ring-2 focus-visible:ring-[#da7756]/40 focus-visible:border-[#da7756] p-5 pt-16 pb-16 overflow-y-auto"
        />

        <div className="absolute bottom-3 right-3 z-10 pointer-events-auto">
          <Button
            onClick={onOptimize}
            disabled={isProcessing || !latexCode.trim() || !jobDescription.trim()}
            className="h-10 text-xs font-semibold px-6 rounded-xl bg-[#da7756] hover:bg-[#c86a4c] text-white shadow-lg shadow-[#da7756]/20 transition-all active:scale-95"
          >
            <Sparkles className={`w-4 h-4 mr-2 text-white/90 ${isProcessing ? 'animate-spin' : ''}`} />
            {isProcessing ? 'Tailoring...' : 'Tailor Resume'}
          </Button>
        </div>
      </Card>

      <Card className="relative flex flex-col h-full bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl overflow-hidden group">
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/60 shadow-sm transition-opacity opacity-100">
            <div className="p-1 rounded bg-indigo-50 text-indigo-600">
              <FileCode className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-[13px] font-semibold text-slate-800 tracking-tight">Paste Your LaTeX Resume</h2>
          </div>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="h-8 bg-white/80 backdrop-blur-md border border-slate-200/60 text-[11px] font-medium text-indigo-600 hover:bg-indigo-50 px-3 rounded-lg shadow-sm transition-colors"
            >
              <Sparkles className="w-3 h-3 mr-1.5 text-indigo-400" /> Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 w-8 p-0 bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shadow-sm transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <Textarea
          value={latexCode}
          onChange={(e) => onChangeLatex(e.target.value)}
          placeholder="Paste your original LaTeX resume code here..."
          className="w-full h-full border-0 bg-transparent text-slate-800 font-mono text-xs leading-relaxed rounded-2xl resize-none focus-visible:ring-2 focus-visible:ring-indigo-500/30 focus-visible:border-indigo-400 p-5 pt-16 pb-16 overflow-y-auto selection:bg-indigo-100 selection:text-indigo-900"
          spellCheck={false}
        />
      </Card>
    </>
  );
};
