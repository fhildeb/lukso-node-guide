import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "LUKSO NODE GUIDE",
  tagline: "Everything about Homestaking",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://lukso-node-guide.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "fhildeb", // Usually your GitHub org/user name.
  projectName: "lukso-node-guide", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },

          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "LUKSO NODE GUIDE",
      logo: {
        alt: "Node Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "theorySidebar",
          position: "left",
          label: "Theory",
        },
        {
          type: "docSidebar",
          sidebarId: "guidesSidebar",
          position: "left",
          label: "Guides",
        },
        {
          type: "docSidebar",
          sidebarId: "archiveSidebar",
          position: "left",
          label: "Archive",
        },
        {
          type: "custom-aprButton",
          position: "right",
        },
        {
          href: "https://github.com/fhildeb/lukso-node-guide",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Node Operation",
              href: "https://docs.lukso.tech/networks/mainnet/running-a-node",
            },
            {
              label: "Network Parameters",
              href: "https://docs.lukso.tech/networks/mainnet/parameters",
            },
            {
              label: "Staking Launchpad",
              href: "https://deposit.mainnet.lukso.network/en/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Official Discord",
              href: "https://discord.gg/lukso",
            },
            {
              label: "Validator Newsletter",
              href: "https://luksovalidators.substack.com/",
            },
            {
              label: "Medium Blog Posts",
              href: "https://medium.com/lukso",
            },
          ],
        },
        {
          title: "Monitoring",
          items: [
            {
              label: "Client Distribution",
              href: "https://clientdiversity.lukso.network/",
            },
            {
              label: "Execution Status Overview",
              href: "https://stats.execution.mainnet.lukso.network/",
            },
            {
              label: "Consensus Explorer",
              href: "https://explorer.consensus.mainnet.lukso.network/",
            },
          ],
        },
        {
          title: "Software",
          items: [
            {
              label: "Validator Interface",
              href: "https://medium.com/lukso",
            },
            {
              label: "Network Configuration",
              href: "https://github.com/lukso-network/network-configs",
            },
            {
              label: "Key Generation Client",
              href: "https://github.com/lukso-network/tools-wagyu-key-gen",
            },
          ],
        },
      ],
      copyright: `Copyright @ ${new Date().getFullYear()} Felix Hildebrandt`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
