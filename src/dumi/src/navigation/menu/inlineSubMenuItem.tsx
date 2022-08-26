import classNames from "classnames";
import React, { FC, useContext, useState, useRef } from "react";
import ExpandKeysContext from "./hooks/expandKeysContext";
import { ActiveKeyContext, MenuItemProps } from ".";
import { labelStyle } from "./inlineMenuItem";
import { getHeight } from "./util";

type InlineSubMenuItemProps = {
    item: MenuItemProps,
    menuLevel?: number,
};

const InlineSubMenuItem: FC<InlineSubMenuItemProps> = ({ item, menuLevel = 1 }) => {
    const { label, key, children, onClick } = item;
    const [subMenuShow, setSubMenuShow] = useState<boolean>(false);
    const [rotateClass, setRotateClass] = useState<string>("");
    const { hoverKey, selectKey, keyMap, setSelectKey, childKeysMap } = useContext(ActiveKeyContext);
    //子列表渲染判断当且仅当container容器非空，children非空，子列表hover或当前列表正处于hover
    const paddingLeft = menuLevel * 10;
    const { expandKeys, setExpandKeys } = useContext(ExpandKeysContext);
    const ref = useRef<any>();
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event })
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) setRotateClass(subMenuShow ? "rotate" : "rotate-reverse");
        if (children && children.length > 0) {
            setExpandKeys(!subMenuShow ? [...expandKeys, key] : expandKeys.filter(v => v !== key));
        }
    }

    let styleObj = labelStyle(key, selectKey, keyMap);
    const height = `${getHeight(key, new Set(expandKeys), childKeysMap) * 50}px`
    //用useMemo包裹后出现高度计算错误的情况
    const hasChildren = children && children.length > 0;

    return (
        <>
            <div className="subMenuItem-inline" style={styleObj}>
                <div className="flexContainer"
                    style={{ paddingLeft: `${paddingLeft}px` }}
                    onClick={handleClick}>
                    <div className="label">{label}</div>
                    {hasChildren &&
                        <div className={classNames({
                            "arrow": true,
                            [rotateClass]: hasChildren
                        })}>^</div>}
                </div>
            </div>

            {hasChildren &&
                <div className="subMenuContainer-inline"
                    style={{ height }}>
                    {children.map((item: any) =>
                        <InlineSubMenuItem
                            item={item}
                            key={item.key}
                            menuLevel={menuLevel + 1}
                        />)}
                </div>
            }
        </>
    )
}
export default InlineSubMenuItem