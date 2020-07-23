import { transformToTs } from '../src'

describe('对象类型', () => {
  it('普通的对象类型', () => {
    const json = {
      name: 'andy',
      age: 25,
      gender: 'man',
      info: {
        haha: 234,
        bbd: 'dsf',
        info: {
          gfdg:343,
          dsfdsf:'dsfdsfs'
        }
      }
    }
    const expectRes = "interface Root {\n  name: string;\n  age:number;\n  gender: string;\n}"
    const res = transformToTs(json)
    console.log(res);
    // expect(transformToTs(json)).toEqual(expectRes)
  })
})