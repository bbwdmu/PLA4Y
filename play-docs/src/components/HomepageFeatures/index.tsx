import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple NUGS',
    icon: '🧩',
    description: (
      <>
        PLA4Y is built from small interchangeable blocks called NUGS, which means Neat Usable Game Systems. Use the systems you need, ignore the ones you do not, and keep your project clean.
      </>
    ),
  },
  {
    title: 'Connected Skeleton',
    icon: '🦴',
    description: (
      <>
        NUGS are designed to connect into a gameplay skeleton. Doors can read collectibles, UI can read health, and systems can talk without duct taping ten random Blueprints together.
      </>
    ),
  },
  {
    title: 'Creativity First',
    icon: '🚀',
    description: (
      <>
        PLA4Y handles repeat setup work so you can spend more time on polish, style, level ideas, and making the game feel like your own.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <article className={styles.featureCard}>
      <div className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
      </div>

      <div className={styles.featureText}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </article>
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
            PLA4Y gives developers a cleaner starting point, with modular NUGS
            that can be swapped, expanded, or ignored depending on the project.
          </p>
        </div>

        <div className={styles.featureList}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
