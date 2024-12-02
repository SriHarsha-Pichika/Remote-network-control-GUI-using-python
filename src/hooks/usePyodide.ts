import { useState, useEffect } from 'react';
import { loadPyodide } from 'pyodide';
import { PyodideInterface } from '../types/pyodide';
import { setupPythonEnvironment } from '../utils/pyodideSetup';
import 'isomorphic-fetch';

const PYODIDE_VERSION = '0.25.1';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

export const usePyodide = () => {
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        const pyodideInstance = await loadPyodide({
          indexURL: PYODIDE_URL
        });
        
        await setupPythonEnvironment(pyodideInstance);
        setPyodide(pyodideInstance);
        setLoading(false);
      } catch (err) {
        console.error('Pyodide initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize Python environment');
        setLoading(false);
      }
    };

    initPyodide();
  }, []);

  const executeScript = async (scriptId: string) => {
    if (!pyodide) {
      return {
        success: false,
        output: 'Python environment not initialized'
      };
    }
    
    try {
      const result = await pyodide.runPythonAsync(`
tools.execute_script("${scriptId}")
      `);
      return result.toJs();
    } catch (err) {
      console.error('Script execution error:', err);
      return {
        success: false,
        output: err instanceof Error ? err.message : 'Script execution failed'
      };
    }
  };

  return { pyodide, loading, error, executeScript };
};