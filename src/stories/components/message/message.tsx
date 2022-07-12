import "./style/style.scss";
import icon from "./icon"
import { pathObjKey, svgObjKey } from "../icon";
let set: any = new Proxy({}, {
    deleteProperty: (target: any, key) => {
        delete target[key]
        if (Object.keys(target).length === 0) (document.querySelector(".noob-message-container") as Element).innerHTML = ""
        return true
    }
})
const addMessage = (content: string, duration: number, icon: HTMLDivElement): number => {
    const container = document.querySelector(".noob-message-container");
    const message = document.createElement("div");
    const text = document.createTextNode(content);
    const id = Math.floor(Math.random() * 100);
    message.setAttribute("class", `noob-message-box noob-message-${id}`);
    message.setAttribute("style", `animation-delay:${duration}s`);//动画延时时间即为持续时间
    message?.appendChild(icon)
    message.appendChild(text);
    container?.appendChild(message);
    set[id] = 1
    return id;
}
const createSvg = (type: "success" | "warn" | "error" | "info"): HTMLDivElement => {
    const { svg, path } = icon[type];
    const iconContainer = document.createElement("div");
    iconContainer.setAttribute("class", "noob-message-iconContainer")
    const svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    Object.getOwnPropertyNames(svg).forEach((key) => { svgEle.setAttribute(key, svg[key as svgObjKey]) })
    let pathElementArr: Element[] = [];
    path.forEach((x) => {
        let pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        Object.getOwnPropertyNames(x).forEach(key => {
            pathElement.setAttribute(key, x[key as pathObjKey]);
        });
        pathElementArr.push(pathElement)
    })
    pathElementArr.forEach(x => { svgEle.appendChild(x) });
    iconContainer.appendChild(svgEle);
    return iconContainer
}
type createMessageFn = (content: string, duration: number, catagory: "success" | "warn" | "error" | "info") => void
/** 
 * 
 * @param {string} content  content show in the message
 * @param {number} duration  disapper in duration seconds,default is 3 
 * @param {string} catagory  message type 
*/

const createMessage: createMessageFn = (content: string, duration: number, catagory: "success" | "warn" | "error" | "info"): void => {
    let id: number;
    if (document.querySelector(".noob-message-container")) id = addMessage(content, duration, createSvg(catagory))
    else {
        const container = document.createElement("div");
        container.setAttribute("class", "noob-message-container");
        const root = document.querySelector("body");
        root?.appendChild(container);
        id = addMessage(content, duration, createSvg(catagory));
    }
    setTimeout(() => {
        Reflect.deleteProperty(set, id)
    }, (duration + 1) * 1000)//+1秒可以避免动画消失的问题，不影响持续时间
}
type MessageApi = {
    success: (content: string, duration?: number) => void,
    warn: (content: string, duration?: number) => void,
    info: (content: string, duration?: number) => void,
    error: (content: string, duration?: number) => void,
}
const Message: MessageApi = {
    success: (content: string, duration: number = 3) => { createMessage(content, duration, "success") },
    warn: (content: string, duration: number = 3) => { createMessage(content, duration, "warn") },
    error: (content: string, duration: number = 3) => { createMessage(content, duration, "error") },
    info: (content: string, duration: number = 3) => { createMessage(content, duration, "info") }
}
export default Message
export type { MessageApi }