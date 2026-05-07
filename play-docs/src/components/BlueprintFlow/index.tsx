import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

const KLEE_SCRIPT_SRC = 'https://joined-forces.github.io/klee/js/klee.min.js';
const KLEE_SCRIPT_ID = 'pla4y-klee-script';

type BlueprintFlowProps = {
  title?: string;
  height?: number;
  children: React.ReactNode;
};

declare global {
  interface Window {
    Klee?: {
      init?: (canvas: HTMLCanvasElement) => {display?: (blueprintText: string) => void};
      get?: (canvas: HTMLCanvasElement) => {display?: (blueprintText: string) => void} | undefined;
    };
  }
}

function blueprintTextFromChildren(children: React.ReactNode): string {
  if (Array.isArray(children)) {
    return children.join('');
  }

  if (typeof children === 'string') {
    return children;
  }

  if (children === null || children === undefined) {
    return '';
  }

  return String(children);
}

function loadKleeScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.Klee) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(KLEE_SCRIPT_ID) as HTMLScriptElement | null;

  if (existingScript) {
    return new Promise((resolve, reject) => {
      if (window.Klee) {
        resolve();
        return;
      }

      existingScript.addEventListener('load', () => resolve(), {once: true});
      existingScript.addEventListener('error', () => reject(new Error('Klee failed to load.')), {once: true});
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = KLEE_SCRIPT_ID;
    script.src = KLEE_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Klee failed to load.'));
    document.body.appendChild(script);
  });
}

export default function BlueprintFlow({title, height = 420, children}: BlueprintFlowProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const blueprintText = blueprintTextFromChildren(children).trim();

  useEffect(() => {
    let cancelled = false;

    async function renderBlueprint() {
      const canvas = canvasRef.current;

      if (!canvas || !blueprintText) {
        return;
      }

      try {
        setError(null);

        // Keep the copied Unreal Blueprint export untouched.
        // Klee reads the initial Blueprint source from canvas.innerHTML during init.
        canvas.innerHTML = blueprintText;
        canvas.textContent = blueprintText;

        await loadKleeScript();

        if (cancelled || !window.Klee) {
          return;
        }

        const existingInstance = window.Klee.get?.(canvas);

        if (existingInstance) {
          existingInstance.display?.(blueprintText);
          return;
        }

        window.Klee.init?.(canvas);
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unknown Klee error.';
          setError(`Klee could not render this Blueprint flow. ${message}`);
        }
      }
    }

    renderBlueprint();

    return () => {
      cancelled = true;
    };
  }, [blueprintText]);

  return (
    <section className={styles.wrapper}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.canvasFrame}>
        <canvas ref={canvasRef} className="klee" height={height} data-klee-paste="true" />
      </div>
      {error ? <p className={styles.error}>{error}</p> : null}
      <details className={styles.sourceDetails}>
        <summary>Show copied Blueprint source</summary>
        <pre>{blueprintText}</pre>
      </details>
    </section>
  );
}
