import { FC } from "react";
import Message from "./Message";
type MessageProps = {
    /**
     * 消息的内容
     */
    content: string,
    /**
     * 消息在屏幕上显示的时间，默认为3s
     */
    duration?: number,
    /**
     * 消息的类型
     */
    catagory: "success" | "warn" | "error" | "info"
}
const MessageDoc: FC<MessageProps> = ({ content, catagory, duration = 3 }) => {

    return (
        <div></div>
    )
}
export default MessageDoc