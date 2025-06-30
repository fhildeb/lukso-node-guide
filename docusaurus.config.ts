import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "LUKSO NODE GUIDE",
  tagline: "Everything about Homestaking",
  favicon: "img/favicon.ico",

  url: "https://lukso-nodes.com",
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
              label: "Execution Status Panel",
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
      copyright: `
    © ${new Date().getFullYear()} Felix Hildebrandt&nbsp;
    <br />
    <a href="https://profile.link/voulex@0F41"
       target="_blank" rel="noopener"
       class="footer-icon" aria-label="Universal Profile">
      <svg class="logo" width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" rx="4.2" fill="currentColor"></rect><path class="bg" d="M5.74148 5.18182H6.79545V8.98295C6.79545 9.39962 6.69697 9.7661 6.5 10.0824C6.30492 10.3987 6.0303 10.6458 5.67614 10.8239C5.32197 11 4.90814 11.0881 4.43466 11.0881C3.95928 11.0881 3.54451 11 3.19034 10.8239C2.83617 10.6458 2.56155 10.3987 2.36648 10.0824C2.1714 9.7661 2.07386 9.39962 2.07386 8.98295V5.18182H3.12784V8.89489C3.12784 9.13731 3.18087 9.35322 3.28693 9.54261C3.39489 9.73201 3.5464 9.88068 3.74148 9.98864C3.93655 10.0947 4.16761 10.1477 4.43466 10.1477C4.7017 10.1477 4.93277 10.0947 5.12784 9.98864C5.32481 9.88068 5.47633 9.73201 5.58239 9.54261C5.68845 9.35322 5.74148 9.13731 5.74148 8.89489V5.18182ZM7.54105 11V5.18182H9.72287C10.1698 5.18182 10.5448 5.26515 10.8479 5.43182C11.1528 5.59848 11.3829 5.82765 11.5382 6.11932C11.6954 6.40909 11.774 6.73864 11.774 7.10795C11.774 7.48106 11.6954 7.8125 11.5382 8.10227C11.381 8.39205 11.149 8.62027 10.8422 8.78693C10.5354 8.9517 10.1575 9.03409 9.70866 9.03409H8.26264V8.16761H9.56662C9.82798 8.16761 10.042 8.12216 10.2087 8.03125C10.3753 7.94034 10.4984 7.81534 10.578 7.65625C10.6594 7.49716 10.7001 7.31439 10.7001 7.10795C10.7001 6.90152 10.6594 6.7197 10.578 6.5625C10.4984 6.4053 10.3744 6.28314 10.2058 6.19602C10.0392 6.10701 9.8242 6.0625 9.56094 6.0625H8.59503V11H7.54105ZM13.5026 5.18182L13.4088 9.28977H12.494L12.4031 5.18182H13.5026ZM12.9514 11.0625C12.7791 11.0625 12.6313 11.0019 12.5082 10.8807C12.387 10.7595 12.3264 10.6117 12.3264 10.4375C12.3264 10.267 12.387 10.1212 12.5082 10C12.6313 9.87879 12.7791 9.81818 12.9514 9.81818C13.12 9.81818 13.2658 9.87879 13.3889 10C13.5139 10.1212 13.5764 10.267 13.5764 10.4375C13.5764 10.553 13.5471 10.6581 13.4884 10.7528C13.4315 10.8475 13.3558 10.9233 13.2611 10.9801C13.1683 11.035 13.0651 11.0625 12.9514 11.0625Z" fill="inherit"></path></svg>
    </a>
    <a href="https://x.com/voulex"
       target="_blank" rel="noopener"
       class="footer-icon" aria-label="Twitter">
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z" fill="currentColor"></path></svg>
    </a>
    <a href="https://app.ens.domains/fhildeb.eth"
       target="_blank" rel="noopener"
       class="footer-icon" aria-label="ENS">
      <svg enable-background="new 0 0 72.7 80.9" viewBox="0 0 72.7 80.9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a"><stop offset=".58" stop-color="#a0a8d4"/><stop offset=".73" stop-color="#8791c7"/><stop offset=".91" stop-color="#6470b4"/></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="36.0416" x2="6.66" xlink:href="#a" y1=".9481" y2="32.7999"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="36.6586" x2="66.0292" xlink:href="#a" y1="80.0185" y2="48.1894"/><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="36.3226" x2="36.3226" y1="-.3999" y2="81.2"><stop offset="0" stop-color="#513eff"/><stop offset=".18" stop-color="#5157ff"/><stop offset=".57" stop-color="#5298ff"/><stop offset="1" stop-color="#52e5ff"/></linearGradient><path d="m9.3 32.8c.8 1.7 2.8 5.1 2.8 5.1l22.9-37.9-22.3 15.6c-1.3.9-2.4 2.1-3.2 3.5-2.1 4.3-2.1 9.3-.2 13.7z" fill="currentColor"/><path d="m.3 45.2c.5 7.3 4.2 14.1 10 18.5l24.7 17.2s-15.5-22.3-28.5-44.5c-1.3-2.3-2.2-4.9-2.6-7.6-.2-1.2-.2-2.4 0-3.6-.3.6-1 1.9-1 1.9-1.3 2.7-2.2 5.6-2.7 8.6-.3 3.2-.3 6.4.1 9.5z" fill="currentColor"/><path d="m63.3 48.2c-.8-1.7-2.8-5.1-2.8-5.1l-22.9 37.8 22.4-15.5c1.3-.9 2.4-2.1 3.2-3.5 2-4.3 2.1-9.3.1-13.7z" fill="currentColor"/><path d="m72.4 35.7c-.5-7.3-4.2-14.1-10-18.5l-24.7-17.2s15.5 22.3 28.5 44.5c1.3 2.3 2.2 4.9 2.6 7.6.2 1.2.2 2.4 0 3.6.3-.6 1-1.9 1-1.9 1.3-2.7 2.2-5.6 2.7-8.5.2-3.3.2-6.4-.1-9.6z" fill="currentColor"/><path d="m9.5 19.1c.8-1.4 1.8-2.6 3.2-3.5l22.3-15.6-22.9 37.8s-2-3.4-2.8-5.1c-1.9-4.3-1.9-9.3.2-13.6zm-9.2 26.1c.5 7.3 4.2 14.1 10 18.5l24.7 17.2s-15.5-22.3-28.5-44.5c-1.3-2.3-2.2-4.9-2.6-7.6-.2-1.2-.2-2.4 0-3.6-.3.6-1 1.9-1 1.9-1.3 2.7-2.2 5.6-2.7 8.6-.3 3.2-.3 6.4.1 9.5zm63 3c-.8-1.7-2.8-5.1-2.8-5.1l-22.9 37.8 22.4-15.5c1.3-.9 2.4-2.1 3.2-3.5 2-4.3 2.1-9.3.1-13.7zm9-12.4c-.5-7.3-4.2-14.1-10-18.5l-24.6-17.3s15.5 22.3 28.5 44.5c1.3 2.3 2.2 4.9 2.6 7.6.2 1.2.2 2.4 0 3.6.3-.6 1-1.9 1-1.9 1.3-2.7 2.2-5.6 2.7-8.5.2-3.3.2-6.4-.2-9.5z" fill="currentColor"/></svg>
    </a>
    <a href="https://fhildeb.medium.com"
       target="_blank" rel="noopener"
       class="footer-icon" aria-label="Medium">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><path fill="currentColor" d="M140 0v140H0V0h140zM50.7 31.6H23.4v1.6l8.8 10.5c.9.8 1.3 2 1.2 3.1v41.6c.3 1.5-.2 3-1.3 4.1l-9.8 12v1.6h28v-1.6l-10-12a5 5 0 0 1-1.3-4.1v-36l24.6 53.7h2.9l21-53.7v43c0 1 0 1.2-.7 1.9l-7.6 7.4v1.6h37v-1.6l-7.4-7.2c-.6-.5-1-1.3-.8-2.1v-53c-.2-.7.2-1.5.8-2l7.5-7.2v-1.6h-26L71.8 77.8l-21-46.2z"/></svg>
    </a>
    <a href="https://www.fhildeb.com/"
       target="_blank" rel="noopener"
       class="footer-icon" aria-label="ENS">
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>
    </a>
  `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  /**
   * Disable Cache for Production Builds
   * Uncomment for Local Testing
   *
   * Causes warnings due to high buffer
   * elements from long page content.
   */
  plugins: [
    function customWebpackPlugin() {
      return {
        name: "custom-webpack-plugin",
        configureWebpack() {
          return {
            cache: false,
          };
        },
      };
    },
  ],
};

export default config;
