import { useState, useEffect } from "react";

export interface ClientData {
  label: string;
  value: number;
}

export interface DiversityData {
  executionClients: ClientData[];
  consensusClients: ClientData[];
}

// Hook to retrieve current LUKSO client distribution
export function useClientDiversityData() {
  const [data, setData] = useState<DiversityData>({
    executionClients: [],
    consensusClients: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
        const targetUrl = "https://clientdiversity.lukso.network/";
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) throw new Error("Network error");

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const consensusContainer = doc.querySelector("div.consensus-data");
        const executionContainer = doc.querySelector("div.execution-data");

        const rawExecutionClients = extractClientData(consensusContainer);
        const rawConsensusClients = extractClientData(executionContainer);

        const aggregatedExecutionClients = aggregateClients(
          rawExecutionClients,
          ["Prysm", "Teku", "Lighthouse", "Nimbus"]
        );
        const aggregatedConsensusClients = aggregateClients(
          rawConsensusClients,
          ["Geth", "Erigon", "Besu", "Nethermind"]
        );

        setData({
          executionClients: aggregatedExecutionClients,
          consensusClients: aggregatedConsensusClients,
        });
      } catch (err) {
        console.warn("Falling back to dummy data for distribution data:", err);
        setData({
          executionClients: [
            { label: "Lighthouse", value: 74 },
            { label: "Prysm", value: 26 },
            { label: "Teku", value: 0 },
            { label: "Nimbus", value: 12 },
            { label: "Others", value: 0 },
          ],
          consensusClients: [
            { label: "Geth", value: 96 },
            { label: "Erigon", value: 3 },
            { label: "Nethermind", value: 1 },
            { label: "Besu", value: 0 },
            { label: "Others", value: 0 },
          ],
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { loading, error, data };
}

// Searches a given element for all wrappers and extracts text from label
function extractClientData(root: Element | null): ClientData[] {
  const clients: ClientData[] = [];
  if (root) {
    const wrappers = root.querySelectorAll("div.my-2");
    wrappers.forEach((wrapper) => {
      const labelElem = wrapper.querySelector("label");
      if (labelElem) {
        const text = labelElem.textContent || "";
        const parts = text.split(" - ");
        if (parts.length === 2) {
          const clientLabel = parts[0].trim();
          const valueStr = parts[1].replace("%", "").trim();
          const value = Math.round(parseFloat(valueStr));
          clients.push({ label: clientLabel, value });
        }
      }
    });
  } else {
    console.warn("No container element found for extraction.");
  }
  return clients;
}

/*
 * Aggregates an array of client data
 *
 * If the label is in allowed, its percentage is summed
 * Otherwise, its percentage is added to "Others"
 */
function aggregateClients(
  clients: ClientData[],
  allowed: string[]
): ClientData[] {
  const result: { [label: string]: number } = {};
  // Initialize all allowed labels with zero
  allowed.forEach((label) => {
    result[label] = 0;
  });
  let othersSum = 0;
  clients.forEach((client) => {
    if (allowed.includes(client.label)) {
      result[client.label] += client.value;
    } else {
      othersSum += client.value;
    }
  });
  const aggregated = allowed.map((label) => ({
    label,
    value: result[label],
  }));
  aggregated.push({ label: "Others", value: othersSum });

  // Sort from highest to lowest percentage
  aggregated.sort((a, b) => b.value - a.value);
  return aggregated;
}
