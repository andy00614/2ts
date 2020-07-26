export const simpleJson = {
  name: 'andy',
  age: 2,
};

export const simpleAst = {
  label: 'Root',
  node: {
    type: 'Root',
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
      label: 'age',
      node: {
        type: 'number',
        isRequire: true,
      },
    },
  ],
};

export const complexJson = {
  name: 'andy',
  age: 2,
  info: {
    is: true,
    friends: [
      {
        a: '4',
        n: 3,
      },
    ],
  },
};

export const integratedTestObj = {
  a: 1,
  b: 'dd',
  info: {
    name: 'andy',
    friends: ['d', 'g', 'c'],
  },
  c: true,
  data: [
    {
      ddd: 2,
      c: '2',
    },
    {
      ddd: 2,
      c: '2',
    },
  ],
};

export const integratedAst = {
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
