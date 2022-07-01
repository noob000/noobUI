import React, { useState } from "react";
type useCarouselProps = {
    num: number;
    autoplay: boolean
}
function useCarousel(num: number) {
    const [index, setIndex] = useState<number>(0);
    return [index, setIndex] as [number, React.Dispatch<number>]
}
export default useCarousel