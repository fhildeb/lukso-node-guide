import { useState, useEffect } from "react";

export interface AprState {
  apr: number | null; // parsed numeric APR
  raw: string | null; // raw text from page
}

// Hook that fetches the APR from the LUKSO Launchpad
export function useLaunchpadData() {
  const staticData = { apr: 7.3, raw: "7,3%" };
  const [data, setData] = useState<AprState>({ apr: null, raw: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * TODO: Replace static APR data with a server-side fetch.
     *
     * Launchpad fetches APR from live data, meaning there needs to be a
     * a headless browser or a rendering service to fetch the fully
     * rendered HTML from the page.
     */
    setData(staticData);
    setLoading(false);
  }, []);

  return { loading, error, data };
}
