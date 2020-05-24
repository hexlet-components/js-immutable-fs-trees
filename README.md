# js-immutable-fs-trees

[![github action status](https://github.com/hexlet-components/js-immutable-fs-trees/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-immutable-fs-trees/actions)

## Install

```sh
npm install @hexlet/immutable-fs-trees
```

## Usage example

```javascript
import {
  mkfile, mkdir, isDirectory, isFile, map,
} from '@hexlet/immutable-fs-trees';

isFile(mkfile('config')); // true
isDirectory(mkdir('etc')); // true

const tree = mkdir('etc', [mkfile('config'), mkfile('hosts')]);

const callbackFn = (node) => {
  const { name } = node;
  const newName = name.toUpperCase();
  return { ...node, name: newName };
};

map(callbackFn, tree);
// {
//   name: 'ETC',
//   children: [
//     { name: 'CONFIG', meta: {}, type: 'file' },
//     { name: 'HOSTS', meta: {}, type: 'file' }
//   ],
//   meta: {},
//   type: 'directory',
// }
```

For more information, see the [Full Documentation](https://github.com/hexlet-components/js-immutable-fs-trees/tree/master/docs)

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/hexletguides.github.io/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-immutable-fs-trees)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-immutable-fs-trees).

