import { FC } from "react";
import { testItem } from "./menu.test";
import MenuItem from "./menuItem";
import "./style/menu.scss"
type MenuProps = {
    item?: MenuItemProps[];
    mode?: "vertical" | "horizontal";

}
type MenuItemProps = {
    label: string;
    key: string;
    children?: MenuItemProps[];
}
const Menu: FC<MenuProps> = ({ item = testItem }) => {
    return (
        <div className='menuContainer'>
            {item.map((props) => <MenuItem {...props} />)}
        </div>
    )
}
export default Menu
export type { MenuProps, MenuItemProps }