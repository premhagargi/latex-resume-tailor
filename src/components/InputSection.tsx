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
      <Card className="flex flex-col h-full bg-white border-slate-200 shadow-sm overflow-hidden p-0 rounded-xl">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <h2 className="text-xs font-semibold text-slate-700">Job Description</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-0.5 rounded text-xs">
              <Building2 className="w-3 h-3 text-slate-400" />
              <Input
                type="text"
                value={companyTarget}
                onChange={(e) => onChangeCompany(e.target.value)}
                placeholder="Target Co (e.g. Stripe)"
                className="h-5 p-0 bg-transparent border-0 text-slate-700 text-[10px] outline-none w-24 focus-visible:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 p-0 relative">
          <Textarea
            value={jobDescription}
            onChange={(e) => onChangeJD(e.target.value)}
            placeholder="Paste the target Job Description..."
            className="w-full h-full absolute inset-0 border-0 bg-transparent text-slate-800 text-[11px] leading-relaxed rounded-none resize-none focus-visible:ring-0 p-3 overflow-y-auto"
          />
        </div>
        <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Ready for optimization
          </span>
          <Button
            onClick={onOptimize}
            disabled={isProcessing || !latexCode.trim() || !jobDescription.trim()}
            className="h-7 text-[10px] font-semibold px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white"
          >
            <Sparkles className={`w-3 h-3 mr-1.5 ${isProcessing ? 'animate-spin' : ''}`} />
            {isProcessing ? 'Processing...' : 'Tailor Resume'}
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col h-full bg-white border-slate-200 shadow-sm overflow-hidden p-0 rounded-xl">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-slate-500" />
            <div>
              <h2 className="text-xs font-semibold text-slate-700">LaTeX Source</h2>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="h-6 text-[10px] text-slate-600 px-2"
            >
              <Sparkles className="w-3 h-3 mr-1" /> Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="flex-1 p-0 relative">
          <Textarea
            value={latexCode}
            onChange={(e) => onChangeLatex(e.target.value)}
            placeholder="Paste your original LaTeX resume code here..."
            className="w-full h-full absolute inset-0 border-0 bg-transparent text-slate-800 font-mono text-[11px] leading-relaxed rounded-none resize-none focus-visible:ring-0 p-3 overflow-y-auto"
            spellCheck={false}
          />
        </div>
      </Card>
    </>
  );
};
