import classNames from "classnames";
import React, { FC, useContext, useState } from "react";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import { labelStyle } from "./menuItem";
type InlineSubMenuItemProps = {
    item: MenuItemProps,
    menuLevel?: number
};

const InlineSubMenuItem: FC<InlineSubMenuItemProps>
    = ({ item, menuLevel = 1 }) => {
        const { label, key, children, onClick } = item;
        const [subMenuShow, setSubMenuShow] = useState<boolean>(false);
        const [rotateClass, setRotateClass] = useState<string>("");
        const { hoverKey, selectKey, keyMap, setSelectKey, mode } = useContext(ActiveKeyContext);
        //子列表渲染判断当且仅当container容器非空，children非空，子列表hover或当前列表正处于hover
        const paddingLeft = menuLevel * 10;

        function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
            if (!children || children.length === 0) setSelectKey(key)
            onClick && onClick.bind(null, { selectKey, event })
            setSubMenuShow(!subMenuShow);
            if (children && children.length > 0) setRotateClass(subMenuShow ? "rotate" : "rotate-reverse")
        }

        let styleObj = labelStyle(key, hoverKey, selectKey, keyMap);
        if (key === selectKey) styleObj.backgroundColor = "#bcd8f2";

        return (
            <>
                <div className="subMenuItem-inline" style={styleObj}>
                    <div className="flexContainer"
                        onClick={handleClick}>
                        <div className="label">{label}</div>
                        {children && children.length > 0 &&
                            <div className={classNames({
                                "arrow": true,
                                [rotateClass]: children && children.length > 0
                            })}>^</div>}
                    </div>
                </div>
                {
                    subMenuShow && children &&
                    <div className="subMenuContainer-inline"
                        style={{ paddingLeft: `${paddingLeft}px` }}>
                        <div className={`beforeElement-${mode}`}>
                            <div className={`flexContainer-${mode}`}>
                                <div className={`shadowContainer-${mode}`}>
                                    {children.map((item) =>
                                        <InlineSubMenuItem
                                            item={item}
                                            key={item.key}
                                            menuLevel={menuLevel + 1}
                                        />)}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>

        )
    }
export default InlineSubMenuItem