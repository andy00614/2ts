import { isObject, firstUppercase, isNumber } from "./utils";
import { AstNew } from "./type";

export function transformToTs(json: any): string {
  const ast = json2Ast(json);
//   return Ast2Interface(ast);
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

export type GAst = {
  label: string;
  node: Ast;
};


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

export function arr2Ast(arr:Array<object> | any[]) {
    const isObjectArr = typeof arr[0] === 'object';
    if(isObjectArr) {
        return object2Ast(arr[0], [])
    }
    return baseValArr2Ast(arr)
}

// 这个是使用于对象的形式的
export function object2Ast(
  json: any,
  astChildren: AstNew[] = <AstNew[]>initalAst.children
): AstNew[] {
  Object.entries(json).forEach(([key, value]) => {
    const astItem = getAstModel(key, <Typeof>value);

    if (isObject(value)) {
      astItem.children = object2Ast(value, []);
    }

    if (Array.isArray(value)) {
        astItem.children = arr2Ast(value)
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

export function json2Ast(json: any, config?: {}) {
  const jsonChild = object2Ast(json, []);
  const ast = addRoot(jsonChild);
  return ast;
}

// 转化成若干个interface单元，函数只处理其中的一个单元
interface transferNodeItem extends LeafNode {
  key: string;
}
export interface TransferInterfaceItem {
  label: string,
  nodes: Array<transferNodeItem>
}
export function transferNode2Interface(transferItem:TransferInterfaceItem): string {
  const {nodes,label} = transferItem;
  let interfaceString = `interface ${firstUppercase(label)} {\n`
  nodes.forEach(node => {
    const {type,key} = node
    interfaceString += `\t ${key}: ${type};\n`
  })
  interfaceString += "};\n";
  return interfaceString
}

// export function Ast2Interface(astNodes: TransferInterfaceItem): string {
//     const labelSet: string[] = [];
//     let interfaceString = "";
//     astNodes.forEach((ast) => {
//       const label = labelSet.includes(firstUppercase(ast.label))
//         ? setSymbolLabel(firstUppercase(ast.label))
//         : firstUppercase(ast.label);
//       labelSet.push(label);
//       interfaceString += `interface ${label} {\n`;
//       Object.entries(ast.node).forEach(([key, value]) => {
//         interfaceString += `\t ${key}: ${value.type};\n`;
//       });
//       interfaceString += "};\n";
//     });
//     return interfaceString;
//   }


// 每一个children都会生成生成一个interface
export function ast2TransferNode(ast:AstNew,res:TransferInterfaceItem[]=[]):TransferInterfaceItem[] {
    if(ast.children) {
      const transferItem:TransferInterfaceItem = {
        label: ast.label,
        nodes: ast.children.map(item => ({
          key: item.label,
          isRequire: item.node.isRequire,
          type:['object','array'].includes(item.node.type)  ? item.label : item.node.type,
        }))
      }
      res.push(transferItem)
      ast.children.forEach(item => ast2TransferNode(item,res))
    }
    return res
}
