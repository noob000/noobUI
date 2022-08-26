import { getByText, render, screen, waitFor } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import Menu, { MenuItemProps } from ".";
import { getChildKeysMap } from "./util";
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
                    children: [{
                        label: "item-1-1-1-1",
                        key: "item-1-1-1-1",
                    }, {
                        label: "item-1-1-1-2",
                        key: "item-1-1-1-2",
                    }]
                }, {
                    label: "item-1-1-2",
                    key: "item-1-1-2",
                    children: [
                        {
                            label: 'item-1-1-2-1asdasdasdasdasd',
                            key: "item-1-1-2-1",
                            children: [{
                                label: "item-1-1-2-1-1",
                                key: "item-1-1-2-1-1"
                            }]
                        },
                        {
                            label: 'item-1-1-2-2',
                            key: "item-1-1-2-2",
                            children: [{
                                label: "item-1-1-2-2-1",
                                key: "item-1-1-2-2-1"
                            }]
                        },
                    ]
                }]
            },
            {
                label: "item-1-2",
                key: "item-1-2",
                children: [{
                    label: "item-1-2-1",
                    key: "item-1-2-1",
                }]
            },
            {
                label: "item-1-3",
                key: "item-1-3",
            }]
    },
    {
        label: "item-2",
        key: "item-2",
        children: [
            {
                label: "item-2-1",
                key: "item-2-1",
                children: [
                    {
                        label: "item-2-1-1",
                        key: "item-2-1-1",
                        children: [{
                            label: "item-2-1-1-1",
                            key: "item-2-1-1-1",
                        }]
                    },
                    {
                        label: "item-2-1-2",
                        key: "item-2-1-2",
                    }
                ]
            },
            {
                label: "item-2-2",
                key: "item-2-2",
            },
        ]
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

export { testItem }