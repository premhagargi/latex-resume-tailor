import React, { useState } from 'react';
import type { OptimizationResult } from '../types';
import { Copy, Download, Check, Zap, ArrowRight, FileCode, CheckCircle2, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

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
    <Card className="flex flex-col h-full bg-white border-slate-200 shadow-sm overflow-hidden p-0 rounded-xl">
      {/* Top Banner: ATS Score Breakdown & Executive Summary */}
      <div className="p-3 bg-slate-50 border-b border-slate-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 border border-green-200">
              <span className="text-sm font-bold text-green-700">{result.afterAtsScore}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-500">ATS Match</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 line-through">{result.beforeAtsScore}%</span>
                <ArrowRight className="w-3 h-3 text-green-600" />
                <span className="text-[10px] font-bold text-green-600">+{result.afterAtsScore - result.beforeAtsScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Output Controls Bar */}
      <div className="flex flex-wrap items-center justify-between px-2 py-1.5 bg-white border-b border-slate-100 gap-2">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100/50 p-0.5 rounded-lg border border-slate-200 text-xs">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('latex')}
            className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md font-medium transition-all text-[10px] ${
              activeTab === 'latex'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileCode className="w-3 h-3" />
            <span>LaTeX Code</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('keywords')}
            className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md font-medium transition-all text-[10px] ${
              activeTab === 'keywords'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>Keywords ({result.matchedKeywords.length + result.missingKeywordsAdded.length})</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md font-medium transition-all text-[10px] ${
              activeTab === 'audit'
                ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Changes ({result.keyChanges.length})</span>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            onClick={handleCopy}
            className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-white border-slate-200 text-slate-700 font-medium text-[10px] hover:bg-slate-50"
          >
            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </Button>

          <Button
            onClick={handleDownload}
            className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-[10px] shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 relative p-0 bg-white">
        {/* Tab 1: Full LaTeX Code Editor/Viewer */}
        {activeTab === 'latex' && (
          <div className="absolute inset-0 overflow-auto p-3 font-mono text-[10px] text-slate-800 leading-relaxed bg-slate-50/50">
            <pre className="whitespace-pre-wrap">
              {result.tailoredLatex}
            </pre>
          </div>
        )}

        {/* Tab 2: Keyword Alignment & Coverage */}
        {activeTab === 'keywords' && (
          <div className="absolute inset-0 overflow-auto space-y-4 p-4 bg-white">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Matched Keywords ({result.matchedKeywords.length})</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-green-50 border border-green-200 text-green-700 font-medium text-[10px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <PlusCircle className="w-3 h-3 text-blue-600" />
                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Injected Terms ({result.missingKeywordsAdded.length})</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missingKeywordsAdded.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-medium text-[10px]">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bullet Optimization Audit Trail */}
        {activeTab === 'audit' && (
          <div className="absolute inset-0 overflow-auto space-y-3 p-3 bg-slate-50/50">
            {result.keyChanges.map((change, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-[10px] font-bold text-slate-700 uppercase">{change.section}</span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1 p-2 rounded bg-red-50/50 border border-red-100">
                    <span className="text-[9px] font-bold text-red-600 uppercase">Before</span>
                    <p className="text-slate-600 font-mono text-[10px] leading-relaxed">{change.originalBullet}</p>
                  </div>

                  <div className="space-y-1 p-2 rounded bg-green-50/50 border border-green-100">
                    <span className="text-[9px] font-bold text-green-600 uppercase">Optimized</span>
                    <p className="text-slate-800 font-mono text-[10px] leading-relaxed">{change.optimizedBullet}</p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="font-semibold text-slate-700">Rationale: </span>
                  {change.reason}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
