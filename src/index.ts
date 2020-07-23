import { isObject,firstUppercase,isNumber } from './utils'

export function transformToTs(json:any):string {
  const ast = json2Ast(json)
  return Ast2Interface(ast)
}

export type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"
export interface AstNode {
    type: Typeof | string;
    isRequire: boolean
}
export interface Ast {
    [key: string] : AstNode
}
export function setSymbolLabel(label:string):string {
    const endLetter = label.slice(-1)
    const endNumber = isNumber(endLetter) ? String(Number(endLetter) + 1) : '1'  
    return label + endNumber
}

export function Ast2Interface(astNodes:GAst[]): string {
    const labelSet:string[] = []
    let interfaceString = ''
    astNodes.forEach(ast => {
        const label = labelSet.includes(firstUppercase(ast.label)) ? setSymbolLabel(firstUppercase(ast.label)) : firstUppercase(ast.label) 
        labelSet.push(label)
        interfaceString += `interface ${label} {\n`
        Object.entries(ast.node).forEach(([key,value]) => {
            interfaceString+=`\t ${key}: ${value.type};\n`
        })
        interfaceString += '};\n'
    })
    return interfaceString
}

export type GAst = {
    label: string;
    node: Ast
}
export function json2Ast(json:any,middle:Ast={},middleArr:GAst[]=[],key?:string):GAst[] {
    if(isObject(json)) {
        Object.entries(<{[key:string]:any}>json).forEach(([key,value]) => {
            if(!isObject(value)) {
                middle[key] = {
                    type: typeof value,
                    isRequire: true
                }
            } else {
                middle[key] = {
                    type: firstUppercase(key),
                    isRequire: true
                }
                json2Ast(value,{},middleArr,key)
            }
        })
    }
    middleArr.unshift({label:key ?? 'RootInterface',node:middle})
    return middleArr
}