import { Script } from '../types/Script';

export const diagnosticScripts: Script[] = [
  {
    id: 'ping-test',
    name: 'Ping Test',
    description: 'Test connectivity to remote systems',
    category: 'network',
    command: 'ping -c 4',
    isRunning: false,
  },
  {
    id: 'agent-status',
    name: 'Home Agent Status',
    description: 'Check status of home agents',
    category: 'agent',
    command: './check_agent_status.sh',
    isRunning: false,
  },
  {
    id: 'salt-minions',
    name: 'Salt Minions Check',
    description: 'Verify connected Salt minions',
    category: 'saltstack',
    command: 'salt-run manage.status',
    isRunning: false,
  },
  {
    id: 'network-latency',
    name: 'Network Latency',
    description: 'Measure network latency to remote systems',
    category: 'network',
    command: './measure_latency.py',
    isRunning: false,
  },
];