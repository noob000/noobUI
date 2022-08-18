import classNames from "classnames";
import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import ExpandKeysContext from "./hooks/expandKeysContext";
import { ActiveKeyContext, MenuItemProps } from "./menu";
import { labelStyle } from "./inlineMenuItem";

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
    const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event })
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) setRotateClass(subMenuShow ? "rotate" : "rotate-reverse");
        if (children && children.length > 0) setExpandKeys(!subMenuShow ? [...expandKeys, key] : expandKeys.filter(v => v !== key))
    }, [])

    let styleObj = labelStyle(key, selectKey, keyMap);
    const height = (() => {
        if (!children || children.length === 0) return "0px"
        else if (subMenuShow) {
            let set = new Set(expandKeys)
            let childKeys = new Set(children?.map(v => v.key));
            let count = childKeys.size;
            const childrenList = childRelationMap.get(key);
            let temp = false;
            for (let i of childKeys) {
                if (set.has(i)) {
                    temp = true;
                    break;
                }
            }
            if (temp)
                expandKeys.forEach(v => {
                    if (childrenList?.has(v) && !childKeys.has(v)) count += amountMap.get(v) as number
                })
            return `${count * 50}px`
        }
        else return "0px"
    })()
    //用useMemo包裹后出现高度计算错误的情况
    const hasChildren = children && children.length > 0
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