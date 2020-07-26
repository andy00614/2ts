export const objArr = [{ a: "sd", b: 2, c: { d: 5 } }];
export const objArr2AstChild = [
  {
    label: "a",
    node: {
      type: "string",
      isRequire: true,
    },
  },
  {
    label: "b",
    node: {
      type: "number",
      isRequire: true,
    },
  },
  {
    label: "c",
    node: {
      type: "object",
      isRequire: true,
    },
    children: [
      {
        label: "d",
        node: {
          type: "number",
          isRequire: true,
        },
      },
    ],
  },
];

export const simpleArr = ["a", "b", "c"];
export const simpleArr2Ast = [
  {
    label: "a",
    node: {
      type: "string",
      isRequire: true,
    },
  },
  {
    label: "b",
    node: {
      type: "string",
      isRequire: true,
    },
  },
  {
    label: "c",
    node: {
      type: "string",
      isRequire: true,
    },
  },
];
