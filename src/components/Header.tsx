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
  isProcessing: boolean;
  onOptimize: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  targetRole,
  onUpdateRole,
  optimizationLevel,
  onUpdateOptimizationLevel,
  onOpenSettings,
  isProcessing,
  onOptimize
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0d14]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-lg text-white tracking-tight">ResuMatch <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">AI</span></h1>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Tier-1 Product ATS
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">Tailor LaTeX resumes for $100k+ Product Engineer & Staff Roles</p>
        </div>
      </div>

      {/* AI Controls & Selection Tray */}
      <div className="flex items-center flex-wrap gap-2.5">
        {/* Provider Selection */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 ml-1.5" />
          <select
            value={settings.provider}
            onChange={(e) => onUpdateSettings({ provider: e.target.value as AIProvider })}
            className="bg-transparent text-slate-200 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
          >
            <option value="cerebras" className="bg-slate-900 text-slate-200">Cerebras AI (Superfast)</option>
            <option value="gemini" className="bg-slate-900 text-slate-200">Google Gemini</option>
          </select>
        </div>

        {/* Model Selection */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
          <Zap className="w-3.5 h-3.5 text-amber-400 ml-1.5" />
          {settings.provider === 'cerebras' ? (
            <select
              value={settings.cerebrasModel}
              onChange={(e) => onUpdateSettings({ cerebrasModel: e.target.value as CerebrasModel })}
              className="bg-transparent text-slate-200 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
            >
              <option value="gpt-oss-120b" className="bg-slate-900 text-emerald-400 font-semibold">gpt-oss-120b (Recommended)</option>
              <option value="gemma-4-31b" className="bg-slate-900 text-slate-200">gemma-4-31b</option>
              <option value="zai-glm-4.7" className="bg-slate-900 text-slate-200">zai-glm-4.7</option>
            </select>
          ) : (
            <select
              value={settings.geminiModel}
              onChange={(e) => onUpdateSettings({ geminiModel: e.target.value as GeminiModel })}
              className="bg-transparent text-slate-200 font-medium outline-none py-1 pr-2 cursor-pointer text-xs"
            >
              <option value="gemini-2.5-flash" className="bg-slate-900 text-slate-200">Gemini 2.5 Flash</option>
              <option value="gemini-3.5-flash-lite" className="bg-slate-900 text-slate-200">Gemini 3.5 Flash-Lite</option>
            </select>
          )}
        </div>

        {/* Target Role Dropdown */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
          <select
            value={targetRole}
            onChange={(e) => onUpdateRole(e.target.value as RoleLevel)}
            className="bg-transparent text-slate-200 font-medium outline-none py-1 px-2 cursor-pointer text-xs"
          >
            <option value="Senior Software Engineer" className="bg-slate-900">Senior Software Engineer</option>
            <option value="Staff / Lead Engineer" className="bg-slate-900">Staff / Lead Engineer</option>
            <option value="Fullstack Product Engineer" className="bg-slate-900">Fullstack Product Engineer</option>
            <option value="AI / Machine Learning Engineer" className="bg-slate-900">AI / ML Specialist</option>
          </select>
        </div>

        {/* Optimization Strategy */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
          <select
            value={optimizationLevel}
            onChange={(e) => onUpdateOptimizationLevel(e.target.value as OptimizationLevel)}
            className="bg-transparent text-slate-200 font-medium outline-none py-1 px-2 cursor-pointer text-xs"
          >
            <option value="Aggressive ATS Match (95%+ Target)" className="bg-slate-900">Aggressive ATS (95%+ Target)</option>
            <option value="Balanced Technical Depth" className="bg-slate-900">Balanced Technical Depth</option>
            <option value="Executive Impact & Metrics Focus" className="bg-slate-900">Executive & Metrics Focus</option>
          </select>
        </div>

        {/* Settings Modal Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Manage API Keys"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Main Action Button */}
        <button
          onClick={onOptimize}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg ${
            isProcessing
              ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-emerald-500 hover:opacity-95 text-white shadow-indigo-500/20 active:scale-95 cursor-pointer'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Tailoring LaTeX...' : 'Tailor Resume'}</span>
        </button>
      </div>
    </header>
  );
};
