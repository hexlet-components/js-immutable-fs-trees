// @flow

import 'source-map-support/register';

export const mkdir = (name: string, children: Array<{}> = [], meta: Object = {}) => ({
  name,
  children,
  meta,
  type: 'directory',
});

export const mkfile = (name: string, meta: Object = {}) => ({
  name,
  meta,
  type: 'file',
});
