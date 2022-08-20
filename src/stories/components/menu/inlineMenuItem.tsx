import { CSSProperties, FC, useContext, useState } from "react";
import { MenuItemProps } from "./menu";
import ActiveKeyContext from "./hooks/ActiveKeyContext"
import "./style/menuitem-inline.scss";
import InlineSubMenuItem from "./inlineSubMenuItem";
import classNames from "classnames";
import ExpandKeysContext from "./hooks/expandKeysContext";
import { getHeight } from "./util";
const labelStyle = (
    key: string,
    selectkey: string | null,
    keyMap: Map<string, string[]>
): CSSProperties => {
    if (!selectkey) return {}
    else {
        let result: CSSProperties = {};
        if (key === selectkey) result.backgroundColor = "#bcd8f2";
        const keyArr = keyMap.get(selectkey) as string[];
        let temp = keyArr.includes(key);
        if (temp) result.color = "#1890ff"
        return result
    }
}

const InlineMenuItem: FC<{ item: MenuItemProps, index: number }> = ({ item, index }) => {
    const { label, key, children, onClick } = item
    const [subMenuShow, setSubMenuShow] = useState<boolean>(false);
    const [rotateClass, setRotateClass] = useState<string>("");
    const [expandKeys, setExpandKeys] = useState<string[]>([]);
    const { keyMap, selectKey, setSelectKey, childKeysMap } = useContext(ActiveKeyContext);
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event });
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) {
            setRotateClass(subMenuShow ? "rotate" : "rotate-reverse");
            setExpandKeys(prev => !subMenuShow ? [...prev, key] : prev.filter(v => v !== key))
        }
    }
    const height = `${getHeight(key, new Set(expandKeys), childKeysMap) * 50}px`;
    const hasChildren = children && children.length > 0
    return (
        <div className="menuItemContainer-inline" >
            <div className="flexContainer"
                onClick={handleClick}
                style={labelStyle(key, selectKey, keyMap)}>
                <div className="label">{label}</div>
                {hasChildren &&
                    <div className={classNames({
                        "arrow": true,
                        [rotateClass]: hasChildren
                    })} style={{ paddingRight: "15px" }}>^</div>}
            </div>

            <ExpandKeysContext.Provider value={{
                expandKeys: expandKeys,
                setExpandKeys: (arr) => { setExpandKeys(arr) }
            }}>
                {hasChildren &&
                    <div className="opacityContainer-inline" style={{ height }}>
                        {children.map((item) =>
                            <InlineSubMenuItem
                                item={item}
                                key={item.key}
                            />
                        )}
                    </div>
                }
            </ExpandKeysContext.Provider>
        </div >
    )
}
export default InlineMenuItem
export { labelStyle }