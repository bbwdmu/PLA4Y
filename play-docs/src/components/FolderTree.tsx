// src/components/FolderTree.tsx
import React, { useState } from 'react';

type TreeNode = {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
  note?: string;
};

type FolderTreeProps = {
  root: TreeNode;
};

function TreeItem({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.2rem 0',
          paddingLeft: `${depth * 1.1}rem`,
          cursor: hasChildren ? 'pointer' : 'default',
          userSelect: 'none',
          fontFamily: 'monospace',
          fontSize: '0.95rem',
        }}
      >
        <span style={{ width: '1rem', display: 'inline-block', color: 'var(--ifm-color-emphasis-600)' }}>
          {hasChildren ? (open ? '▾' : '▸') : ''}
        </span>

        <span>
          {node.type === 'folder' ? '📁' : '📄'}
        </span>

        <span style={{ color: 'var(--ifm-font-color-base)' }}>
          {node.name}
        </span>

        {node.note && (
          <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>
            {node.note}
          </span>
        )}
      </div>

      {hasChildren && open && (
        <div>
          {node.children!.map((child, index) => (
            <TreeItem key={`${child.name}-${index}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ root }: FolderTreeProps) {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '14px',
        background: 'var(--ifm-background-surface-color)',
        overflowX: 'auto',
        margin: '1rem 0',
      }}
    >
      <TreeItem node={root} />
    </div>
  );
}