import classNames from "classnames";
import "./style/switch.scss";
import React, { CSSProperties, FC, ReactElement, useEffect, useRef, useState } from "react";
type SwitchProps = {
    lastIndex: number
    size: number;
    current: number;
    dotPosition: "bottom" | "top" | "left" | "right"
    callback: (num: number) => void
    containerRef: React.MutableRefObject<HTMLDivElement | null>
}
const Switch: FC<SwitchProps> = ({ size, callback, current, lastIndex, dotPosition }) => {

    const clicked = useRef<boolean>(false)
    const inital = clicked.current || lastIndex !== -1
    const isVertical = dotPosition === "left" || dotPosition === "right"
    const handleClick = (i: number) => {
        if (!clicked.current) clicked.current = true
        if (i !== current) callback(i)
    }

    const createElement = () => {
        let elementArray: ReactElement[] = [];
        for (let i = 0; i < size; i++) {
            const classObj = isVertical ? {
                "noob-carousel-switch-v": true,
                "noob-carousel-switch-inital-v": !inital && i === 0,
                "noob-carousel-switch-cur-v": i === current && inital,
                "noob-carousel-switch-last-v": i === lastIndex,
            } : {
                "noob-carousel-switch-h": true,
                "noob-carousel-switch-inital-h": !inital && i === 0,
                "noob-carousel-switch-cur-h": i === current && inital,
                "noob-carousel-switch-last-h": i === lastIndex,
            }
            elementArray.push(
                <div
                    style={{ fontSize: "16px" }}
                    className={classNames(classObj)}
                    key={i}
                    onClick={handleClick.bind({}, i)} />)
        }
        return elementArray
    }
    const basicStyle: CSSProperties = isVertical ?
        {
            height: `${(size + 1) * 40}px`
        } :
        {
            width: `${(size + 1) * 40}px`,
        }
    const classStr = `noob-carousel-switch-${dotPosition} noob-carousel-switch-container${isVertical ? "-v" : "-h"}`
    return (

        <div className={classStr}
            style={basicStyle}>
            {createElement()}
        </div>

    )
}
export default Switch