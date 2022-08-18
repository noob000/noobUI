import classNames from "classnames";
import React, { FC, useContext, useMemo, useState } from "react";
import ExpandKeysContext from "./hooks/expandKeysContext";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import { labelStyle } from "./menuItem";

type InlineSubMenuItemProps = {
    item: MenuItemProps,
    menuLevel?: number,
};

const InlineSubMenuItem: FC<InlineSubMenuItemProps> = ({ item, menuLevel = 1 }) => {
    const { label, key, children, onClick } = item;
    const [subMenuShow, setSubMenuShow] = useState<boolean>(false);
    const [rotateClass, setRotateClass] = useState<string>("");
    const { hoverKey, selectKey, keyMap, setSelectKey, childRelationMap, amountMap } = useContext(ActiveKeyContext);
    //子列表渲染判断当且仅当container容器非空，children非空，子列表hover或当前列表正处于hover
    const paddingLeft = menuLevel * 10;
    const { expandKeys, setExpandKeys } = useContext(ExpandKeysContext);
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event })
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) setRotateClass(subMenuShow ? "rotate" : "rotate-reverse");
        if (children && children.length > 0) setExpandKeys(!subMenuShow ? [...expandKeys, key] : expandKeys.filter(v => v !== key))
    }

    let styleObj = labelStyle(key, hoverKey, selectKey, keyMap);
    if (key === selectKey) styleObj.backgroundColor = "#bcd8f2";
    const height = useMemo(() => {
        let count = 0;
        const childrenList = childRelationMap.get(key);
        expandKeys.forEach(v => {
            if (childrenList?.has(v)) count += amountMap.get(v) as number
        })
        return `${count * 48}px`
    }, [expandKeys])
    const hasChildren = children && children.length > 0
    return (
        <>
            <div className="subMenuItem-inline" style={styleObj}>
                <div className="flexContainer"
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
                    style={{ paddingLeft: `${paddingLeft}px`, height }}>
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