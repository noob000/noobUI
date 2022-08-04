import { CSSProperties, FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import "./style/menuitem.scss";

const styleObj = (key: string, hoverKey: string | null, keyMap: Map<string, string[]>): CSSProperties => {
    if (hoverKey === null) return {}
    const arr = keyMap.get(hoverKey as string) as string[];
    const temp = arr.includes(key)
    return temp ? { color: "#1890ff" } : {}
}
const MenuItem: FC<{ item: MenuItemProps }> = ({ item }) => {
    const { label, key, children } = item
    const [isHover, setIsHover] = useState<boolean>(false);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const { hoverKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);
    const containerRef = useCallback((node: any) => {
        if (node) setContainer(node)
    }, [item])

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
    return (<div className="menuItemContainer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <span
            className="title"
            style={styleObj(key, hoverKey, keyMap)}

        >{label}</span>
        {children && <div className="opacityContainer" ref={containerRef}>
            <div className="beforeElement">
                <div className='shadowContainer'>
                    {children.map((item) =>
                        <SubMenuItem
                            item={item}
                            container={container}
                            key={item.key}
                            show={isHover}
                        />)}
                </div>
            </div>
        </div>}
    </div>
    )
}

const SubMenuItem: FC<{ item: MenuItemProps, container: HTMLDivElement | null, show?: boolean }>
    = ({ item, container, show = true }) => {
        const { label, key, children } = item
        const [isHover, setIsHover] = useState<boolean>(false);
        const [isSubMenuHover, setIsSubMenuHover] = useState<boolean>(false);
        const { hoverKey, selectKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);

        const handleMouseEnter = () => {
            setHoverKey(key);
            setIsHover(true)
        }
        const handleMouseLeave = () => {
            setTimeout(() => {
                setIsHover(false);
            }, 0)
        }
        const isChildrenRender = container && children && (isHover || isSubMenuHover)
        //子列表渲染判断当且仅当container容器非空，children非空，子列表hover或当前列表正处于hover
        const className = children ? "subMenuItem hasChildren" : "subMenuItem noChildren";
        const l = hoverKey ? (keyMap.get(key) as string[]).length : 0
        return (
            (show || isHover) ?//父菜单项hover或当前菜单项hover都显示
                <>
                    <div className={className}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={styleObj(key, hoverKey, keyMap)}
                    >
                        <span className='label'>{label}</span></div>
                    {
                        isChildrenRender && createPortal(
                            <div className="subMenuContainer"
                                onMouseEnter={() => { setIsSubMenuHover(true) }}
                                onMouseLeave={() => { setIsSubMenuHover(false) }}
                                style={{ top: `${l * 3}px` }}>
                                <div className="beforeElement">
                                    <div className="flexContainer">
                                        <div className="shadowContainer">
                                            {children.map((item) =>
                                                <SubMenuItem
                                                    item={item}
                                                    container={container}
                                                    key={item.key}

                                                />)}
                                        </div>
                                    </div>
                                </div>
                            </div>, container)
                    }
                </> : null

        )
    }
// const SubMenuItem: FC<{ container: HTMLDivElement | null, item: MenuItemProps, }>
//     = ({ container, item }) => {
//         const { label, key, children } = item
//         const [isHover, setIsHover] = useState<boolean>(false)
//         const [isSubMenuHover, setIsSubMenuHover] = useState<boolean>(false);
//         const { hoverKey, keyMap, setHoverKey } = useContext(ActiveKeyContext);

//         const handleMouseEnter = () => {
//             setHoverKey(key);
//             setIsHover(true)
//         }
//         const handleMouseLeave = () => {
//             setTimeout(() => {
//                 setIsHover(false);
//             }, 0)
//         }
//         const isChildrenRender = container && children && (isSubMenuHover || isHover)
//         return <>
//             <div className='subMenuItem' key={key}
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}>
//                 <span style={styleObj(key, hoverKey, keyMap)}>{label}</span>
//             </div>
//             {isChildrenRender && createPortal(
//                 <div className="subMenuContainer"
//                     onMouseEnter={() => { setIsSubMenuHover(true) }}
//                     onMouseLeave={() => { setIsSubMenuHover(false) }}>
//                     {children.map((item) => <SubMenuItem
//                         item={item}
//                         container={container}
//                         key={item.key}
//                     />)}
//                 </div>, container
//             )}
//         </>

//     }
export default MenuItem