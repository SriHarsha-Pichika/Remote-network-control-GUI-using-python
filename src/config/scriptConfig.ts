import { Script } from '../types/Script';

export interface ScriptConfig {
  scripts: Script[];
  layout: {
    columns: number;
    buttonSize: 'sm' | 'md' | 'lg';
    gap: number;
  };
}

export const defaultConfig: ScriptConfig = {
  scripts: [
    {
      id: 'ping-test',
      name: 'Ping Test',
      description: 'Test connectivity to remote systems',
      category: 'network',
      command: 'ping -c 4 8.8.8.8',
      isRunning: false,
      buttonStyle: {
        bgColor: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600',
      },
    },
    {
      id: 'agent-status',
      name: 'Home Agent Status',
      description: 'Check status of home agents',
      category: 'agent',
      command: './check_agent_status.sh',
      isRunning: false,
      buttonStyle: {
        bgColor: 'bg-green-500',
        hoverColor: 'hover:bg-green-600',
      },
    },
    {
      id: 'salt-minions',
      name: 'Salt Minions Check',
      description: 'Verify connected Salt minions',
      category: 'saltstack',
      command: 'salt-run manage.status',
      isRunning: false,
      buttonStyle: {
        bgColor: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-600',
      },
    },
  ],
  layout: {
    columns: 1,
    buttonSize: 'md',
    gap: 4,
  },
};
