export type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

export type AstNew = {
    label: string,
    node: {
        type: Typeof | string,
        isRequire: boolean
    },
    children?: AstNew[]
}