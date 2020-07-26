import { arr2Ast } from "../../src/index";
import { objArr, objArr2AstChild,simpleArr,simpleArr2Ast } from '../../__mock__/array'

describe("array-unit", () => {
  
  it("数组转换", () => {
    const res = arr2Ast(simpleArr);
    expect(res).toEqual(simpleArr2Ast);
  });

  it("数组套对象转换", () => {
    expect(arr2Ast(objArr)).toEqual(objArr2AstChild);
  });
});
