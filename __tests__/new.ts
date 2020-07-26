import { json2Ast } from "../src/index";
import { consoleJson } from "../src/utils";

describe("转化为抽象树", () => {
  it("简单对象转换", () => {
    const json = {
      name: "andy",
      age: 2,
    };
    const expectAst = {
      label: "Root",
      node: {
        type: "Root",
        isRequire: true,
      },
      children: [
        {
          label: "name",
          node: {
            type: "string",
            isRequire: true,
          },
        },
        {
          label: "age",
          node: {
            type: "number",
            isRequire: true,
          },
        },
      ],
    };
    const res = json2Ast(json);
    expect(res).toEqual(expectAst);
  });

  it("复杂对象转换", () => {
    const complexObj = {
      a: 1,
      b: "dd",
      info: {
        name: "andy",
        friends: ["d", "g", "c"],
      },
      c: true,
      data: [
        {
          ddd: 2,
          c: "2",
        },
        {
          ddd: 2,
          c: "2",
        },
      ],
    };
    const res = json2Ast(complexObj);
    expect(res).toEqual({
      label: "Root",
      node: {
        type: "Root",
        isRequire: true,
      },
      children: [
        {
          label: "a",
          node: {
            type: "number",
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
          label: "info",
          node: {
            type: "object",
            isRequire: true,
          },
          children: [
            {
              label: "name",
              node: {
                type: "string",
                isRequire: true,
              },
            },
            {
              label: "friends",
              node: {
                type: "object",
                isRequire: true,
              },
              children: [
                {
                  label: "d",
                  node: {
                    type: "string",
                    isRequire: true,
                  },
                },
                {
                  label: "g",
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
              ],
            },
          ],
        },
        {
          label: "c",
          node: {
            type: "boolean",
            isRequire: true,
          },
        },
        {
          label: "data",
          node: {
            type: "object",
            isRequire: true,
          },
          children: [
            {
              label: "ddd",
              node: {
                type: "number",
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
          ],
        },
      ],
    });
  });
});
