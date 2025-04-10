// Page structure and properties for the landing page
const sections = [
  {
    name: "Guides",
    emoji: "📖",
    chapters: [
      {
        title: "Validator Setup",
        pages: [
          "OS Installation",
          "Wagyu Key Generation",
          "CLI Key Generation",
          "Launchpad Walkthrough",
          "GasHawk Guide",
        ],
      },
      {
        title: "Hardware Setup",
        pages: [
          "Introduction",
          "Mainboard Swap",
          "Component Assembly",
          "OS Installation",
          "BIOS Setup",
          "Ubuntu Configuration",
        ],
      },
      {
        title: "System Setup",
        pages: [
          "Permission Management",
          "Disk Volumes",
          "Ubuntu Updates",
          "Remote Access",
          "Startup Utility",
          "Firewall Configuration",
          "Bruteforce Protection",
        ],
      },
      {
        title: "Router Setup",
        pages: ["Address Checkup", "Static IP Layout"],
      },
      {
        title: "SSH Setup",
        pages: [
          "Installation",
          "Configuration",
          "Trial Connection",
          "Key Usage",
          "Authentication",
        ],
      },
      {
        title: "Client Setup",
        pages: [
          "Firewall Settings",
          "Router Port Arrangement",
          "LUKSO CLI Installation",
          "Validator Configuration",
        ],
      },
      {
        title: "Modifications",
        pages: [
          "Client Name and Graffiti",
          "Peer Verification",
          "Dynamic DNS",
          "Service Automation",
        ],
      },
      {
        title: "Monitoring",
        pages: [
          "Introduction",
          "Ports and Installation",
          "Node Exporter",
          "JSON Exporter",
          "Blackbox Exporter",
          "Prometheus",
          "Grafana",
          "Dashboard Configuration",
          "External Monitoring",
        ],
      },
      {
        title: "Alert Systems",
        pages: ["Telegram Bot", "Image Rendering"],
      },
      {
        title: "External Access",
        pages: ["Tailscale"],
      },
      {
        title: "Maintenance",
        pages: [
          "Software Updates",
          "Client Updates",
          "Problem Scanning",
          "Reverting Client Versions",
          "Switching Clients",
          "Gas Price Configuration",
          "Reset Blockchain State",
          "Restart Monitoring",
        ],
      },
      {
        title: "Withdrawals",
        pages: ["Adding Withdrawals", "Exit Validators"],
      },
    ],
  },
  {
    name: "Theory",
    emoji: "🧠",
    chapters: [
      {
        title: "Preparations",
        pages: [
          "Node Specification",
          "Router Requirements",
          "Network Demand",
          "Operation Systems",
        ],
      },
      {
        title: "Blockchain Knowledge",
        pages: [
          "Operation Types",
          "Network Introduction",
          "Client Operations",
          "Client Differentiations",
          "Client Diversity",
        ],
      },
      {
        title: "Node Operation",
        pages: [
          "Staking",
          "Validator Credentials",
          "Peer Discovery",
          "Dynamic DNS",
          "Monitoring Tools",
          "VPN Tunnel",
          "Network Updates",
        ],
      },
    ],
  },
  {
    name: "Archive",
    emoji: "📦",
    chapters: [
      {
        title: "",
        pages: [
          "L16 Client Installation",
          "L16 Node Tooltips",
          "L16 Software Removal",
        ],
      },
    ],
  },
  {
    name: "Templates",
    emoji: "📝",
    chapters: [
      {
        title: "",
        pages: [
          "L16 Grafana Dashboard USD",
          "Mainnet Grafana 7 Dashboard EUR",
          "Mainnet Grafana 7 Dashboard USD",
          "Mainnet Grafana 9 Dashboard EUR",
          "Mainnet Grafana 9 Dashboard USD",
        ],
      },
    ],
  },
];

export default sections;
