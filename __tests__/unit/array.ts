import { arr2Ast } from "../../src/index";

describe("array-unit", () => {
  it("数组转换", () => {
    const simpleArr = ["a", "b", "c"];
    const expectAst = [
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
    const res = arr2Ast(simpleArr);
    expect(res).toEqual(expectAst);
  });
  it("数组套对象转换", () => {
    const objArr = [{ a: "sd", b: 2, c: { d: 5 } }];
    const objArr2AstChild = [
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
    expect(arr2Ast(objArr)).toEqual(objArr2AstChild);
  });
});
