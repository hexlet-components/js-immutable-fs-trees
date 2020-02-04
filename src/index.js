// @ts-check

/**
 * Make directory node
 */
export const mkdir = (name, children = [], meta = {}) => ({
  name,
  children,
  meta,
  type: 'directory',
});

/**
 * Make file node
 */
export const mkfile = (name, meta = {}) => ({
  name,
  meta,
  type: 'file',
});

/**
 * Check is node a file
 */
export const isFile = (node) => node.type === 'file';

/**
 * Check is node a directory
 */
export const isDirectory = (node) => node.type === 'directory';

/**
 * Map tree
 */
export const map = (f, node) => {
  const updatedNode = f(node);

  return isDirectory(node)
    ? { ...updatedNode, children: (node.children || []).map((n) => map(f, n)) }
    : updatedNode;
};

/**
 * Reduce tree
 */
export const reduce = (f, node, acc) => {
  const newAcc = f(acc, node);

  if (isFile(node)) {
    return newAcc;
  }
  return (node.children || []).reduce((iAcc, n) => reduce(f, n, iAcc), newAcc);
};

/**
 * Filter tree
 */
export const filter = (f, node) => {
  if (!f(node)) {
    return null;
  }

  return isDirectory(node)
    ? { ...node, children: (node.children || []).map((n) => filter(f, n)).filter((v) => v) }
    : node;
};
