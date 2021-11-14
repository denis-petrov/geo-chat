import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {Link} from "react-router-dom";

class DialogHeader extends Component {

    componentDidMount() {
        this.props.getChatInfo();
    }

    render() {

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
                <Link to={'/chat'}>
                    <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"} />
                </Link>
                <div>{chatName}</div>
                <FontAwesomeIcon icon={faEllipsisV} className={"text-light my-auto ms-auto"}/>
            </div>
        )
    }
}

const dialogHeaderStateToProps = (state) => ({
    chat: state.chat
})

const dialogHeaderDispatchToProps = {
    getChatInfo, getUserInfo
}

export default connect(dialogHeaderStateToProps, dialogHeaderDispatchToProps)(DialogHeader);