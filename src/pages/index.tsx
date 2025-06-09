import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { HomepageHeader } from "../components/HomepageHeader/HomepageHeader";
import { StatusPanel } from "../components/StatusPanel/StatusPanel";
import { PageRegistry } from "../components/PageRegistry/PageRegistry";

// Homepage Layout
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <StatusPanel />
      <PageRegistry />
    </Layout>
  );
}
