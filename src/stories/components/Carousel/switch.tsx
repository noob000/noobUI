import classNames from "classnames";
import "./style/switch.scss";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
type SwitchProps = {
    lastIndex: number
    size: number;
    current: number
    callback: (num: number) => void
}
const Switch: FC<SwitchProps> = ({ size, callback, current, lastIndex }) => {
    const clicked = useRef<boolean>(false)
    const inital = clicked.current || lastIndex !== -1
    const handleClick = (i: number) => {
        if (!clicked.current) clicked.current = true
        if (i !== current) callback(i)
    }

    const createElement = () => {
        let elementArray: ReactElement[] = [];
        for (let i = 0; i < size; i++)
            elementArray.push(
                <div className={classNames({
                    "noob-carousel-switch": "true",
                    "noob-carousel-switch-inital": !inital && i === 0,
                    "noob-carousel-switch-cur": i === current && inital,
                    "noob-carousel-switch-last": i === lastIndex
                })} key={i} onClick={handleClick.bind({}, i)}></div>)
        return elementArray
    }
    return (
        <div className="noob-carousel-switch-container" style={{ width: `${(size + 1) * 40}px` }}>
            {createElement()}
        </div>
    )
}
export default Switch