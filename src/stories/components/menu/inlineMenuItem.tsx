import { CSSProperties, FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MenuItemProps } from "./menu";
import ActiveKeyContext from "./hooks/ActiveKeyContext"
import "./style/menuitem-inline.scss";
import InlineSubMenuItem from "./inlineSubMenuItem";
import classNames from "classnames";
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
    const { hoverKey, keyMap, setHoverKey, selectKey, setSelectKey, mode } = useContext(ActiveKeyContext);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!children || children.length === 0) setSelectKey(key)
        onClick && onClick.bind(null, { selectKey, event });
        setSubMenuShow(!subMenuShow);
        if (children && children.length > 0) setRotateClass(subMenuShow ? "rotate" : "rotate-reverse")
    }

    return (
        <div className="menuItemContainer-inline">
            <div className="flexContainer"
                onClick={handleClick}>
                <div className="label">{label}</div>
                {children && children.length > 0 &&
                    <div className={classNames({
                        "arrow": true,
                        [rotateClass]: children && children.length > 0
                    })}>^</div>}
            </div>

            {
                subMenuShow && children &&
                <div className="opacityContainer-inline">
                    {children.map((item, index) =>
                        <InlineSubMenuItem
                            item={item}
                            key={item.key}
                        />
                    )}
                </div>
            }
        </div >
    )
}
export default InlineMenuItem
export { labelStyle }