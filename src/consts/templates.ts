export type Dashboard = {
  filename: string;
  label: string;
  grafana: string;
  currency: string;
};

const templates: Dashboard[] = [
  {
    filename: "grafana-11-prysm-lighthouse-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-11-prysm-lighthouse-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-9-prysm-lighthouse-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-9-prysm-lighthouse-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-8-prysm-lighthouse-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-8-prysm-lighthouse-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-8-l16-prysm-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Prysm & Lighthouse",
  },
  {
    filename: "grafana-11-teku-nimbus2-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Teku & Nimbus-Eth2",
  },
  {
    filename: "grafana-11-teku-nimbus-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Teku & Nimbus-Eth2",
  },
  {
    filename: "grafana-9-teku-nimbus2-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Teku & Nimbus-Eth2",
  },
  {
    filename: "grafana-9-teku-nimbus2-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Teku & Nimbus-Eth2",
  },
  {
    filename: "grafana-8-teku-nimbus2-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Teku & Nimbus-Eth2",
  },
  {
    filename: "grafana-8-teku-nimbus2-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Teku & Nimbus-Eth2",
  },
];

export default templates;
