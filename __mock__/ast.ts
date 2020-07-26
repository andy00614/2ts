import { TransferInterfaceItem } from '../src';

export const simpleTransferInterfaceItem: TransferInterfaceItem = {
  label: 'test',
  nodes: [
    {
      key: 'name',
      type: 'string',
      isRequire: true,
    },
    {
      key: 'age',
      type: 'string',
      isRequire: true,
    },
  ],
};
export const expectSimpleInterface = `interface Test {
    name: string;
    age: string;
};`;

export const complexAst = {
  label: 'Root',
  node: {
    type: 'Root',
    isRequire: true,
  },
  children: [
    {
      label: 'a',
      node: {
        type: 'number',
        isRequire: true,
      },
    },
    {
      label: 'b',
      node: {
        type: 'string',
        isRequire: true,
      },
    },
    {
      label: 'info',
      node: {
        type: 'object',
        isRequire: true,
      },
      children: [
        {
          label: 'name',
          node: {
            type: 'string',
            isRequire: true,
          },
        },
        {
          label: 'friends',
          node: {
            type: 'object',
            isRequire: true,
          },
          children: [
            {
              label: 'd',
              node: {
                type: 'string',
                isRequire: true,
              },
            },
            {
              label: 'g',
              node: {
                type: 'string',
                isRequire: true,
              },
            },
            {
              label: 'c',
              node: {
                type: 'string',
                isRequire: true,
              },
            },
          ],
        },
      ],
    },
    {
      label: 'c',
      node: {
        type: 'boolean',
        isRequire: true,
      },
    },
    {
      label: 'data',
      node: {
        type: 'object',
        isRequire: true,
      },
      children: [
        {
          label: 'ddd',
          node: {
            type: 'number',
            isRequire: true,
          },
        },
        {
          label: 'c',
          node: {
            type: 'string',
            isRequire: true,
          },
        },
      ],
    },
  ],
};
export const complexAst2Interface = `
interface Root {
    a: number;
    b: string;
    info: Info;
    c: boolean;
    data: Data;
 };
 
interface Info {
name: string;
friends: Friends;
};

interface Friends {
d: string;
g: string;
c: string;
};

interface Data {
ddd: number;
c: string;
};`;
