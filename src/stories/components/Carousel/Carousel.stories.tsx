import Carousel from "./carousel";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import "./style/story.scss"
type TestCarouselProps = {
    dotPosition: "bottom" | "top" | "left" | "right",
    autoPlay?: boolean;
}
const TestCarousel = ({ dotPosition, autoPlay = false }: TestCarouselProps) => {
    return (
        <Carousel dotPosition={dotPosition} autoplay={autoPlay} >
            <div className="item">1</div>
            <div className="item">2</div>
            <div className="item">3</div>
            <div className="item">4</div>
        </Carousel>
    )
}
export default {
    title: "Data Display/Carousel",
    component: TestCarousel,
    argTypes: {
        dotPosition: {
            control: "radio",
            options: ["bottom", "top", "left", "right"],
            defaultValue:"bottom"
        },
        autoPlay: {
            control: "boolean",
            defaultValue: false,
        }
    }

} as ComponentMeta<typeof TestCarousel>
const Template: ComponentStory<typeof TestCarousel> = (args) => TestCarousel(args)
export const Index = Template.bind({})
Index.args = {
    dotPosition: "bottom",
    autoPlay: false
}
Index.args = {
    dotPosition: "top"
}
Index.args = {
    dotPosition: "left"
}
Index.args = {
    dotPosition: "right"
}