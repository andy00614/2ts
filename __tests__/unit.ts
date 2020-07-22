import { transformToMiddleObj } from "../src";

describe("通用方法", () => {
  it("转化为中间形式", () => {
    const json = {
      name: "andy",
      age: 25,
      gender: "man",
    };
    const middleJson = {
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
    const res = transformToMiddleObj(json)
    expect(res).toStrictEqual(middleJson);
  });
});
