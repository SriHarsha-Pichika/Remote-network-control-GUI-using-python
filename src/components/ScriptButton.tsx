import React from 'react';
import { Play, Loader2 } from 'lucide-react';
import { Script, ButtonSize } from '../types/Script';

interface ScriptButtonProps {
  script: Script;
  onExecute: (scriptId: string) => void;
  size?: ButtonSize;
}

const sizeClasses = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg'
};

export function ScriptButton({ script, onExecute, size = 'md' }: ScriptButtonProps) {
  const buttonStyle = script.buttonStyle || {
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600'
  };

  return (
    <button
      onClick={() => onExecute(script.id)}
      disabled={script.isRunning}
      className={`
        flex items-center justify-between w-full
        ${sizeClasses[size]}
        ${buttonStyle.bgColor} ${buttonStyle.hoverColor}
        text-white rounded-lg shadow-sm transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <div className="flex-1">
        <h3 className="font-semibold">{script.name}</h3>
        <p className="text-white/80 text-sm">{script.description}</p>
        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full bg-white/20">
          {script.category}
        </span>
      </div>
      <div className="ml-4">
        {script.isRunning ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Play className="w-6 h-6" />
        )}
      </div>
    </button>
  );
}