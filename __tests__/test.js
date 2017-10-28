// @flow

import { mkdir, mkfile } from '../src';

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
