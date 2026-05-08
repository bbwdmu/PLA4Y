import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'PLA4Y',
  tagline: 'Modular platformer toolkit for Unreal Engine 5.7',
  favicon: 'img/PLA4YLogoTransparent.svg',

  url: 'https://bbwdmu.github.io',

  baseUrl: '/PLA4Y/',

  organizationName: 'bbwdmu',
  projectName: 'PLA4Y',

  onBrokenLinks: 'throw',

  scripts: [
    {
      src: 'https://joined-forces.github.io/klee/js/klee.min.js',
      async: true,
    },
  ],

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
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          ignorePatterns: ['/tags/**'],
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
    metadata: [
      {
        name: 'description',
        content:
          'PLA4Y NUGS documentation for a modular Unreal Engine 5.7 platformer toolkit with reusable gameplay systems for collectibles, doors, health, power-ups, UI, and mascot companions.',
      },
      {
        name: 'keywords',
        content:
          'PLA4Y, NUGS, Unreal Engine 5.7, Unreal Engine toolkit, platformer toolkit, game development documentation, Blueprint systems, collectibles system, health component, power-up system, door unlock system, mascot companion system, Docusaurus',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'PLA4Y Documentation',
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
    ],
    navbar: {
      title: 'PLA4Y',
      logo: {
        alt: 'PLA4Y Logo',
        src: 'img/PLA4YLogoTransparent.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/#nugs-selector',
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
              to: '/#nugs-selector',
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

