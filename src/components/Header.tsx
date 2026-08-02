import React from 'react';
import type { AISettings, AIProvider, CerebrasModel, GeminiModel, OptimizationLevel } from '../types';
import { ShieldCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface HeaderProps {
  settings: AISettings;
  onUpdateSettings: (newSettings: Partial<AISettings>) => void;
  optimizationLevel: OptimizationLevel;
  onUpdateOptimizationLevel: (opt: OptimizationLevel) => void;
}

const PROVIDER_LOGOS = {
  cerebras: "https://imgs.search.brave.com/6EQ9yTqNRQDaX4KU7CRPy93CsSTIWQ5rUFHS4LqkkTE/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMDcwOGI5MTA3/ZDdiMzEyNWQ4NmI1/YzhlZTI5MmFjMGE0/YTc2MjhhODMwNGNl/N2U5Njc2MjY0OTM4/YTE4M2Y1OS93d3cu/Y2VyZWJyYXMuYWkv",
  gemini: "https://imgs.search.brave.com/cj7jNYO4VXm428dGXzh--H0SIF6LQkp9yo24-yPzMI8/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvZmEwZTNmYWNm/MTk2Yjg1YzVlNmU5/OWZkMDNkM2Y2NjVm/YzJlNDBlYjMwODMw/YWNmMmUxNDBlMjdh/NzdjMmVkZi9nZW1p/bmkuZ29vZ2xlLmNv/bS8"
};

const MODEL_LOGOS = {
  "gpt-oss-120b": "https://imgs.search.brave.com/a162Y0hLEPHL4G7WHg0Nw0DxUOn2TknT_UI4sVOwS_E/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvNWE0ODk4ZGY3/Mzk1Y2EwMjAxZjJk/YmEzZWM1MzcyNTZm/MTI0YWEyOWQ3NjVk/MDgxNTMwMGQxNWMx/ZWVmZWMzZC9vcGVu/YWkuY29tLw",
  "gemma-4-31b": "https://imgs.search.brave.com/4hnZhqG1cU6AwJ8317As3BPvWHenYVQDegCDiMNp8h8/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvNWY3ZGNjZmZi/NGFlZmEyNDg2NGEz/YzBlZmI1NzIwZTYw/MjcxZjA4MTcxOWRk/MzNlNjlhNWVjMDg3/ODAwODBhZS9kZWVw/bWluZC5nb29nbGUv",
  "zai-glm-4.7": "https://imgs.search.brave.com/K_TMkyhSQrBQ6vrbkXoXHkiVt-7Hund46Jn0wgNN7Zo/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvNmRhMDhiZTY3/ZGZhOGQ0MGUwNzNl/NmYyN2IyZTZiYTZh/Y2JlZDEwYThlOTJi/NWEwZTNkYmM5YWQy/NTBmYTBiNC9jaGF0/LnouYWkv",
  "gemini-2.5-flash": PROVIDER_LOGOS.gemini,
  "gemini-3.5-flash-lite": PROVIDER_LOGOS.gemini,
};

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
          <Select value={settings.provider} onValueChange={(val) => onUpdateSettings({ provider: val as AIProvider })}>
            <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[140px] px-2 gap-2">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cerebras">
                <div className="flex items-center gap-2">
                  <img src={PROVIDER_LOGOS.cerebras} alt="" className="w-4 h-4 rounded-sm" />
                  <span>Cerebras AI</span>
                </div>
              </SelectItem>
              <SelectItem value="gemini">
                <div className="flex items-center gap-2">
                  <img src={PROVIDER_LOGOS.gemini} alt="" className="w-4 h-4" />
                  <span>Google Gemini</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5 hover:border-slate-300 transition-colors shadow-sm">
          {settings.provider === 'cerebras' ? (
            <Select value={settings.cerebrasModel} onValueChange={(val) => onUpdateSettings({ cerebrasModel: val as CerebrasModel })}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[160px] px-2 gap-2">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-oss-120b">
                  <div className="flex items-center gap-2">
                    <img src={MODEL_LOGOS["gpt-oss-120b"]} alt="" className="w-4 h-4 rounded-sm" />
                    <span>gpt-oss-120b</span>
                  </div>
                </SelectItem>
                <SelectItem value="gemma-4-31b">
                  <div className="flex items-center gap-2">
                    <img src={MODEL_LOGOS["gemma-4-31b"]} alt="" className="w-4 h-4" />
                    <span>gemma-4-31b</span>
                  </div>
                </SelectItem>
                <SelectItem value="zai-glm-4.7">
                  <div className="flex items-center gap-2">
                    <img src={MODEL_LOGOS["zai-glm-4.7"]} alt="" className="w-4 h-4" />
                    <span>zai-glm-4.7</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Select value={settings.geminiModel} onValueChange={(val) => onUpdateSettings({ geminiModel: val as GeminiModel })}>
              <SelectTrigger className="h-8 border-0 bg-transparent shadow-none hover:bg-slate-50 font-medium text-slate-700 w-[170px] px-2 gap-2">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-2.5-flash">
                  <div className="flex items-center gap-2">
                    <img src={MODEL_LOGOS["gemini-2.5-flash"]} alt="" className="w-4 h-4" />
                    <span>Gemini 2.5 Flash</span>
                  </div>
                </SelectItem>
                <SelectItem value="gemini-3.5-flash-lite">
                  <div className="flex items-center gap-2">
                    <img src={MODEL_LOGOS["gemini-3.5-flash-lite"]} alt="" className="w-4 h-4" />
                    <span>Gemini 3.5 Flash-Lite</span>
                  </div>
                </SelectItem>
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
