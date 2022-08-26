import Carousel, { CarouselProps } from "./carousel";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import "./style/story.scss"

const TestCarousel = ({ dotPosition, autoplay = false }: CarouselProps) => {
    return (
        <Carousel dotPosition={dotPosition} autoplay={autoplay} >
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
            defaultValue: "bottom",
            description: "按钮展示的位置",
            type:"string"
        },
        autoplay: {
            control: "boolean",
            defaultValue: false,
            description: "是否自动播放",
            type:"boolean"
        },
        interval: {
            description: "设置自动播放时,切换的时间间隔"
        }
    }

} as ComponentMeta<typeof TestCarousel>
const Template: ComponentStory<typeof TestCarousel> = (args) => TestCarousel(args)
export const Index = Template.bind({})
Index.args = {
    dotPosition: "bottom",
    autoplay: false
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