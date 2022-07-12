import { render, screen } from "@testing-library/react";
import React from "react";
import Carousel from "./carousel";
const Test = () => {
    return (
        <div>
            <Carousel>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </Carousel>
        </div>
    )
}
test("carousel render test", async () => {
    render(<Test />)
    expect(screen.queryByText("2")).toBeVisible()
})