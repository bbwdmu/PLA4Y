import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './support.module.css';

const supportItems = [
  {
    title: 'Start With The Docs',
    description: 'Use the docs when you need setup steps, Blueprint notes, or system behaviour explained clearly.',
    link: '/docs/overview',
    label: 'Open Docs',
  },
  {
    title: 'Pick A NUGS System',
    description: 'Jump straight to the system you are working on, such as collectibles, health, unlocks, UI, or mascot logic.',
    link: '/nugs',
    label: 'Open NUGS Selector',
  },
  {
    title: 'Check Blueprint Slots',
    description: 'Each system page includes places for screenshots and exported Blueprint node code as the toolkit grows.',
    link: '/docs/NUGS%20-%20Systems/Doors',
    label: 'View Example',
  },
];

export default function Support(): ReactNode {
  return (
    <Layout
      title="Support"
      description="PLA4Y support and documentation help">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.kicker}>Support</p>
            <Heading as="h1" className={styles.title}>Need Help With PLA4Y?</Heading>
            <p className={styles.subtitle}>
              Use this page as the quick support hub for setup, system pages, and future troubleshooting notes.
            </p>
          </div>
        </section>

        <section className="container">
          <div className={styles.panel}>
            <Heading as="h2">Best First Steps</Heading>
            <p>
              PLA4Y is split into small reusable systems called NUGS. Start with the system closest to the problem you are solving, then use the Blueprint tutorial and code slot sections on that page.
            </p>
          </div>

          <div className={styles.grid}>
            {supportItems.map((item) => (
              <article className={styles.card} key={item.title}>
                <Heading as="h3">{item.title}</Heading>
                <p>{item.description}</p>
                <Link className="button button--primary" to={item.link}>
                  {item.label}
                </Link>
              </article>
            ))}
          </div>

          <div className={styles.panelAlt}>
            <Heading as="h2">Planned Support Additions</Heading>
            <ul>
              <li>Common setup issues</li>
              <li>Blueprint troubleshooting notes</li>
              <li>Example level guide</li>
              <li>Known limitations for each NUGS system</li>
              <li>Version notes for Unreal Engine support</li>
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}
