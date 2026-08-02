import React, { useState, useEffect } from 'react';
import type { AISettings } from '../types';
import { Key, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSave: (newSettings: AISettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [cerebrasKey, setCerebrasKey] = useState(settings.cerebrasApiKey);
  const [geminiKey, setGeminiKey] = useState(settings.geminiApiKey);
  const [showCerebras, setShowCerebras] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCerebrasKey(settings.cerebrasApiKey);
      setGeminiKey(settings.geminiApiKey);
      setSavedNotice(false);
    }
  }, [isOpen, settings]);

  const handleSave = () => {
    onSave({
      ...settings,
      cerebrasApiKey: cerebrasKey.trim(),
      geminiApiKey: geminiKey.trim()
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Key className="w-4 h-4" />
            </div>
            <DialogTitle>API Key Settings</DialogTitle>
          </div>
          <DialogDescription>
            Configure LLM keys for Cerebras and Google Gemini. Keys are stored locally.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">Cerebras API Key</label>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Pre-configured</span>
            </div>
            <div className="relative">
              <Input
                type={showCerebras ? 'text' : 'password'}
                value={cerebrasKey}
                onChange={(e) => setCerebrasKey(e.target.value)}
                placeholder="Enter Cerebras Key (csk-...)"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCerebras(!showCerebras)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCerebras ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold">Google Gemini API Key</label>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Gemini 2.5 / 3.5</span>
            </div>
            <div className="relative">
              <Input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="Enter Gemini Key"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showGemini ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Alert variant="default" className="bg-indigo-500/5 border-indigo-500/15">
            <AlertCircle className="h-4 w-4 text-indigo-400" />
            <AlertDescription className="text-xs text-muted-foreground ml-2">
              Keys are securely saved in your browser's local storage and used directly for API calls.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 text-white"
          >
            {savedNotice ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved!
              </>
            ) : (
              'Save Credentials'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

