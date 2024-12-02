class AgentScripts:
    @staticmethod
    def check_agent_status():
        """Check status of home agents."""
        try:
            # Simulated agent status check
            return {
                "success": True,
                "output": "Agent Status Report:\n"
                         "agent1.home.local: RUNNING\n"
                         "agent2.home.local: RUNNING\n"
                         "agent3.home.local: STOPPED\n"
                         "Total Agents: 3\n"
                         "Running: 2\n"
                         "Stopped: 1"
            }
        except Exception as e:
            return {"success": False, "output": f"Agent error: {str(e)}"}