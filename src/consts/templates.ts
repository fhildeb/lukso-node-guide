export type Dashboard = {
  filepath: string;
  label: string;
  grafana: string;
  currency: string;
};

const templates: Dashboard[] = [
  {
    filepath: "/prysm/grafana-12-prysm-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Prysm",
  },
  {
    filepath: "/prysm/grafana-12-prysm-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Prysm",
  },
  {
    filepath: "/prysm/grafana-9-prysm-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Prysm",
  },
  {
    filepath: "/prysm/grafana-9-prysm-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Prysm",
  },
  {
    filepath: "/prysm/grafana-8-prysm-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Prysm",
  },
  {
    filepath: "/prysm/grafana-8-prysm-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Prysm",
  },
  {
    filepath: "/lighthouse/grafana-12-lighthouse-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Lighthouse",
  },
  {
    filepath: "/lighthouse/grafana-12-lighthouse-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Lighthouse",
  },
  {
    filepath: "/lighthouse/grafana-9-lighthouse-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Lighthouse",
  },
  {
    filepath: "/lighthouse/grafana-9-lighthouse-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Lighthouse",
  },
  {
    filepath: "/lighthouse/grafana-8-lighthouse-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Lighthouse",
  },
  {
    filepath: "/lighthouse/grafana-8-lighthouse-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Lighthouse",
  },
  {
    filepath: "/nimbus2/grafana-12-nimbus2-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/nimbus2/grafana-12-nimbus2-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/nimbus2/grafana-9-nimbus2-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/nimbus2/grafana-9-nimbus2-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/nimbus2/grafana-8-nimbus2-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/nimbus2/grafana-8-nimbus2-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Nimbus-Eth2",
  },
  {
    filepath: "/teku/grafana-12-teku-dashboard-usd.json",
    grafana: "12",
    currency: "USD",
    label: "Teku",
  },
  {
    filepath: "/teku/grafana-12-teku-dashboard-eur.json",
    grafana: "12",
    currency: "EUR",
    label: "Teku",
  },
  {
    filepath: "/teku/grafana-9-teku-dashboard-usd.json",
    grafana: "9",
    currency: "USD",
    label: "Teku",
  },
  {
    filepath: "/teku/grafana-9-teku-dashboard-eur.json",
    grafana: "9",
    currency: "EUR",
    label: "Teku",
  },
  {
    filepath: "/teku/grafana-8-teku-dashboard-usd.json",
    grafana: "8",
    currency: "USD",
    label: "Teku",
  },
  {
    filepath: "/teku/grafana-8-teku-dashboard-eur.json",
    grafana: "8",
    currency: "EUR",
    label: "Teku",
  },
];

export default templates;
