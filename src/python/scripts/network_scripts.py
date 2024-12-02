class NetworkScripts:
    @staticmethod
    def ping_test(host="8.8.8.8"):
        """Test connectivity to remote systems."""
        try:
            # Simulated ping test
            return {
                "success": True,
                "output": f"PING {host} (8.8.8.8): 56 data bytes\n"
                         "64 bytes from 8.8.8.8: icmp_seq=0 ttl=116 time=12.994 ms\n"
                         "64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=14.667 ms\n"
                         "--- 8.8.8.8 ping statistics ---\n"
                         "2 packets transmitted, 2 packets received, 0.0% packet loss\n"
                         "round-trip min/avg/max/stddev = 12.994/13.831/14.667/0.836 ms"
            }
        except Exception as e:
            return {"success": False, "output": f"Network error: {str(e)}"}