import { isObject } from './utils'
export function transformToTs(json:any) {
  
}

type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
export interface Middle {
    [key: string] : {
        type: Typeof;
        isRequire: boolean
    } | Middle
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