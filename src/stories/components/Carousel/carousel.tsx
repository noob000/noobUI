import React, { FC, useState, useEffect, ReactElement, useRef, CSSProperties } from "react";
import "./style/carousel.scss"
import Switch from "./switch";
import useCarousel from "./useCarousel";
type CarouselProps = {
    children: ReactElement[];
    autoplay?: boolean;
}
const Carousel: FC<CarouselProps> = ({ children, autoplay = false }) => {
    const [transition, setTransition] = useState<boolean>(false)
    const [currentIndex, lastIndex, setIndex] = useCarousel(children.length, autoplay)
    const [childrenList, setChildrenList] = useState<ReactElement[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (autoplay) {
            setChildrenList([...children.map((x, index) => <div key={index}>{x}</div>), <div key={children.length}>{children[0]}</div>])
        }
        else setChildrenList(children.map((x, index) => <div key={index}>{x}</div>))
    }, []);
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
    const containerStyle: CSSProperties = {
        transform: `${transition ? "translateX(0px)" : translateX()}`,
        transition: `${transition ? "none" : "transform 1s"}`
    }
    const handleTransitionEnd = () => {
        if (autoplay && currentIndex === 0) {
            setTransition(true);
            setTimeout(() => {
                setTransition(false)
            }, 1000)
        }
    }
    return (
        <div className="noob-carousel">
            <div className="noob-carousel-container"
                onTransitionEnd={handleTransitionEnd}
                ref={containerRef}
                style={containerStyle}>
                {childrenList}
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