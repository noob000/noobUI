import { CSSProperties, FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MenuItemProps } from "./menu";
import ActiveKeyContext from "./hooks/ActiveKeyContext"
import "./style/menuitem-horizontal.scss";
import "./style/menuitem-vertical.scss";
import SubMenuItem from "./subMenuItem";
const labelStyle = (
    key: string,
    hoverKey: string | null,
    selectkey: string | null,
    keyMap: Map<string, string[]>
): CSSProperties => {
    let temp = false;
    if (hoverKey !== null) {
        const arr = keyMap.get(hoverKey as string) as string[];
        temp = arr.includes(key);
    }
    if (!selectkey) return temp ? { color: "#1890ff" } : {}
    else {
        const keyArr = keyMap.get(selectkey) as string[];
        temp = temp || keyArr.includes(key);
        return temp ? { color: "#1890ff" } : {}
    }
}

const MenuItem: FC<{ item: MenuItemProps, index: number }> = ({ item, index }) => {
    const { label, key, children, onClick } = item
    const [isHover, setIsHover] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const { hoverKey, keyMap, setHoverKey, selectKey, setSelectKey, mode } = useContext(ActiveKeyContext);
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

    const containerStyle = (() => {
        let style: CSSProperties = {}
        let left: number = 0;
        if (mode === "horizontal") left = menuRef.current ? menuRef.current?.offsetLeft : 0;

        else if (mode === "vertical") {
            left = menuRef.current ? menuRef.current?.offsetWidth : 0;
        }
        style.left = `${left}px`
        return style;
    })()
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event })
    }
    const containerClass = (() => {
        if (mode === "horizontal") return "menuItemContainer-horizontal";
        else {
            let str = "menuItemContainer-vertical"
            if (children && children.length > 0) str += " hasChildren-vertical"
            if (selectKey === key) str += " menuItemContainer-vertical-select"
            return str
        }
    })()
    return (
        <div className={containerClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={menuRef}
            onClick={handleClick}>
            <span
                className="title"
                style={labelStyle(key, hoverKey, selectKey, keyMap)}
            >{label}</span>
            {children &&
                <div
                    className={`opacityContainer-${mode}`}
                    ref={containerRef}
                    style={containerStyle}>
                    <div className={`beforeElement-${mode}`}>
                        <div className={`shadowContainer-${mode}`}>
                            {children.map((item, index) =>
                                <SubMenuItem
                                    item={item}
                                    container={container}
                                    key={item.key}
                                    show={isHover}
                                    itemIndex={index}
                                />
                            )}
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default MenuItem
export { labelStyle }