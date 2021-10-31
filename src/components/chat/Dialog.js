import "../../assets/css/chat/Chat.css";
import DialogTextItem from "./DialogTextItem";

const Dialog = (props) => {
    // get user
    // let user = getUser();
    let user = {
        userId: "1",
        role: "Admin",
        name: "Andrey Okunev",
        email: "test1@test.com"
    };

    // get chat's messages
    // let messages = getMessages(props.chat.chatId);
    let messages = [
        {
            messageId: "1",
            sender: "1",
            chat: "1",
            message: "Hi, my friend!",
            sentDate: "2021-10-31 19:20:00"

        },
        {
            messageId: "2",
            sender: "2",
            chat: "1",
            message: "Oh, hi",
            sentDate: "2021-10-31 19:22:00"
        },
        {
            messageId: "3",
            sender: "2",
            chat: "1",
            message: "Sup",
            sentDate: "2021-10-31 19:22:30"
        }
    ];

    let dialogTextItems = [];
    messages.forEach((message) => {
        dialogTextItems.push(<DialogTextItem key={`message-${message.messageId}`} message={message} user={user} />);
    });

    return (
        <div className={"p-3 dialog-content"}>
            <div className={"w-100"}>
                {dialogTextItems}
            </div>
        </div>
    )
};

export default Dialog;