import React from 'react';
import type { AISettings, AIProvider, CerebrasModel, GeminiModel, RoleLevel, OptimizationLevel } from '../types';
import { Sparkles, Settings, Zap, ShieldCheck, Cpu } from 'lucide-react';

interface HeaderProps {
  settings: AISettings;
  onUpdateSettings: (newSettings: Partial<AISettings>) => void;
  targetRole: RoleLevel;
  onUpdateRole: (role: RoleLevel) => void;
  optimizationLevel: OptimizationLevel;
  onUpdateOptimizationLevel: (opt: OptimizationLevel) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  targetRole,
  onUpdateRole,
  optimizationLevel,
  onUpdateOptimizationLevel,
  onOpenSettings
}) => {
  return (
    <header className="flex-none bg-white border-b border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm z-40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-slate-700" />
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

      <div className="flex items-center flex-wrap gap-2.5">
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs hover:border-slate-300 transition-colors">
          <Cpu className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          <select
            value={settings.provider}
            onChange={(e) => onUpdateSettings({ provider: e.target.value as AIProvider })}
            className="bg-transparent text-slate-700 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
          >
            <option value="cerebras">Cerebras AI (Superfast)</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs hover:border-slate-300 transition-colors">
          <Zap className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
          {settings.provider === 'cerebras' ? (
            <select
              value={settings.cerebrasModel}
              onChange={(e) => onUpdateSettings({ cerebrasModel: e.target.value as CerebrasModel })}
              className="bg-transparent text-slate-700 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
            >
              <option value="gpt-oss-120b">gpt-oss-120b (Recommended)</option>
              <option value="gemma-4-31b">gemma-4-31b</option>
              <option value="zai-glm-4.7">zai-glm-4.7</option>
            </select>
          ) : (
            <select
              value={settings.geminiModel}
              onChange={(e) => onUpdateSettings({ geminiModel: e.target.value as GeminiModel })}
              className="bg-transparent text-slate-700 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash-Lite</option>
            </select>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs hover:border-slate-300 transition-colors">
          <select
            value={targetRole}
            onChange={(e) => onUpdateRole(e.target.value as RoleLevel)}
            className="bg-transparent text-slate-700 font-medium outline-none py-1 px-2 cursor-pointer text-xs"
          >
            <option value="Senior Software Engineer">Senior Software Engineer</option>
            <option value="Staff / Lead Engineer">Staff / Lead Engineer</option>
            <option value="Fullstack Product Engineer">Fullstack Product Engineer</option>
            <option value="AI / Machine Learning Engineer">AI / ML Specialist</option>
          </select>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs hover:border-slate-300 transition-colors">
          <select
            value={optimizationLevel}
            onChange={(e) => onUpdateOptimizationLevel(e.target.value as OptimizationLevel)}
            className="bg-transparent text-slate-700 font-medium outline-none py-1 px-2 cursor-pointer text-xs"
          >
            <option value="Aggressive ATS Match (95%+ Target)">Aggressive ATS</option>
            <option value="Balanced Technical Depth">Balanced Technical Depth</option>
            <option value="Executive Impact & Metrics Focus">Executive & Metrics</option>
          </select>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
          title="Manage API Keys"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
