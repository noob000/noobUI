import React, { FC, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ActiveKeyContext, MenuItemProps } from ".";
import { labelStyle } from "./menuItem";
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
        const { hoverKey, selectKey, keyMap, setHoverKey, setSelectKey, mode } = useContext(ActiveKeyContext);

        const handleMouseEnter = () => {
            setHoverKey(key);
            setIsHover(true)
        }
        const handleMouseLeave = () => {
            setTimeout(() => {
                setIsHover(false);
            }, 0)
        }
        const isChildrenRender = container && (children && children.length > 0) && (isHover || isSubMenuHover) as boolean
        //子列表渲染判断当且仅当container容器非空，children非空，子列表hover或当前列表正处于hover
        const className = children ? `subMenuItem-${mode} hasChildren-${mode}` : `subMenuItem-${mode} noChildren-${mode}`;
        const l = hoverKey ? (keyMap.get(key) as string[]).length : 0;
        const top = l * 3 + itemIndex * 40;

        function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            if (!children || children.length === 0) setSelectKey(key)
            onClick && onClick.bind(null, { selectKey, event })
        }

        let styleObj = labelStyle(key, hoverKey, selectKey, keyMap);
        if (key === selectKey) styleObj.backgroundColor = "#bcd8f2";

        return (
            // show || isHover
            (show || isHover) ?//父菜单项hover或当前菜单项hover都显示
                <>
                    <div className={className}
                        onMouseOver={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={styleObj}
                        onClick={handleClick}
                    >
                        <span className='label' style={{ textAlign: "left" }}>{label}</span>
                    </div>
                    {
                        isChildrenRender && createPortal(
                            <div className={`subMenuContainer-${mode}`}
                                onMouseEnter={() => { setIsSubMenuHover(true) }}
                                onMouseLeave={() => { setIsSubMenuHover(false) }}
                                style={{ top: `${top}px` }}>
                                <div className={`beforeElement-${mode}`}>
                                    <div className={`flexContainer-${mode}`}>
                                        <div className={`shadowContainer-${mode}`}>
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