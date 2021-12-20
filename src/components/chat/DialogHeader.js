import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {Link} from "react-router-dom";
import {getChats} from "../../store/actions/chat/getChats";

class DialogHeader extends Component {

    componentDidMount() {
        //this.props.getChats('33f502fa-fe33-438b-8da3-5072d71444bc')
        this.props.getChatInfo(this.props.chatId)
    }

    render() {
        console.log(this.props)
        let chat
        if (this.props.chats.chatInfo) {
            chat = this.props.chats.chatInfo;
        }

        return (
            <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                <Link to={'/chat'}>
                    <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"} />
                </Link>
                <div>{chat ? chat.name : 'default chat name'}</div>
                <div className={"ms-auto"}>
                    <Link to={'/chat/' + this.props.chatId + '/settings'}>
                        <FontAwesomeIcon icon={faEllipsisV} className={"text-light my-auto"}/>
                    </Link>
                </div>
            </div>
        )
    }
}

const dialogHeaderStateToProps = (state) => ({
    chats: state.chats
})

const dialogHeaderDispatchToProps = {
    getChatInfo, getUserInfo, getChats
}

export default connect(dialogHeaderStateToProps, dialogHeaderDispatchToProps)(DialogHeader);