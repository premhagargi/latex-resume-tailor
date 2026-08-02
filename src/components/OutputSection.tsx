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
            className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-[#da7756] hover:bg-[#c86a4c] text-white font-medium text-[10px] shadow-sm"
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
          <div className="absolute inset-0 overflow-auto p-5 font-mono text-xs text-slate-800 leading-relaxed bg-slate-50/50">
            <pre className="whitespace-pre-wrap selection:bg-blue-100 selection:text-blue-900">
              {result.tailoredLatex}
            </pre>
          </div>
        )}

        {/* Tab 2: Keyword Alignment & Coverage */}
        {activeTab === 'keywords' && (
          <div className="absolute inset-0 overflow-auto space-y-6 p-6 bg-white">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Matched Keywords ({result.matchedKeywords.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.matchedKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-green-50 border border-green-200 text-green-700 font-medium text-xs shadow-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Injected Terms ({result.missingKeywordsAdded.length})</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywordsAdded.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 font-medium text-xs shadow-sm">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bullet Optimization Audit Trail */}
        {activeTab === 'audit' && (
          <div className="absolute inset-0 overflow-auto space-y-4 p-6 bg-slate-50/50">
            {result.keyChanges.map((change, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{change.section}</span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 p-3 rounded-lg bg-red-50/50 border border-red-100">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Before</span>
                    <p className="text-slate-600 font-mono text-xs leading-relaxed">{change.originalBullet}</p>
                  </div>

                  <div className="space-y-2 p-3 rounded-lg bg-green-50/50 border border-green-100">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Optimized</span>
                    <p className="text-slate-800 font-mono text-xs leading-relaxed">{change.optimizedBullet}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
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
