
import React, { FC, useState, useEffect, ReactElement, useRef, CSSProperties } from "react";
import "./style/carousel.scss"
import Switch from "./switch";
import useCarousel from "./useCarousel";
type CarouselProps = {
    children: ReactElement[];
    autoplay?: boolean;
    interval?: number
}

const Carousel: FC<CarouselProps> = ({ children, autoplay = false, interval = 2000 }) => {
    const [transition, setTransition] = useState<boolean>(false)
    const [currentIndex, lastIndex, setIndex] = useCarousel(children.length, autoplay, interval)
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (currentIndex !== 0 && transition) setTransition(false)
    }, [currentIndex])
   
    const translateX = () => {
        if (containerRef.current) {
            if (currentIndex === 0 && !transition && (lastIndex === children.length - 1)) {
                const container = containerRef.current
                let left = 0
                for (let i = 0; i < children.length; i++) {
                    left += container.children[i]?.clientWidth
                }
                return `translateX(-${left}px)`
            }
            else if (transition) return 0
            let left = 0;
            const container = containerRef.current
            for (let i = 0; i < currentIndex; i++) {
                left += container.children[i]?.clientWidth
            }
            return `translateX(-${left}px)`
        }
        else return `translateX(0px)`
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
        transform: `${transition ? "translateX(0px)" : translateX()}`,
        transition: `${transition ? "none" : "transform 1s"}`
    }

    return (
        <div className="noob-carousel">
            <div className="noob-carousel-container"
                onTransitionEnd={handleTransitionEnd}
                ref={containerRef}
                style={containerStyle}>
                {createList()}
            </div>
            <Switch
                size={children.length}
                callback={(num) => { setIndex(num) }}
                current={currentIndex}
                lastIndex={lastIndex} />
        </div>
    )
}
export default Carousel