import React, { useState } from 'react';
import type { OptimizationResult } from '../types';
import { Copy, Download, Check, ShieldCheck, Zap, ArrowRight, FileCode, CheckCircle2, PlusCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface OutputSectionProps {
  result: OptimizationResult;
}

export const OutputSection: React.FC<OutputSectionProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'latex' | 'keywords' | 'audit'>('latex');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.tailoredLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.tailoredLatex], { type: 'text/x-tex;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tailored_resume_${Date.now()}.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col bg-[#0c101a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-0 mt-8 animate-fade-in">
      {/* Top Banner: ATS Score Breakdown & Executive Summary */}
      <div className="p-6 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-emerald-950/40 border-b border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Score Ring & Metric */}
        <div className="lg:col-span-4 flex items-center gap-5 border-r-0 lg:border-r border-slate-800/80 pr-0 lg:pr-6">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-indigo-500/10 to-purple-500/20 border border-emerald-500/30 p-1 shadow-lg shadow-emerald-500/10">
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-400">{result.afterAtsScore}%</span>
              <span className="block text-[9px] uppercase tracking-wider font-bold text-emerald-300">ATS Match</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score Jump:</span>
              <span className="text-xs font-mono font-bold text-slate-400 line-through">{result.beforeAtsScore}%</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-sm font-mono font-bold text-emerald-400">+{result.afterAtsScore - result.beforeAtsScore}%</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Optimized for Tier-1 Product ATS Scanners</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="lg:col-span-8 space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Tailoring Strategy & Executive Impact</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {result.executiveSummary}
          </p>
        </div>
      </div>

      {/* Tabs & Output Controls Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/80 gap-3">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('latex')}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg font-semibold transition-all ${
              activeTab === 'latex'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Tailored LaTeX Code</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('keywords')}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg font-semibold transition-all ${
              activeTab === 'keywords'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Keywords ({result.matchedKeywords.length + result.missingKeywordsAdded.length})</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-1.5 h-8 px-3 rounded-lg font-semibold transition-all ${
              activeTab === 'audit'
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Bullet Changes ({result.keyChanges.length})</span>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 font-semibold text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy LaTeX'}</span>
          </Button>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .tex</span>
          </Button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4 bg-[#080b11] min-h-[500px]">
        {/* Tab 1: Full LaTeX Code Editor/Viewer */}
        {activeTab === 'latex' && (
          <div className="relative h-[550px] bg-[#0c101a] border border-slate-800 rounded-xl p-4 overflow-auto font-mono text-xs text-slate-200 leading-relaxed">
            <pre className="whitespace-pre-wrap selection:bg-indigo-500/30">
              {result.tailoredLatex}
            </pre>
          </div>
        )}

        {/* Tab 2: Keyword Alignment & Coverage */}
        {activeTab === 'keywords' && (
          <div className="space-y-6 p-2">
            {/* Matched Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Matched High-Impact Keywords ({result.matchedKeywords.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-xs">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Injected Missing Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-indigo-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Injected Requirements & Technical Terms ({result.missingKeywordsAdded.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywordsAdded.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium text-xs">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bullet Optimization Audit Trail */}
        {activeTab === 'audit' && (
          <div className="space-y-4 p-2">
            {result.keyChanges.map((change, idx) => (
              <div key={idx} className="bg-[#0c101a] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{change.section}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Change #{idx + 1}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Before */}
                  <div className="space-y-1 p-3 rounded-lg bg-rose-500/5 border border-rose-500/15">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Before</span>
                    <p className="text-slate-300 font-mono text-[11px] leading-relaxed">{change.originalBullet}</p>
                  </div>

                  {/* After */}
                  <div className="space-y-1 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Optimized (XYZ Formula)</span>
                    <p className="text-emerald-200 font-mono text-[11px] leading-relaxed">{change.optimizedBullet}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-indigo-300 not-italic">Rationale: </span>
                  {change.reason}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
