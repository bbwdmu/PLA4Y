import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const nugs = [
  {
    title: 'Interaction',
    shortName: 'Interaction NUG',
    emoji: '🧩',
    status: 'Core NUG',
    description: 'Detect interactable actors, show player prompts, and trigger interface-based gameplay logic.',
    to: '/docs/NUGS%20-%20Systems/Interaction',
  },
  {
    title: 'Collectibles',
    shortName: 'Collectible NUG',
    emoji: '💎',
    status: 'Core NUG',
    description: 'Data-driven pickups, wallet values, and collectible tracking for collectathon-style projects.',
    to: '/docs/NUGS%20-%20Systems/Collectible',
  },
  {
    title: 'Door And Unlock',
    shortName: 'Door NUG',
    emoji: '🚪',
    status: 'Gameplay NUG',
    description: 'Reusable unlock logic for doors, gates, jars, rocks, rewards, and progression checks.',
    to: '/docs/NUGS%20-%20Systems/Doors',
  },
  {
    title: 'Health',
    shortName: 'Health NUG',
    emoji: '❤️',
    status: 'Core NUG',
    description: 'Damage, healing, lives, death checks, health states, and UI feedback hooks.',
    to: '/docs/NUGS%20-%20Systems/Health',
  },
  {
    title: 'Mascot',
    shortName: 'Mascot NUG',
    emoji: '✨',
    status: 'Companion NUG',
    description: 'A companion actor that follows the player, reacts to state, and supports platformer feedback.',
    to: '/docs/NUGS%20-%20Systems/Mascot',
  },
  {
    title: 'Ability And Power-Up',
    shortName: 'Power-Up NUG',
    emoji: '⚡',
    status: 'In Progress',
    description: 'Temporary power-ups, ability states, timers, action-based checks, and expandable effects.',
    to: '/docs/NUGS%20-%20Systems/Ability',
  },
  {
    title: 'UI',
    shortName: 'UI NUG',
    emoji: '🖥️',
    status: 'Support NUG',
    description: 'HUD widgets, prompts, requirement feedback, display hooks, and player-facing information.',
    to: '/docs/UI/UI',
  },
];

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className="container">
        <img
          src="img/PLA4YLogoTransparent.svg"
          alt="PLA4Y logo showing a controller breaking into modular blue blocks"
          className={styles.heroLogo}
        />

        <p className={styles.kicker}>PLA4Y Documentation</p>

        <Heading as="h1" className={styles.heroTitle}>
          PLA4Y
        </Heading>

        <p className={styles.heroAcronym}>
          Platformer Logic Assembled 4 You
        </p>

        <p className={styles.heroSubtitle}>
          Modular platformer building blocks for Unreal Engine 5.7.
        </p>

        <p className={styles.heroIntro}>
          PLA4Y is built around <strong>NUGS</strong>, short for <strong><span className={styles.acronymLetter}>N</span>eat <span className={styles.acronymLetter}>U</span>sable <span className={styles.acronymLetter}>G</span>ame <span className={styles.acronymLetter}>S</span>ystems</strong>. Each NUG is a small focused gameplay system, such as interaction, collectibles, health, doors, UI, power-ups, or mascot logic. Use one, combine several, or expand them into a full platformer toolkit.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            Open Docs
          </Link>
          <Link className="button button--secondary button--lg" to="#nugs-selector">
            View NUGS
          </Link>
        </div>
      </div>
    </header>
  );
}

function NugsHomeSelector() {
  return (
    <section id="nugs-selector" className={styles.nugsSection}>
      <div className="container">
        <div className={styles.nugsHeader}>
          <Heading as="h2">NUGS</Heading>
          <p className={styles.nugsMeaning}>Neat Usable Game Systems</p>
          <p>
            Each NUG is a reusable gameplay system. Pick one below to view its setup notes, Blueprint workflow, screenshots, known issues, and implementation details.
          </p>
        </div>

        <p className={styles.selectorLabel}>NUG Selector</p>

        <div className={styles.nugsGrid}>
          {nugs.map((nug) => (
            <Link className={styles.nugCard} to={nug.to} key={nug.title}>
              <div className={styles.cardTopRow}>
                <div className={styles.emojiWrap} aria-hidden="true">
                  {nug.emoji}
                </div>
                <span className={styles.nugStatus}>{nug.status}</span>
              </div>

              <Heading as="h3" className={styles.nugTitle}>{nug.title}</Heading>
              <p className={styles.nugShortName}>{nug.shortName}</p>
              <p>{nug.description}</p>
              <span className={styles.cardAction}>Open NUG docs</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="PLA4Y NUGS documentation for modular Unreal Engine platformer systems, including interaction, collectibles, doors, health, abilities, UI, and mascot companion systems.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <NugsHomeSelector />
      </main>
    </Layout>
  );
}
