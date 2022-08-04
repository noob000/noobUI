import Menu, { MenuItemProps } from "./menu";
const testItem: MenuItemProps[] = [
    {
        label: "item-1",
        key: "item-1",
        children: [
            {
                label: "item-1-1",
                key: "item-1-1",
                children: [{
                    label: "item-1-1-1",
                    key: "item-1-1-1",
                    children:[{
                        label: "item-1-1-1-1",
                        key: "item-1-1-1-1",
                    },{
                        label: "item-1-1-1-2",
                        key: "item-1-1-1-2",
                    }]
                },{
                    label:"item-1-1-2",
                    key:"item-1-1-2"
                }]
            },
            {
                label: "item-1-2",
                key: "item-1-2",
            },
            {
                label: "item-1-3",
                key: "item-1-3",
            }]
    },
    {
        label: "item-2",
        key: "item-2"
    },
    {
        label: "item-3",
        key: "item-3"
    },
    {
        label: "item-4",
        key: "item-4"
    }
]
export {testItem}