import { json2Ast, setSymbolLabel, Ast, GAst, Ast2Interface } from "../src";
import { firstUppercase } from "../src/utils";

it("首字母大写测试", () => {
  expect(firstUppercase("abc")).toBe("Abc");
});

it("生成唯一interface标识", () => {
  setSymbolLabel("abc");
});

describe("通用方法", () => {
  const simpleMiddleResult: GAst = {
    label: "RootInterface",
    node: {
      name: {
        type: "string",
        isRequire: true,
      },
      age: {
        type: "number",
        isRequire: true,
      },
      gender: {
        type: "string",
        isRequire: true,
      },
    },
  };

  it("转化为中间形式", () => {
    const json = {
      name: "andy",
      age: 25,
      gender: "man",
    };
    const res = json2Ast(json);
    expect(res).toEqual([simpleMiddleResult]);
  });

  it("嵌套对象的转换", () => {
    const json = {
      name: "andy",
      age: 25,
      gender: "man",
      info: {
        a: 1,
        b: "2",
      },
    };
    const res = json2Ast(json);
    console.log(JSON.stringify(res));
    expect(res.length).toBe(2);
  });

  it("将ast对象转化为字符串", () => {
    const hard:GAst[] = [
      {
        label: "Root",
        node: {
          name: {
            type: "string",
            isRequire: true,
          },
          age: {
            type: "number",
            isRequire: true,
          },
          gender: {
            type: "string",
            isRequire: true,
          },
        },
      },
      {
        label: "info",
        node: {
          count: {
            type: "number",
            isRequire: true,
          },
          age: {
            type: "number",
            isRequire: true,
          },
          gender: {
            type: "string",
            isRequire: true,
          },
        },
      },
    ];
    const res = Ast2Interface(hard);

    console.log(res);
  });
});
