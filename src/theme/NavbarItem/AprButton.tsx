import React from "react";
import { useLaunchpadData } from "@site/src/hooks/useLaunchpadData";
("@site/src/hooks/useLaunchpadData");

/**
 * Navbar item that shows the current APR.
 * ─ If the value cannot be fetched, it renders nothing.
 * ─ Clicking the button opens the official LYX deposit page
 */
export default function AprButton() {
  const { loading, error, data } = useLaunchpadData();

  if (loading || error || !data.raw) {
    return null;
  }

  // Normalise percentage input
  const label = `${data.raw.replace(/\s*%/, " %")} APR`;

  return (
    <a
      href="https://deposit.mainnet.lukso.network/"
      className="button navbar__item navbar__link"
      target="_blank"
      rel="noopener noreferrer"
      title="Open the LYX deposit launchpad"
    >
      {label}
    </a>
  );
}
