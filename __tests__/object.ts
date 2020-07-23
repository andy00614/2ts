import { transformToTs } from '../src'

describe('对象类型', () => {
  it('普通的对象类型', () => {
    const json = {
      name: 'andy',
      age: 25,
      gender: 'man'
    }
    const expectRes = ["interface Root {\n  name: string;\n  age:number;\n  gender: string;\n}"]
    expect(transformToTs(json)).toEqual(expectRes)
  })
})