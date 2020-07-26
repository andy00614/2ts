import { ast2TransferNode, transferNode2Interface } from '../../src';
import { simpleTransferInterfaceItem, expectSimpleInterface, complexAst, complexAst2Interface } from '../../__mock__/ast';
import { consoleJson } from '../../src/utils';
import { simpleJson, simpleAst } from '../../__mock__/obj';

export function removeSpace(str: string) {
  return str.replace(/\s/gi, '');
}

describe('拆成ast为需要转化的数组', () => {

  it('测试转化interface字符串函数', () => {
    const res = transferNode2Interface(simpleTransferInterfaceItem);
    expect(removeSpace(res)).toBe(removeSpace(expectSimpleInterface));
  });

  it('ast转化为interface中间结构',() => {
    const transferNodes = ast2TransferNode(simpleAst);
    expect(transferNodes.length).toBe(1)
  })

  it('将interface中间结构转化为interface字符串', () => {
    const transferNodes = ast2TransferNode(complexAst);
    const interfaces = transferNodes
      .map((item) => transferNode2Interface(item))
      .reduce((str, cur) => {
        str += cur + '\n';
        return str;
      }, '');

    expect(removeSpace(interfaces)).toBe(removeSpace(complexAst2Interface));
  });
});
