import { fireEvent } from "@testing-library/react";
import React, { FC, useState, useEffect, ReactElement, useRef, MutableRefObject, LegacyRef } from "react";
import "./style/carousel.scss"
type CarouselProps = {
    children: ReactElement[];
    autoplay?: boolean;
}
const Carousel: FC<CarouselProps> = ({ children }) => {
    const [index, setIndex] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);
    const [childenList, setChildrenList] = useState<ReactElement[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null);
    let timer = useRef<any>()
    useEffect(() => {
        setChildrenList(children.map((x, index) => <div key={index % children.length}>{x}</div>))
    }, [])
    return (
        <div style={{ width: "600px", overflowX: "hidden" }}>
            <div className="noob-carousel-container" ref={containerRef} style={{ position: "relative", transform: `translateX(-${left}px)` }}>
                {childenList}
            </div>

        </div>
    )
}
export default Carousel