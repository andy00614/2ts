import { object2Ast } from "../../src";
import { consoleJson } from "../../src/utils";

describe("object-unit", () => {
  it('sd',() => {
    const json = {
      name: "andy",
      age: 2,
    };
    const expectAst = [
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
    ];
    expect(object2Ast(json)).toEqual(expectAst)
  })
});
