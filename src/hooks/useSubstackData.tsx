import { useEffect, useState } from "react";

export interface BlogData {
  title: string;
  date: string;
  link: string;
}

// Hook to retrieve latest LUKSO Substack post
export function useSubstackData() {
  const staticData: BlogData[] = [
    {
      title: "LUKSO Pectra Hard Fork",
      date: "Jul, 2025",
      link: "https://luksovalidators.substack.com/p/lukso-pectra-hard-fork",
    },
    {
      title: "LUKSO Dencun Hard Fork - MAINNET",
      date: "Oct, 2024",
      link: "https://luksovalidators.substack.com/p/lukso-dencun-hard-fork-mainnet",
    },
    {
      title: "LUKSO Dencun Hard Fork - TESTNET",
      date: "Sep, 2024",
      link: "https://luksovalidators.substack.com/p/lukso-dencun-hard-fork-testnet",
    },
    {
      title: "Status Update on the Dencun Fork",
      date: "Jun, 2024",
      link: "https://luksovalidators.substack.com/p/status-update-on-the-dencun-hard",
    },
  ];

  const [data, setData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * TODO: Replace static blogpost data with a server-side fetch.
     *
     * Substack is built mainly on JS, meaning there needs to be a
     * a headless browser or a rendering service to fetch the fully
     * rendered HTML from the Substack archive page.
     */
    setData(staticData);
    setLoading(false);
  }, []);

  return { loading, error, data };
}
