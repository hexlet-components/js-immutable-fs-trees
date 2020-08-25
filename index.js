// @ts-check

/**
 * Node
 * @typedef {Object} Node
 * @property {string} name
 * @property {(directory | file)} type
 * @property {Object} meta – custom information
 */

/**
 * Make file node
 * @param {string} name
 * @returns Node
 * @example
 * mkfile('config.json');
 * // {
 * //   name: 'config.json',
 * //   meta: {},
 * //   type: 'file',
 * // }
 *
 * mkfile('config.json', { size: 1200 });
 * // {
 * //   name: 'config.json',
 * //   meta: { size: 1200 },
 * //   type: 'file',
 * // }
 */
export const mkfile = (name, meta = {}) => ({
  name,
  meta,
  type: 'file',
});

/**
 * Make directory node
 *
 * @param {string} name
 * @param {Object[]} children
 * @example
 * mkdir('etc');
 * // {
 * //   name: 'etc',
 * //   children: [],
 * //   meta: {},
 * //   type: 'directory',
 * // }
 *
 * mkdir('etc', [mkfile('config'), mkfile('hosts')], { owner: 'user' });
 * // {
 * //   name: 'etc',
 * //   children: [
 * //     { name: 'config', meta: {}, type: 'file' },
 * //     { name: 'hosts', meta: {}, type: 'file' }
 * //   ],
 * //   meta: { owner: 'user' },
 * //   type: 'directory',
 * // }
 */
export const mkdir = (name, children = [], meta = {}) => ({
  name,
  children,
  meta,
  type: 'directory',
});

/**
 * Return children
 *
 * @example
 * getChildren(mkdir('etc')); // []
 * getChildren(mkdir('etc', [mkfile('name')])); // [<file>]
 */
export const getChildren = (directory) => directory.children;

/**
 * Return meta
 * @example
 * getMeta(mkfile('etc')); // {}
 * getMeta(mkfile('etc', { owner: 'root' })); // { owner: 'root' }
 */
export const getMeta = (node) => node.meta;

/**
 * Return name
 *
 * @example
 * getName(mkfile('etc')); // etc
 * getName(mkdir('/')); // /
 */
export const getName = (node) => node.name;

/**
 * Check is node a file
 * @example
 * isFile(mkfile('config')); // true
 * isFile(mkdir('etc')); // false
 */
export const isFile = (node) => node.type === 'file';

/**
 * Check is node a directory
 * @example
 * isDirectory(mkdir('etc')); // true
 * isDirectory(mkfile('config')); // false
 */
export const isDirectory = (node) => node.type === 'directory';

/**
 * Map tree
 * @example
 * const tree = mkdir('etc', [mkfile('config'), mkfile('hosts')]);
 *
 * const callbackFn = (node) => {
 *   const { name } = node;
 *   const newName = name.toUpperCase();
 *   return { ...node, name: newName };
 * };
 *
 * map(callbackFn, tree);
 * // {
 * //   name: 'ETC',
 * //   children: [
 * //     { name: 'CONFIG', meta: {}, type: 'file' },
 * //     { name: 'HOSTS', meta: {}, type: 'file' }
 * //   ],
 * //   meta: {},
 * //   type: 'directory',
 * // }
 */
export const map = (callbackFn, tree) => {
  const updatedNode = callbackFn(tree);

  return isDirectory(tree)
    ? { ...updatedNode, children: tree.children.map((n) => map(callbackFn, n)) }
    : updatedNode;
};

/**
 * Reduce tree
 * @example
 * const tree = mkdir('etc', [mkfile('config'), mkfile('hosts')]);
 *
 * reduce((acc) => acc + 1, tree, 0);
 * // 3
 *
 * reduce((acc, node) => [...acc, node.name], tree, []);
 * // ['etc', 'config', 'hosts']
 */
export const reduce = (callbackFn, tree, acc) => {
  const newAcc = callbackFn(acc, tree);

  if (isFile(tree)) {
    return newAcc;
  }
  return tree.children.reduce((iAcc, n) => reduce(callbackFn, n, iAcc), newAcc);
};

/**
 * Filter tree
 * @example
 * const tree = mkdir('etc', [mkfile('CONFIG'), mkfile('hosts')]);
 *
 * const callbackFn = (node) => {
 *   const { name } = node;
 *   return name === name.toLowerCase();
 * };
 *
 * filter(callbackFn, tree);
 * // {
 * //   name: 'etc',
 * //   children: [
 * //     { name: 'hosts', meta: {}, type: 'file' }
 * //   ],
 * //   meta: {},
 * //   type: 'directory',
 * // }
 */
export const filter = (callbackFn, tree) => {
  if (!callbackFn(tree)) {
    return null;
  }

  return isDirectory(tree)
    ? { ...tree, children: tree.children.map((n) => filter(callbackFn, n)).filter((v) => v) }
    : tree;
};
