import React from 'react';
import { FileCode, FileText, RotateCcw, Sparkles, Building2, SlidersHorizontal } from 'lucide-react';
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
      <Card className="flex flex-col h-full bg-white border-slate-200/80 shadow-md shadow-slate-200/40 overflow-hidden p-0 rounded-2xl transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100/50">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-slate-800 tracking-tight">Job Description</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-md text-xs transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
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
        </div>
        <div className="flex-1 p-0 relative bg-slate-50/30">
          <Textarea
            value={jobDescription}
            onChange={(e) => onChangeJD(e.target.value)}
            placeholder="Paste the target Job Description (Responsibilities, Tech Stack, Requirements)..."
            className="w-full h-full absolute inset-0 border-0 bg-transparent text-slate-700 text-xs leading-relaxed rounded-none resize-none focus-visible:ring-0 p-5 overflow-y-auto"
          />
        </div>
        <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            Ready for AI optimization
          </span>
          <Button
            onClick={onOptimize}
            disabled={isProcessing || !latexCode.trim() || !jobDescription.trim()}
            className="h-9 text-xs font-semibold px-5 rounded-lg bg-[#da7756] hover:bg-[#c86a4c] text-white shadow-sm shadow-[#da7756]/20 transition-all"
          >
            <Sparkles className={`w-3.5 h-3.5 mr-2 text-white/90 ${isProcessing ? 'animate-spin' : ''}`} />
            {isProcessing ? 'Analyzing & Tailoring...' : 'Tailor Resume'}
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col h-full bg-white border-slate-200/80 shadow-md shadow-slate-200/40 overflow-hidden p-0 rounded-2xl transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100/50">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-800 tracking-tight">LaTeX Source</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="h-7 text-[11px] font-medium text-indigo-600 bg-indigo-50/50 border-indigo-100 hover:bg-indigo-50 hover:text-indigo-700 px-3 rounded-md transition-colors"
            >
              <Sparkles className="w-3 h-3 mr-1.5 text-indigo-400" /> Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 p-0 relative bg-slate-50/30">
          <Textarea
            value={latexCode}
            onChange={(e) => onChangeLatex(e.target.value)}
            placeholder="Paste your original LaTeX resume code here..."
            className="w-full h-full absolute inset-0 border-0 bg-transparent text-slate-800 font-mono text-xs leading-relaxed rounded-none resize-none focus-visible:ring-0 p-5 overflow-y-auto selection:bg-indigo-100 selection:text-indigo-900"
            spellCheck={false}
          />
        </div>
      </Card>
    </>
  );
};
