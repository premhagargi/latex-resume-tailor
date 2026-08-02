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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Panel 1: Original LaTeX Resume Code */}
      <Card className="flex flex-col h-[650px] bg-[#0c101a] border-slate-800/80 overflow-hidden shadow-2xl transition-all hover:border-slate-700/80 p-0 rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">LaTeX Resume Source</h2>
              <span className="text-[10px] text-slate-400">{latexCode.length} characters</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="h-7 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors border-indigo-500/20"
              title="Load Tier-1 Engineer Resume Sample"
            >
              <Sparkles className="w-3 h-3 mr-1" /> Sample
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-7 w-7 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-[11px]"
              title="Clear text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 relative p-0 bg-[#080b11]">
          <Textarea
            value={latexCode}
            onChange={(e) => onChangeLatex(e.target.value)}
            placeholder="Paste your original LaTeX resume code here (\documentclass{article}...)"
            className="w-full h-full border-0 bg-transparent text-slate-200 font-mono text-xs leading-relaxed rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3"
            spellCheck={false}
          />
        </div>
      </Card>

      {/* Panel 2: Target Job Description & Parameters */}
      <Card className="flex flex-col h-[650px] bg-[#0c101a] border-slate-800/80 overflow-hidden shadow-2xl transition-all hover:border-slate-700/80 p-0 rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/60 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Target Job Description</h2>
              <span className="text-[10px] text-slate-400">Extracts keywords & requirements</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-2 py-1 rounded-lg text-xs">
              <Building2 className="w-3 h-3 text-slate-400" />
              <Input
                type="text"
                value={companyTarget}
                onChange={(e) => onChangeCompany(e.target.value)}
                placeholder="Target Co (e.g. Stripe)"
                className="h-5 p-0 bg-transparent border-0 text-slate-200 text-[11px] outline-none w-28 placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 relative p-0 bg-[#080b11]">
          <Textarea
            value={jobDescription}
            onChange={(e) => onChangeJD(e.target.value)}
            placeholder="Paste the target Job Description (Responsibilities, Tech Stack, Requirements, Key Metrics)..."
            className="w-full h-full border-0 bg-transparent text-slate-200 font-sans text-xs leading-relaxed rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3"
          />
        </div>

        <div className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Preserves LaTeX syntax, injects XYZ metrics & JD keywords.</span>
          </div>

          <Button
            onClick={onOptimize}
            disabled={isProcessing || !latexCode.trim() || !jobDescription.trim()}
            className={`flex items-center gap-2 px-5 h-9 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl ${
              isProcessing || !latexCode.trim() || !jobDescription.trim()
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-500 hover:opacity-95 text-white shadow-indigo-500/20'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Optimizing Resume...' : 'Tailor Resume Now'}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
