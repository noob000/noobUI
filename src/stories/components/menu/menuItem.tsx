import { hover } from "@testing-library/user-event/dist/hover";
import { createContext, CSSProperties, FC, forwardRef, MutableRefObject, RefObject, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import "./style/menuitem.scss";

const Title: FC<{ item: MenuItemProps }> = ({ item }) => {
    const { label, key, children } = item
    const [isHover, setIsHover] = useState<boolean>(false);
    const [container, setContainer] = useState<any>(null);
    const [isSubMenuHover, setIsSubMenuHover] = useState<boolean>(false);
    const { hoverKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);
    const containerRef = useCallback((node: any) => {
        if (node) setContainer(node)
    }, [])
    const colorObj = (key: string): CSSProperties => {
        if (hoverKey === null) return {}
        const arr = keyMap.get(hoverKey as string) as string[];
        const temp = arr.includes(key)
        return temp ? { color: "#1890ff" } : {}
    }

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
    return (
        <>
            <div className="menuItemContainer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <span
                    className="title"
                    style={colorObj(key)}

                >{label}</span>
                {children && <div className="opacityContainer" ref={containerRef}>
                    <div style={{ opacity: "0", height: "5px" }}></div>
                    <div className="subContainer">
                        {children.map((item) =>
                            <MenuItem
                                item={item}
                                container={container}
                                key={item.key}
                                show={isHover}
                            />)}
                    </div>
                </div>}
            </div>

        </>

    )
}

const MenuItem: FC<{ item: MenuItemProps, container: any, show: boolean }>
    = ({ item, container, show }) => {
        const { label, key, children } = item
        const [isHover, setIsHover] = useState<boolean>(false);
        const [isSubMenuHover, setIsSubMenuHover] = useState<boolean>(false);
        const { hoverKey, selectKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);
        const colorObj = (key: string): CSSProperties => {
            if (hoverKey === null) return {}
            const arr = keyMap.get(hoverKey as string) as string[];
            const temp = arr.includes(key)
            return temp ? { color: "#1890ff" } : {}
        }
        const handleMouseEnter = () => {
            setHoverKey(key);
            setIsHover(true)
        }
        const handleMouseLeave = () => {
            setTimeout(() => {
                setIsHover(false);
            }, 0)
        }
        return (
            (show || isHover) ?
                <>
                    <div className="subMenuItem"
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={colorObj(key)}
                    >
                        {label}</div>
                    {
                        children && (isHover || isSubMenuHover) && createPortal(
                            <div className="subMenuContainer"
                                onMouseEnter={() => { setIsSubMenuHover(true) }}
                                onMouseLeave={() => { setIsSubMenuHover(false) }}>
                                {children.map((item) => <SubMenuItem
                                    item={item}
                                    container={container}

                                />)}
                            </div>, container)
                    }
                </> : null

        )
    }
const SubMenuItem: FC<{ container: any, item: MenuItemProps, }>
    = ({ container, item }) => {
        const { label, key, children } = item
        const [isHover, setIsHover] = useState<boolean>(false)
        const [isSubMenuHover, setIsSubMenuHover] = useState<boolean>(false);
        const { hoverKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);

        const colorObj = (key: string): CSSProperties => {
            if (hoverKey === null) return {}
            const arr = keyMap.get(hoverKey as string) as string[];
            const temp = arr.includes(key)
            return temp ? { color: "#1890ff" } : {}
        }
        const handleMouseEnter = () => {
            setHoverKey(key);
            setIsHover(true)
        }
        const handleMouseLeave = () => {
            setTimeout(() => {
                setIsHover(false);
            }, 0)
        }
        return <>
            <div className='subMenuItem' key={key}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <span style={colorObj(key)}>{label}</span>
            </div>
            {children && (isSubMenuHover || isHover) && createPortal(
                <div className="subMenuContainer"
                    onMouseEnter={() => { setIsSubMenuHover(true) }}
                    onMouseLeave={() => { setIsSubMenuHover(false) }}>
                    {children.map((item) => <SubMenuItem
                        item={item}
                        container={container}
                    />)}
                </div>, container
            )}
        </>

    }
export default Title