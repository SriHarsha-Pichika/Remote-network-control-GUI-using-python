import React from 'react';
import { ScriptResult } from '../types/Script';

interface ScriptOutputProps {
  results: ScriptResult[];
}

export function ScriptOutput({ results }: ScriptOutputProps) {
  if (results.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-gray-600 text-center">
        No scripts have been executed yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={`${result.id}-${result.timestamp}`}
          className={`p-4 rounded-lg ${
            result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">
              {result.status === 'success' ? '✓ Success' : '✗ Error'}
            </span>
            <span className="text-sm text-gray-600">{result.timestamp}</span>
          </div>
          <pre className="whitespace-pre-wrap text-sm font-mono bg-white p-3 rounded border">
            {result.output}
          </pre>
        </div>
      ))}
    </div>
  );
}