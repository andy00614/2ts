import { isObject } from './utils'
export function transformToTs(json:any) {
  const json2Middle = transformToMiddleObj(json)

}

type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
export interface Middle {
    [key: string] : {
        type: Typeof;
        isRequire: boolean
    } | Middle
}

interface ResObj { 
    [key: string]: Middle
}
export function middle2TypeString(middle:Middle):string {
    const res:ResObj  = Object.keys(middle).reduce((resObj:ResObj,curKey:string) => {
        const curValue = middle[curKey]
        if(!isObject(curValue)) {
            resObj[curKey] = <string>middle[curKey].type
        }
    },{})
    return JSON.stringify(res)
}

export function transformToMiddleObj(json:any,middle:Middle={}):Middle {
    if(isObject(json)) {
        Object.entries(<{[key:string]:any}>json).forEach(([key,value]) => {
            if(!isObject(value)) {
                middle[key] = {
                    type: typeof value,
                    isRequire: true
                }
            } else {
                middle[key] = transformToMiddleObj(value,{})
            }
        })
    }
    return middle
}