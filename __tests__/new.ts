import { newJson2Ast } from '../src/index'
it('test',() => {
    const simpleObj = {
        a:1,
        b:'dd',
        info: {
            name: 'andy',
            friends: ['d','g','c']
        },
        c: true,
        data: [
            {
                ddd:2,
                c: '2'
            },{
                ddd:2,
                c: '2'
            }
        ]
    }
    const res = newJson2Ast(simpleObj);
    console.log(JSON.stringify(res,null,"  "));
    expect(newJson2Ast(simpleObj))
})