import { getChildKeysMap } from "./util";
import { testItem } from "./menu.test";
import { MenuItemProps } from "./menu";
const testItem1: MenuItemProps[] = [
    { label: "item-1", key: "item-1" },
    { label: "item-2", key: "item-2", children: [] },
    {
        label: "item-3", key: "item-3", children: [{
            label: "item-3-1",
            key: "item-3-1",
            children: []
        }]
    }]


test("getChildKeysMapFn test", () => {
    function testFn(resultMap: Map<string, string[]>, properMap: Map<string, string[]>) {
        for (let [key, value] of properMap) {
            if (value.length === 0) {
                expect(resultMap.get(key)).not.toBeUndefined()
                expect(resultMap.get(key)?.length).toBe(0);
            }
            else {
                const arr = resultMap.get(key);
                expect(arr).not.toBeUndefined();
                expect(arr?.length).toEqual(value.length);
                value.forEach(v => expect(arr).toContain(v))
            }
        }
    }
    const map1 = getChildKeysMap(testItem);
    const properMap1 = new Map([
        ['item-1', ["item-1-1", "item-1-2", "item-1-3"]],
        ["item-1-1", ["item-1-1-1", "item-1-1-2"]],
        ["item-1-1-1", ["item-1-1-1-1", "item-1-1-1-2"]],
        ["item-1-1-1-1", []],
        ["item-1-1-1-2", []],
        ["item-1-2", ["item-1-2-1"]],
        ["item-1-2-1", []],
        ["item-1-3", []],
        ["item-1-1-2", ["item-1-1-2-1", "item-1-1-2-2"]],
        ['item-2', ["item-2-1", "item-2-2",]],
        ["item-3", []],
        ["item-4", []],
        ["item-2-1", ["item-2-1-1", "item-2-1-2"]],
        ["item-2-2", []],
        ["item-2-1-1", ["item-2-1-1-1"]],
    ])
    testFn(map1, properMap1);
    const map2 = getChildKeysMap(testItem1);
    const properMap2 = new Map([
        ["item-1", []],
        ["item-2", []],
        ["item-3", ["item-3-1"]],
        ["item-3-1", []]
    ])
    testFn(map2, properMap2);
})