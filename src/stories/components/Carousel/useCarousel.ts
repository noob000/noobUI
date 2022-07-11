import React, { useEffect, useRef, useState } from "react";

const useCarousel = (
    num: number,
    autoplay: boolean,
    interval: number
): [number, number, React.Dispatch<number>] => {
    const [index, setIndex] = useState<number>(0);
    const [last, setLast] = useState<number>(-1)
    let timer = useRef<NodeJS.Timeout>()
    useEffect(() => {
        if (autoplay) {
            if (timer.current) { clearTimeout(timer.current) }
            (function (current: number) {
                timer.current = setTimeout(() => {
                    if (current < num - 1) {
                        setLast(current)
                        setIndex(prev => prev + 1)
                    }
                    else {
                        setLast(num - 1)
                        setIndex(0)
                    }
                    clearTimeout(timer.current)
                }, interval)
            })(index)
        }
        return () => { clearTimeout(timer.current) }
    }, [index,autoplay])

    return [index, last, setIndex] as [number, number, React.Dispatch<number>]
}
export default useCarousel