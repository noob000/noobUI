import { CSSProperties, FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import {   MenuItemProps } from "./menu";
import ActiveKeyContext from "./hooks/ActiveKeyContext"
import "./style/menuitem.scss";
import SubMenuItem from "./subMenuItem";
const styleObj = (
    key: string,
    hoverKey: string | null,
    selectkey: string | null,
    keyMap: Map<string, string[]>
): CSSProperties => {
    if (hoverKey === null) return {}
    const arr = keyMap.get(hoverKey as string) as string[];
    const temp = arr.includes(key);
    if (!selectkey) return temp ? { color: "#1890ff" } : {}
    else {
        const keyArr = keyMap.get(selectkey) as string[];
        const isSelect = keyArr.includes(key);
        return temp || isSelect ? { color: "#1890ff" } : {}
    }
}

const MenuItem: FC<{ item: MenuItemProps }> = ({ item }) => {
    const { label, key, children, onClick } = item
    const [isHover, setIsHover] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const { hoverKey, keyMap, setHoverKey, selectKey } = useContext(ActiveKeyContext);
    const containerRef = useCallback((node: any) => {
        if (node) setContainer(node)
    }, [item])
    const menuRef = useRef<HTMLDivElement>(null)
    const handleMouseEnter = () => {
        setHoverKey(key);
        setIsHover(true)
    }
    const handleMouseLeave = () => {
        setTimeout(() => {
            setHoverKey(null)
            setIsHover(false);
        }, 0)
    }

    const left = menuRef.current ? menuRef.current?.offsetLeft : 0;
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClick && onClick.bind(null, { selectKey, event })
    }
    return (
        <div className="menuItemContainer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={menuRef}
            onClick={handleClick}>
            <span
                className="title"
                style={styleObj(key, hoverKey, selectKey, keyMap)}

            >{label}</span>
            {children &&
                <div
                    className="opacityContainer"
                    ref={containerRef}
                    style={{ left: `${left}px` }}>
                    <div className="beforeElement">
                        <div className='shadowContainer'>
                            {children.map((item, index) =>
                                <SubMenuItem
                                    item={item}
                                    container={container}
                                    key={item.key}
                                    show={isHover}
                                    itemIndex={index}
                                />)}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default MenuItem
export { styleObj }