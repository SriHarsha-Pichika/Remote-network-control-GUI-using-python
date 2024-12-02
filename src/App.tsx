import React, { useState } from 'react';
import { Terminal, Settings } from 'lucide-react';
import { ScriptGrid } from './components/ScriptGrid';
import { ScriptOutput } from './components/ScriptOutput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { usePyodide } from './hooks/usePyodide';
import { defaultConfig } from './config/scriptConfig';
import { Script, ScriptResult, ButtonSize } from './types/Script';

function App() {
  const [config, setConfig] = useState(defaultConfig);
  const [scripts, setScripts] = useState<Script[]>(config.scripts);
  const [results, setResults] = useState<ScriptResult[]>([]);
  const { loading, error, executeScript } = usePyodide();

  const runScript = async (scriptId: string) => {
    setScripts(scripts.map(s => 
      s.id === scriptId ? { ...s, isRunning: true } : s
    ));

    const script = scripts.find(s => s.id === scriptId)!;
    const result = await executeScript(scriptId);

    const scriptResult: ScriptResult = {
      id: scriptId,
      output: result.output,
      status: result.success ? 'success' : 'error',
      timestamp: new Date().toISOString(),
    };

    setResults(prev => [scriptResult, ...prev]);
    setScripts(scripts.map(s => 
      s.id === scriptId ? { ...s, isRunning: false } : s
    ));
  };

  const updateLayout = (columns: number, size: ButtonSize) => {
    setConfig(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        columns,
        buttonSize: size
      }
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Terminal className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              Network Diagnostics Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-3 py-2 rounded-lg border"
              onChange={(e) => updateLayout(Number(e.target.value), config.layout.buttonSize)}
              value={config.layout.columns}
            >
              <option value={1}>1 Column</option>
              <option value={2}>2 Columns</option>
              <option value={3}>3 Columns</option>
            </select>
            <select
              className="px-3 py-2 rounded-lg border"
              onChange={(e) => updateLayout(config.layout.columns, e.target.value as ButtonSize)}
              value={config.layout.buttonSize}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Diagnostic Scripts
            </h2>
            <ScriptGrid
              scripts={scripts}
              onExecute={runScript}
              columns={config.layout.columns}
              buttonSize={config.layout.buttonSize}
              gap={config.layout.gap}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Execution Results
            </h2>
            <ScriptOutput results={results} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;