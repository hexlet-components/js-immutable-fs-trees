// @ts-check

import {
  mkdir,
  mkfile,
  isFile,
  isDirectory,
  map,
  reduce,
  filter,
} from '../index.js';

test('build', () => {
  const tree = mkdir('/', [mkdir('etc'), mkdir('usr'), mkfile('robots.txt')]);

  expect(tree).toEqual({
    children: [
      {
        children: [],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
      {
        children: [],
        meta: {},
        name: 'usr',
        type: 'directory',
      },
      {
        meta: {},
        name: 'robots.txt',
        type: 'file',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  });
});

test('isFile', () => {
  const node = mkfile('config.json');
  expect(isFile(node)).toBeTruthy();
  expect(isDirectory(node)).toBeFalsy();
});

test('isDirectory', () => {
  const node = mkdir('/');
  expect(isDirectory(node)).toBeTruthy();
  expect(isFile(node)).toBeFalsy();
});

test('reduce', () => {
  const tree = mkdir('/', [
    mkdir('eTc', [
      mkdir('NgiNx'),
      mkdir('CONSUL', [
        mkfile('config.json'),
      ]),
    ]),
    mkfile('hOsts'),
  ]);
  const actual = reduce((acc) => acc + 1, tree, 0);
  expect(actual).toEqual(6);

  const actual2 = reduce((acc, n) => (isFile(n) ? acc + 1 : acc), tree, 0);
  expect(actual2).toEqual(2);

  const actual3 = reduce((acc, n) => (isDirectory(n) ? acc + 1 : acc), tree, 0);
  expect(actual3).toEqual(4);
});

test('map', () => {
  const tree = mkdir('/', [
    mkdir('eTc', [
      mkdir('NgiNx'),
      mkdir('CONSUL', [
        mkfile('config.json'),
      ]),
    ]),
    mkfile('hOsts'),
  ]);
  const actual = map((n) => ({ ...n, name: n.name.toUpperCase() }), tree);

  const expected = {
    children: [
      {
        children: [
          {
            children: [], meta: {}, name: 'NGINX', type: 'directory',
          },
          {
            children: [{ meta: {}, name: 'CONFIG.JSON', type: 'file' }],
            meta: {},
            name: 'CONSUL',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'ETC',
        type: 'directory',
      },
      { meta: {}, name: 'HOSTS', type: 'file' },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };

  expect(actual).toEqual(expected);
});

test('filter', () => {
  const tree = mkdir('/', [
    mkdir('etc', [
      mkdir('nginx', [
        mkdir('conf.d'),
      ]),
      mkdir('consul', [
        mkfile('config.json'),
      ]),
    ]),
    mkfile('hosts'),
  ]);
  const actual = filter((n) => isDirectory(n), tree);

  const expected = {
    children: [
      {
        children: [
          {
            children: [{
              children: [],
              meta: {},
              name: 'conf.d',
              type: 'directory',
            }],
            meta: {},
            name: 'nginx',
            type: 'directory',
          },
          {
            children: [],
            meta: {},
            name: 'consul',
            type: 'directory',
          },
        ],
        meta: {},
        name: 'etc',
        type: 'directory',
      },
    ],
    meta: {},
    name: '/',
    type: 'directory',
  };

  expect(actual).toEqual(expected);
});
