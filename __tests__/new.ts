import { newJson2Ast, json2AstChild } from '../src/index'
function consoleJson(json:object) {
    console.log(
        JSON.stringify(json,null,"  ")
    )
}
describe('转化为抽象树', () => {
    it('简单对象转换',() => {
        const json = {
            name: 'andy',
            age: 2
        }
        const expectAst = {
            label: 'Root',
            node: {
                type: 'Root',
                isRequire: true
            },
            children: [
                {
                    label: 'name',
                    node: {
                        type: 'string',
                        isRequire: true
                    }
                },{
                    label: 'age',
                    node: {
                        type: 'number',
                        isRequire: true
                    }
                }
            ]
        }
        const res = newJson2Ast(json)
        expect(newJson2Ast(json)).toEqual(expectAst)
    })
    it('数组转换',() => {
        const simpleArr = ['a','b','c']
        const res = json2AstChild(simpleArr)
        consoleJson(res)
    })
    // it('数组套对象转换')
    // it('复杂对象转换')
})
// it('test',() => {
//     const simpleObj = {
//         a:1,
//         b:'dd',
//         info: {
//             name: 'andy',
//             friends: ['d','g','c']
//         },
//         c: true,
//         data: [
//             {
//                 ddd:2,
//                 c: '2'
//             },{
//                 ddd:2,
//                 c: '2'
//             }
//         ]
//     }
//     const res = newJson2Ast(simpleObj);
//     console.log(JSON.stringify(res,null,"  "));
//     expect(newJson2Ast(simpleObj))
// })