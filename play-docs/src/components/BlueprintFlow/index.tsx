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

function waitForCanvasPaint(): Promise<void> {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

export default function BlueprintFlow({title, height = 620, children}: BlueprintFlowProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [message, setMessage] = useState<string>('Preparing Blueprint flow...');
  const blueprintText = blueprintTextFromChildren(children).trim();

  useEffect(() => {
    let cancelled = false;

    async function renderBlueprint() {
      const canvas = canvasRef.current;

      if (!canvas || !blueprintText) {
        setMessage('No Blueprint source found.');
        return;
      }

      try {
        setMessage('Rendering Blueprint flow...');

        canvas.innerHTML = blueprintText;
        canvas.textContent = blueprintText;

        await waitForCanvasPaint();
        await loadKleeScript();

        if (cancelled || !window.Klee) {
          return;
        }

        const existingInstance = window.Klee.get?.(canvas);
        const instance = existingInstance ?? window.Klee.init?.(canvas);

        await waitForCanvasPaint();
        instance?.display?.(blueprintText);

        if (!cancelled) {
          setMessage('Blueprint flow rendered automatically.');
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error.';
          setMessage(`Klee render failed: ${errorMessage}`);
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
      <p className={styles.status}>{message}</p>
      <div className={styles.canvasFrame}>
        <canvas ref={canvasRef} className="klee" height={height} data-klee-paste="true" />
      </div>
      <details className={styles.sourceDetails}>
        <summary>Show copied Blueprint source</summary>
        <pre>{blueprintText}</pre>
      </details>
    </section>
  );
}
