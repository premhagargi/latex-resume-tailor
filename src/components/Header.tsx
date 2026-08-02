import React from 'react';
import type { AISettings, AIProvider, CerebrasModel, GeminiModel, OptimizationLevel } from '../types';
import { ShieldCheck, Settings2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HeaderProps {
  settings: AISettings;
  onUpdateSettings: (newSettings: Partial<AISettings>) => void;
  optimizationLevel: OptimizationLevel;
  onUpdateOptimizationLevel: (opt: OptimizationLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  optimizationLevel,
  onUpdateOptimizationLevel
}) => {
  return (
    <header className="flex-none bg-transparent px-6 pt-5 pb-2 flex items-center justify-between gap-4 z-40 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
          <img src="/favicon.svg" alt="ResuMatch AI" className="w-full h-full object-contain" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base text-slate-900 tracking-tight">ResuMatch <span className="text-slate-500">AI</span></h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1 border border-slate-200">
              <ShieldCheck className="w-3 h-3" /> Tier-1 Product
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5 hover:border-slate-300 transition-colors shadow-sm">
          {settings.provider === 'cerebras' ? (
            <img src="https://cerebras.ai/wp-content/uploads/2024/05/cropped-favicon-32x32.png" alt="Cerebras" className="w-4 h-4 ml-2.5 rounded-sm" />
          ) : (
            <img src="https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg" alt="Google" className="w-4 h-4 ml-2.5" />
          )}
          <Select value={settings.provider} onValueChange={(val) => onUpdateSettings({ provider: val as AIProvider })}>
            <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[140px]">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cerebras">Cerebras AI</SelectItem>
              <SelectItem value="gemini">Google Gemini</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5 hover:border-slate-300 transition-colors shadow-sm">
          <Settings2 className="w-3.5 h-3.5 text-slate-400 ml-2.5" />
          {settings.provider === 'cerebras' ? (
            <Select value={settings.cerebrasModel} onValueChange={(val) => onUpdateSettings({ cerebrasModel: val as CerebrasModel })}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[140px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-oss-120b">gpt-oss-120b</SelectItem>
                <SelectItem value="gemma-4-31b">gemma-4-31b</SelectItem>
                <SelectItem value="zai-glm-4.7">zai-glm-4.7</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select value={settings.geminiModel} onValueChange={(val) => onUpdateSettings({ geminiModel: val as GeminiModel })}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[150px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                <SelectItem value="gemini-3.5-flash-lite">Gemini 3.5 Flash-Lite</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="hidden lg:flex items-center bg-white border border-slate-200 rounded-lg p-0.5 hover:border-slate-300 transition-colors shadow-sm">
          <Select value={optimizationLevel} onValueChange={(val) => onUpdateOptimizationLevel(val as OptimizationLevel)}>
            <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[190px]">
              <SelectValue placeholder="Optimization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aggressive ATS Match (95%+ Target)">Aggressive ATS</SelectItem>
              <SelectItem value="Balanced Technical Depth">Balanced Technical Depth</SelectItem>
              <SelectItem value="Executive Impact & Metrics Focus">Executive & Metrics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};
