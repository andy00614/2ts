import { object2Ast, addRoot } from '../../src';
import { consoleJson } from '../../src/utils';
import { simpleJson, simpleAst } from '../../__mock__/obj';


describe('object-unit', () => {
  
  it('简单对象转化为ast', () => {
    expect(object2Ast(simpleJson).length).toBe(2);
  });

  // TODO: 有点奇怪
  // it('x',() => {
  //   const ast = addRoot(object2Ast(simpleJson));
  //   expect(ast).toEqual(simpleAst);
  // })

});
