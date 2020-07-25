import { isObject, firstUppercase, isNumber } from "./utils";
import { AstNew } from "./type";

export function transformToTs(json: any): string {
  const ast = json2Ast(json);
  return Ast2Interface(ast);
}

export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";
export interface LeafNode {
  type: Typeof | string;
  isRequire: boolean;
}
export interface Ast {
  [key: string]: LeafNode;
}
export function setSymbolLabel(label: string): string {
  const endLetter = label.slice(-1);
  const endNumber = isNumber(endLetter) ? String(Number(endLetter) + 1) : "1";
  return label + endNumber;
}

export function Ast2Interface(astNodes: GAst[]): string {
  const labelSet: string[] = [];
  let interfaceString = "";
  astNodes.forEach((ast) => {
    const label = labelSet.includes(firstUppercase(ast.label))
      ? setSymbolLabel(firstUppercase(ast.label))
      : firstUppercase(ast.label);
    labelSet.push(label);
    interfaceString += `interface ${label} {\n`;
    Object.entries(ast.node).forEach(([key, value]) => {
      interfaceString += `\t ${key}: ${value.type};\n`;
    });
    interfaceString += "};\n";
  });
  return interfaceString;
}

export type GAst = {
  label: string;
  node: Ast;
};

// export function json2Ast(
//   json: any,
//   middle: Ast = {},
//   middleArr: GAst[] = [],
//   key?: string
// ): GAst[] {
//   if (isObject(json)) {
//     Object.entries(<{ [key: string]: any }>json).forEach(([key, value]) => {
//       if (!isObject(value)) {
//         middle[key] = {
//           type: typeof value,
//           isRequire: true,
//         };
//       } else {
//         middle[key] = {
//           type: firstUppercase(key),
//           isRequire: true,
//         };
//         json2Ast(value, {}, middleArr, key);
//       }
//     });
//   }
//   middleArr.unshift({ label: key ?? "RootInterface", node: middle });
//   return middleArr;
// }

const initalAst: AstNew = {
  label: "Root",
  node: {
    type: "Root",
    isRequire: true,
  },
  children: [],
};

function getType(val: string): Typeof | string {
  const types = [
    "string",
    "number",
    "bigint",
    "boolean",
    "symbol",
    "undefined",
    "object",
    "function",
  ];
  return types.includes(typeof val) ? typeof val : val;
}

// 如果是值类型，创建标签，push到children里去
// 如果是对象类型，创建children,往里递归
// 如果是数组类型，创建children，往里递归
function baseValArr2Ast(arr: any[]): AstNew[] {
  return arr.map((item) => ({
    label: item,
    node: {
      type: getType(<string>item),
      isRequire: true,
    },
  }));
}

function getAstModel(label: string, type: Typeof): AstNew {
  return {
    label,
    node: {
      type: getType(type),
      isRequire: true,
    },
  };
}

function arr2Ast(arr:Array<object> | any[]) {
    const isObjectArr = typeof arr[0] === 'object';
    if(isObjectArr) {
        return json2AstChild(arr[0], [])
    }
    return baseValArr2Ast(arr)
}

// 这个是使用于对象的形式的
export function json2AstChild(
  json: any,
  astChildren: AstNew[] = <AstNew[]>initalAst.children
): AstNew[] {
  Object.entries(json).forEach(([key, value]) => {
    const astItem = getAstModel(key, <Typeof>value);

    if (isObject(value)) {
      astItem.children = json2AstChild(value, []);
    }

    if (Array.isArray(value)) {
        astItem.children = arr2Ast(value)
    //   if (typeof value[0] === "object") {
    //     astItem.children = json2AstChild(value[0], []);
    //   } else {
    //     astItem.children = baseValArr2Ast(value);
    //   }
    }
    astChildren.push(astItem);
  });
  return astChildren;
}

export function addRoot(astChild: AstNew[], rootName?: string) {
  const initalAst: AstNew = {
    label: rootName || "Root",
    node: {
      type: rootName || "Root",
      isRequire: true,
    },
    children: [],
  };
  initalAst.children = astChild;
  return initalAst;
}

export function newJson2Ast(json: any, config?: {}) {
  const jsonChild = json2AstChild(json, []);
  const ast = addRoot(jsonChild);
  return ast;
}
