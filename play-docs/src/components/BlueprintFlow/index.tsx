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

function normalizeUnrealObjectPath(value: string): string {
  return value
    .replace(/"\/Script\/CoreUObject\.Class'([^']+)'"/g, 'Class\'"$1"\'')
    .replace(/"\/Script\/CoreUObject\.ScriptStruct'([^']+)'"/g, 'ScriptStruct\'"$1"\'')
    .replace(/"\/Script\/Engine\.BlueprintGeneratedClass'([^']+)'"/g, 'BlueprintGeneratedClass\'"$1"\'')
    .replace(/"\/Script\/UMG\.WidgetBlueprintGeneratedClass'([^']+)'"/g, 'WidgetBlueprintGeneratedClass\'"$1"\'')
    .replace(/"\/Script\/Engine\.UserDefinedEnum'([^']+)'"/g, 'Enum\'"$1"\'');
}

function patchObjectPinsWithoutClass(text: string): string {
  return text.replace(
    /PinType\.PinCategory="object"([\s\S]*?)PinType\.PinSubCategoryObject=None/g,
    'PinType.PinCategory="object"$1PinType.PinSubCategoryObject=Class\'"/Script/CoreUObject.Object"\'',
  );
}

function patchClassPinsWithoutClass(text: string): string {
  return text.replace(
    /PinType\.PinCategory="class"([\s\S]*?)PinType\.PinSubCategoryObject=None/g,
    'PinType.PinCategory="class"$1PinType.PinSubCategoryObject=Class\'"/Script/CoreUObject.Object"\'',
  );
}

function normaliseBlueprintForKlee(text: string): string {
  return patchClassPinsWithoutClass(patchObjectPinsWithoutClass(normalizeUnrealObjectPath(text)));
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
  const normalisedBlueprintText = normaliseBlueprintForKlee(blueprintText);

  useEffect(() => {
    let cancelled = false;

    async function renderBlueprint() {
      const canvas = canvasRef.current;

      if (!canvas || !normalisedBlueprintText) {
        return;
      }

      try {
        setError(null);

        canvas.innerHTML = normalisedBlueprintText;
        canvas.textContent = normalisedBlueprintText;

        await loadKleeScript();

        if (cancelled || !window.Klee) {
          return;
        }

        const existingInstance = window.Klee.get?.(canvas);

        if (existingInstance) {
          existingInstance.display?.(normalisedBlueprintText);
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
  }, [normalisedBlueprintText]);

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
