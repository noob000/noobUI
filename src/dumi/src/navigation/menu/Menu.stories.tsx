import { ComponentMeta, ComponentStory } from "@storybook/react";
import Menu, { MenuItemProps } from ".";
import { testItem } from "./menu.test";
type MenuModeProps = "inline" | "horizontal" | "vertical";

export default {
    title: "Navigation/Menu",
    component: Menu,
    argTypes:{
        mode:{
            control:"radio",
            options:["horizontal","vertical","inline"],
            description:"组件的展示形式",
            defaultValue:"horizontal",
            type:"string",
            default:"horizontal",
            table: { type: { detail: 'something' } }
        }
    }

} as ComponentMeta<typeof Menu>
interface StoryMenuProps {
    /**
     * 
     */
    items: MenuItemProps[];
    mode?: "vertical" | "horizontal" | "inline";
    selectedKey?: string | null;

}
const Template: ComponentStory<typeof Menu> = (args: StoryMenuProps) => {
    const { mode } = args;
    if (mode === "vertical" || mode === "inline") {
        return (
            <div style={{ width: "200px" }}>
                <Menu {...args} />
            </div>
        )
    }
    else return <div >
        <Menu {...args} />
    </div>
}
export const Horizontal = Template.bind({});
Horizontal.args = {
    mode: "horizontal",
    items: testItem
}
export const Vertical = Template.bind({});
Vertical.args = {
    mode: "vertical",
    items: testItem
}
export const Inline = Template.bind({});
Inline.args={
    mode:"inline",
    items:testItem
}
