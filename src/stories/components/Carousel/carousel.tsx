import { fireEvent } from "@testing-library/react";
import React, { FC, useState, useEffect, ReactElement, useRef, MutableRefObject, LegacyRef } from "react";
import "./style/carousel.scss"
import Switch from "./switch";
import useCarousel from "./useCarousel";
type CarouselProps = {
    children: ReactElement[];
    autoplay?: boolean;
}
const Carousel: FC<CarouselProps> = ({ children }) => {
    const [index, setIndex] = useCarousel(children.length)
    const [childenList, setChildrenList] = useState<ReactElement[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setChildrenList(children.map((x, index) => <div key={index % children.length}>{x}</div>))
    }, [])
    let left = 0;
    if (containerRef.current) {
        const container = containerRef.current
        for (let i = 0; i < index; i++) {
            left += container.children[i]?.clientWidth
        }
    }
    return (


        <div style={{ width: "600px", overflowX: "hidden" }}>
            <div className="noob-carousel-container" ref={containerRef} style={{ position: "relative", transform: `translateX(-${left}px)` }}>
                {childenList}
            </div>
            <Switch num={childenList.length} callback={(num) => { setIndex(num) }} current={index} />
        </div>
    )
}
export default Carousel