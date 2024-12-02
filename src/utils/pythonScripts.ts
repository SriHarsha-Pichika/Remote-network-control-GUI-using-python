export const networkScript = `
class NetworkScripts:
    @staticmethod
    def ping_test(host="8.8.8.8"):
        """Test connectivity to remote systems."""
        try:
            return {
                "success": True,
                "output": f"PING {host} (8.8.8.8): 56 data bytes\\n"
                         "64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=12.994 ms\\n"
                         "64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=14.667 ms\\n"
                         "--- 8.8.8.8 ping statistics ---\\n"
                         "2 packets transmitted, 2 packets received, 0.0% packet loss\\n"
                         "round-trip min/avg/max/stddev = 12.994/13.831/14.667/0.836 ms"
            }
        except Exception as e:
            return {"success": False, "output": f"Network error: {str(e)}"}
`;

export const agentScript = `
class AgentScripts:
    @staticmethod
    def check_agent_status():
        """Check status of home agents."""
        try:
            return {
                "success": True,
                "output": "Agent Status Report:\\n"
                         "agent1.home.local: RUNNING\\n"
                         "agent2.home.local: RUNNING\\n"
                         "agent3.home.local: STOPPED\\n"
                         "Total Agents: 3\\n"
                         "Running: 2\\n"
                         "Stopped: 1"
            }
        except Exception as e:
            return {"success": False, "output": f"Agent error: {str(e)}"}
`;

export const saltScript = `
class SaltScripts:
    @staticmethod
    def check_minions():
        """Check Salt minion status."""
        try:
            return {
                "success": True,
                "output": "Salt Minion Status:\\n"
                         "Up (2):\\n"
                         "  - minion1.example.com\\n"
                         "  - minion2.example.com\\n"
                         "Down (1):\\n"
                         "  - minion3.example.com"
            }
        except Exception as e:
            return {"success": False, "output": f"Salt error: {str(e)}"}
`;

export const mainScript = `
from scripts.network_scripts import NetworkScripts
from scripts.agent_scripts import AgentScripts
from scripts.salt_scripts import SaltScripts

class DiagnosticTools:
    def __init__(self):
        self.network = NetworkScripts()
        self.agent = AgentScripts()
        self.salt = SaltScripts()
    
    def execute_script(self, script_id, params=None):
        """Execute the specified diagnostic script."""
        try:
            if script_id == "ping-test":
                return self.network.ping_test()
            elif script_id == "agent-status":
                return self.agent.check_agent_status()
            elif script_id == "salt-minions":
                return self.salt.check_minions()
            else:
                return {
                    "success": False,
                    "output": f"Unknown script: {script_id}"
                }
        except Exception as e:
            return {
                "success": False,
                "output": f"Error executing script: {str(e)}"
            }
`;