import { transformToMiddleObj } from "../src";

describe("通用方法", () => {
  const simpleMiddleResult = {
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
  };

  const hardMiddleResult = {
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
    info: {
      a: {
        type: "number",
        isRequire: true,
      },
      b: { type: "string", isRequire: true },
    },
  };

  it("转化为中间形式", () => {
    const json = {
      name: "andy",
      age: 25,
      gender: "man",
    };
    const res = transformToMiddleObj(json);
    expect(res).toStrictEqual(simpleMiddleResult);
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
    const res = transformToMiddleObj(json);
    expect(res).toStrictEqual(hardMiddleResult);
  });
  it("将middle对象转化为字符串", () => {
    const expect
  });
});
