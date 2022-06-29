import Message from "./message";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from "../button";
type TestButtonProps = {
    type: "success" | "warn" | "error",
    content: string,
    durartion: number
}
const TestButton = ({ type, content, durartion }: TestButtonProps) => {
    switch (type) {
        case "success": return <Button label="click" onClick={() => Message.success(content, durartion)} />
        case "warn": return <Button label="click" onClick={() => Message.warn(content, durartion)} />
        case "error": return <Button label="click" onClick={() => Message.error(content, durartion)} />
    }
}
export default {
    title: "Feedback/Message",
    component: TestButton,
    argTypes: {
        type: {
            control: "radio",
            options: ["success", "error", "warn"]
        },
        content: {
            control: "text"
        },
        durartion: {
            control: {
                type: "number",
                min: 1
            }
        }
    }
} as ComponentMeta<typeof TestButton>
const Template: ComponentStory<typeof TestButton> = (args) => TestButton(args)

export const Index = Template.bind({})
Index.args = {
    type: "success"
}
Index.args = {
    type: "warn"
}
Index.args = {
    type: "error"
}



