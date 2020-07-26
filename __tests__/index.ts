import { transformToTs } from '../src';
import { integratedTestObj } from '../__mock__/obj';
import { removeSpace } from './unit/ast';

describe('集成测试', () => {
  it('复杂对象转换', () => {
    const res = transformToTs(integratedTestObj);
    const expectInterface = `
    interface Root {
      a: number;
      b: string;
      info: Info;
      c: boolean;
      data: Data;
   };
   
   interface Info {
      name: string;
      friends: Friends;
   };
   
   interface Friends {
      d: string;
      g: string;
      c: string;
   };
   
   interface Data {
      ddd: number;
      c: string;
   };
    `;
    expect(removeSpace(res)).toBe(removeSpace(expectInterface));
  });
});
