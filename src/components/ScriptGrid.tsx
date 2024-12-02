import React from 'react';
import { ScriptButton } from './ScriptButton';
import { Script, ButtonSize } from '../types/Script';

interface ScriptGridProps {
  scripts: Script[];
  onExecute: (scriptId: string) => void;
  columns?: number;
  buttonSize?: ButtonSize;
  gap?: number;
}

export function ScriptGrid({ 
  scripts, 
  onExecute, 
  columns = 1,
  buttonSize = 'md',
  gap = 4
}: ScriptGridProps) {
  return (
    <div 
      className={`grid gap-${gap} grid-cols-1 ${
        columns > 1 ? `md:grid-cols-${columns}` : ''
      }`}
    >
      {scripts.map((script) => (
        <ScriptButton
          key={script.id}
          script={script}
          onExecute={onExecute}
          size={buttonSize}
        />
      ))}
    </div>
  );
}