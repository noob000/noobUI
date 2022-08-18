import { CSSProperties, FC, useCallback, useContext, useState, useMemo, } from "react";
import { MenuItemProps } from "./menu";
import ActiveKeyContext from "./hooks/ActiveKeyContext"
import "./style/menuitem-inline.scss";
import InlineSubMenuItem from "./inlineSubMenuItem";
import classNames from "classnames";
import ExpandKeysContext from "./hooks/expandKeysContext";
const labelStyle = (
    key: string,
    hoverKey: string | null,
    selectkey: string | null,
    keyMap: Map<string, string[]>
): CSSProperties => {
    let temp = false;
    if (hoverKey !== null) {
        const arr = keyMap.get(hoverKey as string) as string[];
        temp = arr.includes(key);
    }
    if (!selectkey) return temp ? { color: "#1890ff" } : {}
    else {
        const keyArr = keyMap.get(selectkey) as string[];
        temp = temp || keyArr.includes(key);
        return temp ? { color: "#1890ff" } : {}
    }
}

const InlineMenuItem: FC<{ item: MenuItemProps, index: number }> = ({ item, index }) => {
    const { label, key, children, onClick } = item
    const [subMenuShow, setSubMenuShow] = useState<boolean>(false);
    const [rotateClass, setRotateClass] = useState<string>("");
    const [expandKeys, setExpandKeys] = useState<string[]>([]);
    const { keyMap, selectKey, setSelectKey, childRelationMap, amountMap } = useContext(ActiveKeyContext);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event });
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) {
            setRotateClass(subMenuShow ? "rotate" : "rotate-reverse");
            setExpandKeys(prev => !subMenuShow ? [...prev, key] : prev.filter(v => v !== key))
        }
    }

    const height = useMemo(() => {
        let count = 0;
        expandKeys.forEach((item) => {
            count += amountMap.get(item) as number
        })
        return `${count * 48}px`
    }, [expandKeys])
    const hasChildren = children && children.length > 0
    return (
        <div className="menuItemContainer-inline" >
            <div className="flexContainer"
                onClick={handleClick}>
                <div className="label">{label}</div>

                {hasChildren &&
                    <div className={classNames({
                        "arrow": true,
                        [rotateClass]: hasChildren
                    })}>^</div>}
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