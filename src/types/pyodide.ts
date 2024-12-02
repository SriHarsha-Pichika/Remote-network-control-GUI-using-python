export interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<any>;
  FS: {
    writeFile: (path: string, content: string) => void;
    mkdir: (path: string) => void;
  };
}