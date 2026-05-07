import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PLA4Y',
  tagline: 'Modular platformer toolkit for Unreal Engine 5.7',
  favicon: 'img/favicon.ico',

  url: 'https://bbwdmu.github.io',

  baseUrl: '/PLA4Y/',

  organizationName: 'bbwdmu',
  projectName: 'PLA4Y',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'PLA4Y',
      logo: {
        alt: 'PLA4Y Logo',
        src: 'img/favicon.ico',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/nugs',
          position: 'left',
          label: 'NUGS',
        },
        {
          to: '/support',
          position: 'right',
          label: 'Support',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'PLA4Y Logo',
        src: 'img/favicon.ico',
        href: '/',
        width: 42,
        height: 42,
      },
      links: [
        {
          title: 'Start Here',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            {
              label: 'NUG Selector',
              to: '/nugs',
            },
            {
              label: 'Support',
              to: '/support',
            },
          ],
        },
        {
          title: 'Core NUGS',
          items: [
            {
              label: 'Collectibles',
              to: '/docs/NUGS%20-%20Systems/Collectible',
            },
            {
              label: 'Door And Unlock',
              to: '/docs/NUGS%20-%20Systems/Doors',
            },
            {
              label: 'Health',
              to: '/docs/NUGS%20-%20Systems/Health',
            },
          ],
        },
        {
          title: 'Extra NUGS',
          items: [
            {
              label: 'Mascot',
              to: '/docs/NUGS%20-%20Systems/Mascot',
            },
            {
              label: 'Ability And Power-Up',
              to: '/docs/NUGS%20-%20Systems/Ability',
            },
            {
              label: 'UI',
              to: '/docs/UI/UI',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/bbwdmu/PLA4Y',
            },
            {
              label: 'GitHub Pages Site',
              href: 'https://bbwdmu.github.io/PLA4Y/',
            },
          ],
        },
      ],
      copyright: `PLA4Y NUGS, Platformer Logic Assembled 4 You. Built with Docusaurus. Copyright © ${new Date().getFullYear()} PLA4Y.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

