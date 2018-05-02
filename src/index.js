// @flow

type BaseNode = { name: string, meta: {} };
type File = BaseNode & {
  type: 'file'
};

/* eslint-disable no-use-before-define */
type Directory = BaseNode & {
  type: 'directory',
  children: Array<Node>
};
/* eslint-enable no-use-before-define */

type Node = File | Directory;

/**
 * Make directory node
 */
export const mkdir = (name: string, children: Array<Node> = [], meta: Object = {}): Node => ({
  name,
  children,
  meta,
  type: 'directory',
});

/**
 * Make file node
 */
export const mkfile = (name: string, meta: Object = {}): Node => ({
  name,
  meta,
  type: 'file',
});

/**
 * Map tree
 */
export const map = (f: Node => any, node: Node) => {
  const updatedNode = f(node);

  return node.type === 'directory' ?
    { ...updatedNode, children: (node.children || []).map(n => map(f, n)) } : updatedNode;
};

/**
 * Filter tree
 */
export const reduce = <T>(f: (T, Node) => T, node: Node, acc: T): T => {
  const newAcc = f(acc, node);

  if (node.type === 'file') {
    return newAcc;
  }
  return (node.children || []).reduce((iAcc, n) => reduce(f, n, iAcc), newAcc);
};

/**
 * Filter tree
 */
export const filter = (f: Node => boolean, node: Node) => {
  if (!f(node)) {
    return null;
  }

  return node.type === 'directory' ?
    { ...node, children: (node.children || []).map(n => filter(f, n)).filter(v => v) } : node;
};
