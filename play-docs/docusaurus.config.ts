import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = 'https://bbwdmu.github.io';
const baseUrl = '/PLA4Y/';
const siteTitle = 'PLA4Y NUGS Documentation';
const siteDescription =
  'PLA4Y NUGS documentation for modular Unreal Engine 5.7 gameplay systems, including interaction, collectibles, doors, health, abilities, UI, and mascot companion systems.';
const socialCardUrl = `${siteUrl}${baseUrl}img/social-card.svg`;

const config: Config = {
  title: 'PLA4Y',
  tagline: 'Modular platformer toolkit for Unreal Engine 5.7',
  favicon: 'img/favicon.ico',

  url: siteUrl,

  baseUrl,

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
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'description',
        content: siteDescription,
      },
      {
        name: 'keywords',
        content:
          'PLA4Y, NUGS, Neat Usable Game Systems, Unreal Engine 5.7, Unreal Engine toolkit, platformer toolkit, game development documentation, Blueprint systems, Blueprint logic, Klee Blueprint renderer, collectibles system, interaction system, health component, power-up system, door unlock system, mascot companion system, Docusaurus',
      },
      {
        name: 'author',
        content: 'Benjamin Brandwood-Ward',
      },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large',
      },
      {
        name: 'theme-color',
        content: '#0d6bff',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: siteTitle,
      },
      {
        property: 'og:title',
        content: siteTitle,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:url',
        content: `${siteUrl}${baseUrl}`,
      },
      {
        property: 'og:image',
        content: socialCardUrl,
      },
      {
        property: 'og:image:secure_url',
        content: socialCardUrl,
      },
      {
        property: 'og:image:type',
        content: 'image/svg+xml',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '675',
      },
      {
        property: 'og:image:alt',
        content: 'PLA4Y NUGS social card showing modular Unreal Engine gameplay systems.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: siteTitle,
      },
      {
        name: 'twitter:description',
        content: siteDescription,
      },
      {
        name: 'twitter:image',
        content: socialCardUrl,
      },
      {
        name: 'twitter:image:alt',
        content: 'PLA4Y NUGS social card showing modular Unreal Engine gameplay systems.',
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

