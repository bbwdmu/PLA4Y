import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          src="/img/docusaurus.png"
          alt="PLA4Y mascot"
          style={{width: '90px', marginBottom: '1rem'}}
        />

        <Heading as="h1" className="hero__title">
          PLA4Y 
        </Heading>

        <Heading as = "h2" className="hero_title">
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
          PLA4Y is built around small reusable systems called NUGS, neat useable
          game systems, that slot together to form a solid gameplay skeleton.
          The point is simple. Stop rebuilding the same mechanics every time and
          get back to making the fun bit.
        </p>

        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            Open Docs
          </Link>
          
        </div>
      </div>
    </header>
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
      </main>
    </Layout>
  );
}