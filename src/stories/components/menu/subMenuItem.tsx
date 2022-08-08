import React, { FC, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import { styleObj } from "./menuItem";
type SubMenuItemProps = {
    item: MenuItemProps,
    container: HTMLDivElement | null,
    show?: boolean,
    itemIndex?: number
};

const SubMenuItem: FC<SubMenuItemProps>
    = ({ item, container, show = true, itemIndex = 0 }) => {
        const { label, key, children, onClick } = item
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
        const l = hoverKey ? (keyMap.get(key) as string[]).length : 0;
        const top = l * 3 + itemIndex * 30;
        function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            onClick && onClick.bind(null, { selectKey, event })
        }
        return (
            // show || isHover
            (show || isHover) ?//父菜单项hover或当前菜单项hover都显示
                <>
                    <div className={className}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={styleObj(key, hoverKey, selectKey, keyMap)}
                        onClick={handleClick}
                    >
                        <span className='label'>{label}</span>
                    </div>
                    {
                        isChildrenRender && createPortal(
                            <div className="subMenuContainer"
                                onMouseEnter={() => { setIsSubMenuHover(true) }}
                                onMouseLeave={() => { setIsSubMenuHover(false) }}
                                style={{ top: `${top}px` }}>
                                <div className="beforeElement">
                                    <div className="flexContainer">
                                        <div className="shadowContainer">
                                            {children.map((item, index) =>
                                                <SubMenuItem
                                                    item={item}
                                                    container={container}
                                                    key={item.key}
                                                    itemIndex={index + itemIndex}//top平移要算上父菜单
                                                />)}
                                        </div>
                                    </div>
                                </div>
                            </div>, container)
                    }
                </> : null

        )
    }
export default SubMenuItem