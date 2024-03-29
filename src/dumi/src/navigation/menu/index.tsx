import { FC, useEffect, useState, useMemo } from "react";
import ActiveKeyContext from "./hooks/ActiveKeyContext";
import InlineMenuItem from "./inlineMenuItem";
import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
import { getChildKeysMap, handleMenuItem } from "./util";
type MenuProps = {
    /**
     * 创建菜单的依赖数组
     */
    items: MenuItemProps[];
     /**
     * menu组件的展示形式
     */
    mode?: "vertical" | "horizontal" | "inline";
    /**
     * 初始选中的key值
     */
    selectedKey?: string | null;
};
type clickFnProps = {
    selectKey: string | null,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
}

type clickFn = (props: clickFnProps) => any

type MenuItemProps = {
    label: string;
    key: string;
    children?: MenuItemProps[];
    onClick?: clickFn
}


const Menu: FC<MenuProps> = ({ items, mode = 'horizontal', selectedKey = null }) => {
    const [keyMap, setKeyMap] = useState<Map<string, string[]>>(new Map());
    const [selectKey, setSelectKey] = useState<string | null>(null);
    const [hoverKey, setHoverKey] = useState<string | null>(null);
    useEffect(() => {
        let map = new Map();
        items.forEach((item) => {
            handleMenuItem(item, [], map)
        })
        setKeyMap(map)
    }, [items])
    useEffect(() => {
        if (keyMap.size > 0 && selectKey !== null) {
            let temp = false;
            for (let i of keyMap.keys()) {
                if (i === selectKey) {
                    temp = true;
                    break;
                }
            }
            if (!temp) throw new Error("wrong selectedKey props")
        }
    }, [keyMap, selectedKey])
    const childKeysMap = useMemo(() => getChildKeysMap(items), [items])
    return (
        <div className={`menuContainer-${mode}`}>
            <ActiveKeyContext.Provider value={{
                mode,
                selectKey,
                hoverKey: hoverKey,
                keyMap: keyMap,
                setHoverKey: (key: string | null) => { setHoverKey(key) },
                setSelectKey: (key: string) => { setSelectKey(key) },
                childKeysMap: childKeysMap,
            }}>
                {items.map((item, index) => mode !== "inline" ?
                    <MenuItem
                        item={item}
                        key={item.key}
                        index={index} />
                    : <InlineMenuItem
                        item={item}
                        key={item.key}
                        index={index} />
                )}
            </ActiveKeyContext.Provider>
        </div>
    )
}

export default Menu
export type { MenuProps, MenuItemProps }
export { ActiveKeyContext }