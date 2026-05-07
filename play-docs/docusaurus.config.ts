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
      links: [
        {
          title: 'PLA4Y',
          items: [
            {
              label: 'Docs',
              to: '/docs/overview',
            },
            {
              label: 'NUGS',
              to: '/nugs',
            },
            {
              label: 'Support',
              to: '/support',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bbwdmu/PLA4Y',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PLA4Y`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

