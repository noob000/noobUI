
import React, { FC, useState, useEffect, ReactElement, useRef, CSSProperties, MutableRefObject, ForwardedRef, useImperativeHandle } from "react";
import "./style/carousel.scss"
import SwitchButton from "./switchButton";
import useCarousel from "./useCarousel";
export type CarouselProps = {
    children: ReactElement[];
    /**
     * 是否自动播放
     */
    autoplay?: boolean;
     /**
     * 自动播放的时间间隔
     */
    interval?: number;
    /**
     * 点击按钮出现的位置，当按钮值为"left"或"right"时，上下滚动
     */
    dotPosition?: "bottom" | "top" | "left" | "right";
    /**
     * 样式
     */
    style?: CSSProperties;
}

export type CarouselRef = {
    goTo: (posIndex: number) => void;
    next: () => void;
    prev: () => void;
}
const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
    ({
        children,
        autoplay = false,
        interval = 2000,
        dotPosition = "bottom",
        style
    }, ref) => {
        if (!["bottom", "top", "left", "right"].some((element) => element === dotPosition)) {
            throw Error("dotPosition should be one of the bottom,top,left,top")
        }
        if (typeof interval !== "number" || (typeof interval === "number" && interval <= 0)) {
            throw TypeError("interval shoud be a positive number")
        }
        const [transition, setTransition] = useState<boolean>(false)
        const [currentIndex, lastIndex, setIndex, next, prev] = useCarousel(children.length, autoplay, interval)
        const containerRef = useRef<HTMLDivElement | null>(null);
        const isVertical = dotPosition === "left" || dotPosition === "right";
        useEffect(() => {
            if (currentIndex !== 0 && transition) setTransition(false)
        }, [currentIndex])
        const translateX = () => {
            if (containerRef.current) {
                if (currentIndex === 0 && !transition && (lastIndex === children.length - 1)) {
                    const container = containerRef.current
                    let distance = 0
                    for (let i = 0; i < children.length; i++) {
                        distance += isVertical ? container.children[i]?.clientHeight : container.children[i]?.clientWidth
                    }
                    return isVertical ? `translateY(-${distance}px)` : `translateX(-${distance}px)`
                }
                else if (transition) return 0
                let distance = 0;
                const container = containerRef.current
                for (let i = 0; i < currentIndex; i++) {
                    distance += isVertical ? container.children[i]?.clientHeight : container.children[i]?.clientWidth
                }
                return isVertical ? `translateY(-${distance}px)` : `translateX(-${distance}px)`
            }
            else return isVertical ? `translateY(0px)` : `translateX(0px)`
        }

        const handleTransitionEnd = () => {
            if (autoplay && currentIndex === 0) setTransition(true)
        }

        const createList = () => {
            if (autoplay) {
                let list: JSX.Element[] = [];
                for (let i = 0, l = children.length; i <= l; i++) {
                    if (i !== l) list.push(<div key={i}>{children[i]}</div>)
                    else list.push(<div key={i}>{children[0]}</div>)
                }
                return list
            }
            else return children.map((x, index) => <div key={index}>{x}</div>)
        }

        const containerStyle: CSSProperties = {
            flexDirection: isVertical ? "column" : "row",
            transform: `${transition ? "translateX(0px)" : translateX()}`,
            transition: `${transition ? "none" : "transform 1s"}`
        }
        useImperativeHandle(ref, () => ({
            goTo: (num: number) => setIndex(num),
            prev: prev,
            next: next
        }), [currentIndex])
        return (
            <div className="noob-carousel" style={style} >
                {isVertical ? <>
                    <SwitchButton
                        size={children.length}
                        callback={(num) => { setIndex(num) }}
                        current={currentIndex}
                        lastIndex={lastIndex}
                        dotPosition={dotPosition}
                        containerRef={containerRef} />
                    <div className="noob-carousel-container"
                        onTransitionEnd={handleTransitionEnd}
                        ref={containerRef}
                        style={containerStyle}>
                        {createList()}
                    </div>
                </> :
                    <>
                        <div className="noob-carousel-container"
                            onTransitionEnd={handleTransitionEnd}
                            ref={containerRef}
                            style={containerStyle}>
                            {createList()}
                        </div>
                        <SwitchButton
                            size={children.length}
                            callback={(num) => { setIndex(num) }}
                            current={currentIndex}
                            lastIndex={lastIndex}
                            dotPosition={dotPosition}
                            containerRef={containerRef} />
                    </>
                }
            </div>
        )
    })

export default Carousel