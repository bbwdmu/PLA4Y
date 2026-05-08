import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = 'https://bbwdmu.github.io';
const baseUrl = '/PLA4Y/';
const siteTitle = 'PLA4Y NUGS: Modular Unreal Engine Platformer Toolkit';
const siteDescription =
  'Reusable Unreal Engine 5.7 platformer systems for interaction, collectibles, doors, health, abilities, UI, and mascot companions.';
const socialCardUrl = `${siteUrl}${baseUrl}img/social-card.png`;
const appIconUrl = `${baseUrl}apple-touch-icon.png?v=3`;

const config: Config = {
  title: 'PLA4Y',
  tagline: 'Modular platformer toolkit for Unreal Engine 5.7',
  favicon: 'img/favicon.ico',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: appIconUrl,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: `${baseUrl}apple-touch-icon-ipad-retina-152x152.png?v=3`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: `${baseUrl}apple-touch-icon-iphone-retina-120x120.png?v=3`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: `${baseUrl}apple-touch-icon-ipad-76x76.png?v=3`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: `${baseUrl}apple-touch-icon-iphone-60x60.png?v=3`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon-precomposed',
        sizes: '180x180',
        href: appIconUrl,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '180x180',
        href: appIconUrl,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${baseUrl}site.webmanifest`,
      },
    },
  ],

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

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        searchResultLimits: 8,
        searchResultContextMaxLength: 60,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
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
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'PLA4Y',
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
        content: 'image/png',
      },
      {
        property: 'og:image:width',
        content: '1200',
      },
      {
        property: 'og:image:height',
        content: '630',
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
