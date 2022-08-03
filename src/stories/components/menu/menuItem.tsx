import { CSSProperties, FC, RefObject, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MenuItemProps } from "./menu";
import "./style/menuitem.scss";
const Title: FC<MenuItemProps> = ({ label, children }) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [container, setContainer] = useState<any>(null)
    const containerRef = useCallback((node: any) => {
        if (node) setContainer(node)
    }, [])

    return (
        <>
            <div className="menuItemContainer"
                onMouseEnter={() => { setIsHover(true) }}
                onMouseLeave={() => { setIsHover(false) }}>
                <span
                    className="title"
                >{label}</span>
                {children && <div className="opacityContainer" ref={containerRef}>
                    <div style={{ opacity: "0", height: "5px" }}></div>
                    <div className="subContainer">
                        {children.map((item) =>
                            <MenuItem
                                item={item}
                                container={container}
                                key={item.key}
                                show={isHover} />)}
                    </div>
                </div>}
            </div>

        </>

    )
}

const MenuItem: FC<{ item: MenuItemProps, container: any, show: boolean }> = ({ item, container, show }) => {
    const { label, key, children } = item
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        (isHover || show) ? <div className="subMenuItem"
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}
        >
            <span
            >{label}</span>
            {children &&
                <div className="subContainer">
                    <SubMenuItem item={children} container={container} show={isHover} />
                </div>
            }
        </div> : null
    )
}
const SubMenuItem: FC<{ container: any, item: MenuItemProps[], show?: boolean }> = ({ container, item, show = true }) => {
    const [isHover, setIsHover] = useState<boolean>(false)
    return container && (show || isHover) ? createPortal(
        <div className="subMenuContainer">
            {item.map(({ label, key, children }) => {
                return <div className='subMenuItem' key={key}
                    onMouseEnter={() => { setIsHover(true) }}
                    onMouseLeave={() => { setIsHover(false) }}>
                    <span>{label}</span>
                    {children && <SubMenuItem item={children} show={isHover} container={container} />}
                </div>
            }
            )}
        </div>
        ,
        container) : null
}
export default Title