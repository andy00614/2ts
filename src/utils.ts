export function isObject(value:any):boolean {
    return Object.prototype.toString.call(value) === '[object Object]'
}

export function firstUppercase(str:string):string {
    return str.replace(/^\S/, s => s.toUpperCase())
}

export function isNumber(val: string | number): boolean {
    return !isNaN(Number(val))
}

export function consoleJson(json: object) {
    console.log(JSON.stringify(json, null, "  "));
  }
  