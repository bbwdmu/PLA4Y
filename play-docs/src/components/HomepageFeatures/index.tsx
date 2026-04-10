import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple NUGS ',
    icon: '🧩',
    description: (
      <>
        PLA4Y is built from small interchangeable blocks called NUGS (Neat Useable Game Systems). Need collectibles but
        not doors yet. Fine. Need health without mascot logic. Also fine. No
        tangled nonsense required.
      </>
    ),
  },
  {
    title: 'Connected Skeleton',
    icon: '🦴',
    description: (
      <>
        These systems are meant to connect cleanly and form a gameplay skeleton
        fast. Doors can read collectibles, UI can read health, and you are not
        left duct taping ten random Blueprints together at 2am.
      </>
    ),
  },
  {
    title: 'Creativity First',
    icon: '🚀',
    description: (
      <>
        The goal is to stop mechanics from holding you hostage. PLA4Y handles
        the boring repeat work so you can spend more time on polish, style, and
        making your game actually feel like your game.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.iconWrap} aria-hidden="true">
          <span className={styles.icon}>{icon}</span>
        </div>

        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionIntro}>
          <Heading as="h2">Why PLA4Y exists</Heading>
          <p>
            Rebuilding the same core mechanics over and over is a waste of time.
            PLA4Y gives developers a cleaner starting point, with modular NUGs
            that can be swapped, expanded, or ignored depending on the project.
          </p>
        </div>

        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}