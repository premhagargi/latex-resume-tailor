import React, { useState } from 'react';
import type { OptimizationResult } from '../types';
import { Copy, Download, Check, Zap, ArrowRight, FileCode, CheckCircle2, PlusCircle, X } from 'lucide-react';
import { Button } from './ui/button';

interface OutputSectionProps {
  result: OptimizationResult;
  onClose?: () => void;
}

const ScoreGauge = ({ before, after }: { before: number, after: number }) => {
  const delta = after - before;
  const colorClass = after >= 85 ? "text-green-500" : after >= 70 ? "text-amber-500" : "text-red-500";
  const strokeClass = after >= 85 ? "stroke-green-500" : after >= 70 ? "stroke-amber-500" : "stroke-red-500";
  
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (after / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="28" cy="28" r="20" className="stroke-slate-200 fill-none" strokeWidth="4" />
          <circle 
            cx="28" cy="28" r="20" 
            className={`${strokeClass} fill-none transition-all duration-1000 ease-out`} 
            strokeWidth="4" 
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-black ${colorClass}`}>{after}</span>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">ATS Match</span>
        <div className="flex items-center gap-1.5 text-xs mt-0.5">
          <span className="text-slate-400 line-through">{before}%</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className={`font-bold ${colorClass}`}>+{delta}%</span>
        </div>
      </div>
    </div>
  );
};

const LatexHighlighter = ({ code }: { code: string }) => {
  const lines = code.split('\n');
  return (
    <div className="font-mono text-xs leading-relaxed text-slate-300 w-full">
      {lines.map((line, i) => {
        const escaped = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const html = escaped
          .replace(/(%.*)$/g, '<span class="text-emerald-500/70 italic">$1</span>')
          .replace(/(\\\\[a-zA-Z@*]+)/g, '<span class="text-blue-400 font-medium">$1</span>')
          .replace(/(\{.*?\})/g, '<span class="text-pink-300">$1</span>');
          
        return (
          <div key={i} className="flex hover:bg-slate-800/50 min-w-max">
            <span className="w-8 shrink-0 text-right pr-3 select-none text-slate-600 border-r border-slate-700/50 mr-3 inline-block">{i + 1}</span>
            <span className="whitespace-pre" dangerouslySetInnerHTML={{ __html: html || ' ' }} />
          </div>
        );
      })}
    </div>
  );
};

export const OutputSection: React.FC<OutputSectionProps> = ({ result, onClose }) => {
  const [activeTab, setActiveTab] = useState<'latex' | 'keywords' | 'audit'>('latex');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.tailoredLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.tailoredLatex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Tailored_Resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header Row */}
      <div className="flex-none px-6 py-5 bg-white flex items-center justify-between border-b border-slate-100 z-10 relative">
        <ScoreGauge before={result.beforeAtsScore} after={result.afterAtsScore} />
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="h-10 px-5 rounded-xl bg-white border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied to Clipboard' : 'Copy Code'}
          </Button>

          <Button
            onClick={handleDownload}
            className="h-10 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Download .tex
          </Button>

          {onClose && (
            <div className="w-[1px] h-6 bg-slate-200 mx-2 hidden md:block"></div>
          )}

          {onClose && (
            <Button
              variant="ghost"
              onClick={onClose}
              className="w-10 h-10 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0 p-0 ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Tab Row */}
      <div className="flex-none flex items-center px-6 py-4 bg-slate-50/50 border-b border-slate-100 gap-2 overflow-x-auto no-scrollbar z-10 relative">
        <div className="flex p-1 bg-slate-200/60 rounded-xl overflow-hidden shadow-inner">
          <button
            onClick={() => setActiveTab('latex')}
            className={`px-5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'latex' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/40'
            }`}
          >
            <FileCode className="w-4 h-4" />
            LaTeX Source
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'keywords' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/40'
            }`}
          >
            <Zap className={`w-4 h-4 ${activeTab === 'keywords' ? 'text-amber-500' : ''}`} />
            Keywords ({result.matchedKeywords.length + result.missingKeywordsAdded.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-5 py-2 text-xs font-bold rounded-lg flex items-center gap-2 transition-all ${
              activeTab === 'audit' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/40'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${activeTab === 'audit' ? 'text-emerald-500' : ''}`} />
            Changes ({result.keyChanges.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0 relative overflow-hidden bg-white">
        {/* Tab 1: Full LaTeX Code Editor/Viewer */}
        {activeTab === 'latex' && (
          <div className="absolute inset-0 overflow-auto bg-[#0B1120] p-6 lg:p-8 custom-scrollbar">
            <LatexHighlighter code={result.tailoredLatex} />
          </div>
        )}

        {/* Tab 2: Keyword Alignment & Coverage */}
        {activeTab === 'keywords' && (
          <div className="absolute inset-0 overflow-auto space-y-8 p-6 bg-slate-50/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Matched Keywords ({result.matchedKeywords.length})</h4>
              </div>
              {result.matchedKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-800 font-medium text-xs shadow-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No existing keywords matched the description.</p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Injected Terms ({result.missingKeywordsAdded.length})</h4>
              </div>
              {result.missingKeywordsAdded.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywordsAdded.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-medium text-xs shadow-sm">
                      + {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic">No missing keywords were added.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Bullet Optimization Audit Trail */}
        {activeTab === 'audit' && (
          <div className="absolute inset-0 overflow-auto space-y-4 p-6 bg-slate-50/30">
            {result.keyChanges.length > 0 ? (
              result.keyChanges.map((change, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{change.section}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Original</span>
                      <p className="text-slate-500 line-through leading-relaxed">{change.originalBullet}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Optimized</span>
                        {!change.sourceGrounded && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-200 text-amber-700 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1" title="This bullet contains inferred details not explicitly in the original resume">
                            Inferred Details
                          </span>
                        )}
                      </div>
                      <p className="text-slate-900 font-medium leading-relaxed">{change.optimizedBullet}</p>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-700">Rationale: </span>
                    <span className="italic">{change.reason}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 italic">
                No major structural changes were necessary.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
