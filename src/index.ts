import { isObject } from './utils'
export function transformToTs(json:any) {
  const json2Middle = transformToMiddleObj(json)

}

export type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
interface AstNode {
    type: Typeof;
    isRequire: boolean
}
export interface Ast {
    [key: string] : AstNode
}

interface TypeObj { 
    [key: string]: Typeof | TypeObj
}
export function middle2TypeString(middle:Ast,typeObj:TypeObj={}):TypeObj {
    Object.entries(middle).forEach(([key,value]) => {
        console.log(key,value);
        // if(isObject(value)) {
        //     typeObj[key] = (value as MiddleItem).type
        // } else {
        //     typeObj[key] = middle2TypeString(value as Ast,{})
        // }
    })
    return typeObj
}

export function transformToMiddleObj(json:any,middle:Ast={},middleArr:Ast[]=[]):Ast[] {
    if(isObject(json)) {
        Object.entries(<{[key:string]:any}>json).forEach(([key,value]) => {
            if(!isObject(value)) {
                middle[key] = {
                    type: typeof value,
                    isRequire: true
                }
            } else {
                transformToMiddleObj(value,{},middleArr)
            }
        })
    }
    middleArr.push(middle)
    return middleArr
}