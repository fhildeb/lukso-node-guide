// Page structure and properties for the landing page
const sections = [
  {
    name: "Guides",
    emoji: "📖",
    chapters: [
      {
        title: "Validator Setup",
        pages: [
          "Precautions",
          "OS Installation",
          "Wagyu Key Generation",
          "CLI Key Generation",
          "Launchpad Walkthrough",
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
        pages: ["Address Checkup", "Static IP Assignment"],
      },
      {
        title: "SSH Setup",
        pages: ["Initialization", "Key Login", "Authentication"],
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
          "Slasher Configuration",
          "Custom Node Name",
          "Validator Graffiti",
          "Public IP Setup",
          "Peer Count Limits",
          "Dynamic DNS",
          "Service Automation",
        ],
      },
      {
        title: "Monitoring",
        pages: [
          "Software Preparation",
          "Port Configuration",
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
          "Revert Client Versions",
          "Switch Clients",
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
        pages: ["Node Specifications", "Router Requirements", "Network Demand"],
      },
      {
        title: "Blockchain Knowledge",
        pages: [
          "Proof of Stake",
          "Tokenomics",
          "Peer Networks",
          "Slashing and Panelties",
          "Client Types",
          "Client Providers",
          "Client Diversity",
        ],
      },
      {
        title: "Node Operation",
        pages: [
          "Client Setups",
          "Operation Systems",
          "Validator Credentials",
          "Staking Deposits",
          "Slasher Service",
          "Peer Discovery",
          "Dynamic DNS",
          "Monitoring Tools",
          "SSH and VPN Tunnel",
          "Disk Management",
          "Utility Tools",
        ],
      },
    ],
  },
  {
    name: "Archive",
    emoji: "📦",
    chapters: [
      {
        title: "Network",
        pages: [
          "Blockchain Timeline",
          "Configuration Updates",
          "Network Forks",
        ],
      },
      {
        title: "Testnet Operators",
        pages: [
          "L16 Client Setup",
          "L16 Node Tooltips",
          "L16 Software Removal",
          "GasHawk Deposits",
        ],
      },
      {
        title: "Genesis Validators",
        pages: ["GasHawk Deposits, Initial Staking"],
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
          "L16 Dashboard USD",
          "Grafana 9 Dashboard EUR",
          "Grafana 9 Dashboard USD",
          "Grafana 11 Dashboard EUR",
          "Grafana 11 Dashboard USD",
        ],
      },
    ],
  },
];

export default sections;
