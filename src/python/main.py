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