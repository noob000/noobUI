import { MenuItemProps } from ".";

function getChildKeysMap(items: MenuItemProps[]):Map<string, string[]>{
    let childrenKeysMap = new Map()
    const recursionFn = (item: MenuItemProps) => {
        const { children, key } = item;
        childrenKeysMap.set(key, children ? children?.map(v => v.key) : []);
        if (children && children.length > 0) {
            children.forEach((item) => recursionFn(item))
        }
    }
    for (let i = 0, l = items.length; i < l; i++) {
        const { children, key } = items[i];
        childrenKeysMap.set(key, items[i].children ? items[i].children?.map(v => v.key) : [])
        if (children && children.length > 0) {
            children.forEach((item) => recursionFn(item))
        }
    }
    return childrenKeysMap
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
function getHeight(key: string, expandKeys: Set<string>, itemMap: Map<string, string[]>): number {
    let count = 0;
    let childrenKeys = (itemMap.get(key) as string[]);
    if (expandKeys.has(key)) {
        count += childrenKeys.length;
        childrenKeys?.forEach(v => {
            if (expandKeys.has(v)) {
                count += getHeight(v, expandKeys, itemMap);
            }
        })
        return count;
    }
    else return 0
}
export { getChildKeysMap, handleMenuItem, getHeight }