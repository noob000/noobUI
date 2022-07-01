import classNames from "classnames";
import "./style/switch.scss";
import React, { FC, ReactElement, useState } from "react";
type SwitchProps = {
    num: number;
    current: number
    callback: (num: number) => void
}
const Switch: FC<SwitchProps> = ({ num, callback, current }) => {
    const [last, setLast] = useState<number | undefined>()
    const [inital, setInital] = useState<boolean>(false)
    const handleClick = (i: number) => {
        if (!inital) setInital(true)
        if (i !== current) {
            setLast(current)
            callback(i)
        }

    }

    const createElement = () => {
        let elementArray: ReactElement[] = [];
        for (let i = 0; i < num; i++)
            elementArray.push(
                <div className={classNames({
                    "noob-carousel-switch": "true",
                    "noob-carousel-switch-inital": !inital && i === 0,
                    "noob-carousel-switch-cur": i === current && inital,
                    "noob-carousel-switch-last": i === last
                })} key={i} onClick={handleClick.bind({}, i)}></div>)
        return elementArray
    }

    return (
        <div className="noob-carousel-switch-container" style={{ width: `${(num + 1) * 40}px` }}>
            {createElement()}
        </div>
    )
}
export default Switch