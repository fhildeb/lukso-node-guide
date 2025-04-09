import { useEffect, useState } from "react";

export interface BlogData {
  title: string;
  caption: string;
  date: string;
  link: string;
}

// Hook to retrieve latest LUKSO Substack post
export function useSubstackData() {
  const staticData: BlogData = {
    title: "LUKSO Dencun Hard Fork - MAINNET",
    caption:
      "🚨 ACTION REQUIRED by node operators and validators of the LUKSO Mainnet",
    date: "Oct 3, 2024",
    link: "https://luksovalidators.substack.com/p/lukso-dencun-hard-fork-mainnet",
  };

  const [data, setData] = useState<BlogData | null>(null);
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
