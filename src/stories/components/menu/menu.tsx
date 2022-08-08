import { FC, useEffect, useState } from "react";
import ActiveKeyContext from "./hooks/ActiveKeyContext";
import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
type MenuProps = {
    items?: MenuItemProps[];
    mode?: "vertical" | "horizontal";
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

const Menu: FC<MenuProps> = ({ items = testItem }) => {
    const [keyMap, setKeyMap] = useState<Map<string, string[]>>();
    const [selectKey, setSelectKey] = useState<string>("");
    const [hoverKey, setHoverKey] = useState<string | null>(null);
    useEffect(() => {
        let map = new Map();
        items.forEach((item) => {
            handleMenuItem(item, [], map)
        })
        setKeyMap(map)
    }, [items])

    return (

        <div className='menuContainer'>
            <ActiveKeyContext.Provider value={{
                selectKey,
                hoverKey: hoverKey,
                keyMap: keyMap ?? new Map(),
                setHoverKey: (key: string | null) => { setHoverKey(key) },
                setSelectKey: (key: string) => { setSelectKey(key) }
            }}>
                {items.map((item) => <MenuItem
                    item={item}
                    key={item.key} />)}
            </ActiveKeyContext.Provider>
        </div>
    )
}

export default Menu
export type { MenuProps, MenuItemProps }
export { ActiveKeyContext }