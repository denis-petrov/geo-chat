import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router";

const DialogHeader = (props) => {
    const history = useHistory();

    // send request for getting chat
    // let chat = getChat(chatId);
    let chat = {
        chatId: 1,
        name: "Test chat 1",
        members: [1, 2]
    };

    let chatName = chat.name;

    let user = {
        userId: "1",
        role: "Admin",
        name: "Andrey Okunev",
        email: "test1@test.com"
    };

    if (chat.members.length <= 2) {
        chat.members.forEach((memberId) => {
            if (memberId !== user.userId) {
                // get another chat member's info
                let member = {
                    userId: "2",
                    role: "User",
                    name: "Ivan Ivanov",
                    email: "test2@test.com"
                };
                chatName = member.name;
            }
        });
    }

    return (
        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
            <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"} onClick={(e) => history.push("chat")}/>
            <div>{chatName}</div>
            <FontAwesomeIcon icon={faEllipsisV} className={"text-light my-auto ms-auto"}/>
        </div>
    )
};

export default DialogHeader;