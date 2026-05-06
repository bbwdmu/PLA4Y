import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './nugs.module.css';

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

function NugCard({title, description, to}: {title: string; description: string; to: string}) {
  return (
    <Link className={styles.card} to={to}>
      <div className={styles.logoWrap}>
        <img src="img/PLA4Y.png" alt="NUGS logo" className={styles.logo} />
      </div>
      <div className={styles.cardText}>
        <Heading as="h2" className={styles.cardTitle}>{title}</Heading>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default function NugsSelector(): ReactNode {
  return (
    <Layout
      title="NUGS Selector"
      description="Choose a PLA4Y NUGS system to open its documentation">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>PLA4Y NUGS</p>
            <Heading as="h1" className={styles.title}>Choose A System</Heading>
            <p className={styles.subtitle}>
              Pick a NUGS card to jump straight into the documentation for that gameplay system.
            </p>
          </div>
        </section>

        <section className="container">
          <div className={styles.grid}>
            {nugs.map((nug) => (
              <NugCard key={nug.title} {...nug} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
