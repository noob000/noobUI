import { MenuItemProps } from "./menu";

function getChildRelationMap(items: MenuItemProps[]): [Map<string, Set<string>>, Map<string, number>] {
    let relationMap = new Map(), amountMap = new Map();
    const recursionFn = (item: MenuItemProps): string[] => {
        let result: string[] = [];
        const { key, children } = item;
        result.push(key)
        amountMap.set(key, (children as MenuItemProps[]).length);
        children?.forEach((item) => {
            if (item.children && item.children.length > 0) {
                let temp = recursionFn(item);
                result = [...result, ...temp];
            }
        })
        relationMap.set(key, new Set(result))
        return result;
    }
    for (let i = 0, l = items.length; i < l; i++) {
        const { children, key } = items[i];
        if (children && children.length > 0) {
            amountMap.set(key, children.length);
            let childrenSet = new Set();
            children.forEach((item) => {
                childrenSet.add(item.key);
                if (item.children && item.children.length > 0) {
                    const temp = recursionFn(item);
                    temp.forEach((v) => childrenSet.add(v));
                }
            })
            relationMap.set(key, childrenSet);
        }
        else {
            amountMap.set(key, 0);
            relationMap.set(key, new Set())
        }
    }
    return [relationMap, amountMap]
}
function handleMenuItem(item: MenuItemProps, lastArr: string[], map: Map<string, string[]>) {
    const { key, children } = item
    let next = [...lastArr, key];
    map.set(key, next);
    if (children) {
        children.forEach((item) => {
            handleMenuItem(item, next, map)
        })
    }
}
export {getChildRelationMap,handleMenuItem}