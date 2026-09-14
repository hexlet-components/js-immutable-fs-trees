# js-immutable-fs-trees

[![github action status](https://github.com/hexlet-components/js-immutable-fs-trees/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-immutable-fs-trees/actions)

## Зачем это нужно

Дерево файловой системы из **неизменяемых** узлов: любая правка возвращает новое дерево, старое остаётся прежним.

Нужна курсам, где сравнивают этот подход с изменяемыми деревьями из [@hexlet/trees](https://github.com/hexlet-components/js-trees). На таком сравнении видно, что неизменяемость даёт (безопасное разделение данных) и чего стоит (пересборка пути до корня на каждое изменение).

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

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-immutable-fs-trees)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=js-immutable-fs-trees).
