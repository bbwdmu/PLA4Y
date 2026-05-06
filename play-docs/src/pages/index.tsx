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
    title: 'Collectibles',
    description: 'Data-driven pickups, wallet values, and collectible tracking.',
    to: '/docs/NUGS%20-%20Systems/Collectible',
  },
  {
    title: 'Door And Unlock',
    description: 'Reusable unlock logic for doors, gates, jars, rocks, and rewards.',
    to: '/docs/NUGS%20-%20Systems/Doors',
  },
  {
    title: 'Health',
    description: 'Damage, healing, lives, death checks, and health UI hooks.',
    to: '/docs/NUGS%20-%20Systems/Health',
  },
  {
    title: 'Mascot',
    description: 'A companion actor that follows the player and reacts to state.',
    to: '/docs/NUGS%20-%20Systems/Mascot',
  },
  {
    title: 'Ability And Power-Up',
    description: 'Temporary power-ups, ability states, and action-based checks.',
    to: '/docs/NUGS%20-%20Systems/Ability',
  },
  {
    title: 'UI',
    description: 'HUD widgets, prompts, requirement feedback, and display hooks.',
    to: '/docs/UI/UI',
  },
];

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src="img/PLA4Y.png"
          alt="PLA4Y Logo"
          style={{width: '250px', marginBottom: '1rem'}}
        />

        <Heading as="h1" className="hero__title">
          PLA4Y
        </Heading>

        <Heading as="h2" className="hero_title">
          (Platformer Logic Assembled 4 You)
        </Heading>

        <p className="hero__subtitle">
          Modular platformer building blocks for Unreal Engine 5.7.
        </p>

        <p
          style={{
            maxWidth: '760px',
            margin: '0 auto 1.5rem',
            fontSize: '1rem',
            lineHeight: 1.7,
          }}>
          PLA4Y is built around small reusable systems called NUGS (Neat Useable
          Game Systems) that slot together to form a solid gameplay skeleton.
          The point is simple. Stop rebuilding the same mechanics every time and
          get back to making the fun bit.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            Open Docs
          </Link>
          <Link className="button button--secondary button--lg" to="/nugs">
            Open NUGS Selector
          </Link>
        </div>
      </div>
    </header>
  );
}

function NugsHomeSelector() {
  return (
    <section className={styles.nugsSection}>
      <div className="container">
        <div className={styles.nugsHeader}>
          <p className={styles.kicker}>NUGS Selector</p>
          <Heading as="h2">Choose A Gameplay System</Heading>
          <p>
            Jump straight into the documentation for each reusable PLA4Y system.
          </p>
        </div>

        <div className={styles.nugsGrid}>
          {nugs.map((nug) => (
            <Link className={styles.nugCard} to={nug.to} key={nug.title}>
              <div className={styles.logoWrap}>
                <img src="img/PLA4Y.png" alt="NUGS logo" className={styles.nugLogo} />
              </div>
              <Heading as="h3" className={styles.nugTitle}>{nug.title}</Heading>
              <p>{nug.description}</p>
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
      description="PLA4Y modular platformer toolkit documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <NugsHomeSelector />
      </main>
    </Layout>
  );
}