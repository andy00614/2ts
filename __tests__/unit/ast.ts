import { ast2TransferNode, transferNode2Interface, TransferInterfaceItem } from "../../src";
import { consoleJson } from "../../src/utils";

describe("拆成ast为需要转化的数组", () => {
  it("测试转化interface字符串函数", () => {
    const ast: TransferInterfaceItem = {
      label: "test",
      nodes: [
        {
          key: "name",
          type: "string",
          isRequire: true,
        },
        {
          key: "age",
          type: "string",
          isRequire: true,
        },
      ],
    };
    const expectRes = `interface Test {
        name: string;
        age: string;
    };`
    const res = transferNode2Interface(ast);
    expect(res.replace(/\s/gi,'')).toBe(expectRes.replace(/\s/gi,''))
  });
  it('测试ast转化为生成interface的中间结构',() => {
    const ast = {
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
      }
      const res = ast2TransferNode(ast)
      console.log(res.map(item => transferNode2Interface(item)).reduce((str,cur) => {
          str+=cur+'\n'
          return str
      },''))
    //   consoleJson(res);
  })
});
