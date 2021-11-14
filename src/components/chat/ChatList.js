import React, {Component} from 'react';
import '../../assets/css/chat/Chat.css';
import DialogItem from './DialogItem';
import Search from '../search/Search';
import Navigation from '../navigation/Navigation';
import Dialog from "./Dialog";
import DialogHeader from "./DialogHeader";
import DialogInput from "./DialogInput";
import {connect} from "react-redux";
import {getChats} from "../../store/actions/chat/getChats";
import {addChat} from "../../store/actions/chat/addChat";
import Chat from "./Chat";

class ChatList extends Component {

    componentDidMount() {
        this.props.getChats();
    }

    render() {

        let items = this.props.chats;

        const chatId = new URLSearchParams(this.props.location.search).get('id');
        if (chatId) {
            return (
                <Chat chatId={chatId} />
            );
        }

        return (
            <div className={"chat"}>
                <div className={"chat-wrapper mx-auto"}>
                    <Search/>
                    <div className={"dialog-items-wrapper"}>
                        {items.map(chat => <DialogItem key={"dialog-item-" + chat.chatId} chatId={chat.chatId} />)}
                    </div>
                    <Navigation/>
                </div>
            </div>
        );
    }
}

const chatListStateToProps = (state) => ({
    chats: state.chats
})

const chatListDispatchToProps = {
    getChats, addChat
}

export default connect(chatListStateToProps, chatListDispatchToProps)(ChatList);