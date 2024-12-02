import { PyodideInterface } from '../types/pyodide';
import { networkScript, agentScript, saltScript, mainScript } from './pythonScripts';

export async function setupPythonEnvironment(pyodide: PyodideInterface) {
  // Create the virtual filesystem structure
  await pyodide.runPythonAsync(`
import sys
import os

# Create necessary directories
os.makedirs('/python/scripts', exist_ok=True)
  `);

  // Create Python files in the virtual filesystem
  await pyodide.FS.writeFile('/python/scripts/network_scripts.py', networkScript);
  await pyodide.FS.writeFile('/python/scripts/agent_scripts.py', agentScript);
  await pyodide.FS.writeFile('/python/scripts/salt_scripts.py', saltScript);
  await pyodide.FS.writeFile('/python/main.py', mainScript);

  // Initialize the Python environment
  await pyodide.runPythonAsync(`
import sys
sys.path.append('/python')
from main import DiagnosticTools
tools = DiagnosticTools()
  `);
}