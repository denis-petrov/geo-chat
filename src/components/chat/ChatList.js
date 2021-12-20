import React, {Component} from 'react'
import '../../assets/css/chat/Chat.css'
import DialogItem from './DialogItem'
import Navigation from '../navigation/Navigation'
import {connect} from "react-redux"
import {getChats} from "../../store/actions/chat/getChats"
import {addChat} from "../../store/actions/chat/addChat"
import Add from "../navigation/control-button/Add"
import Pages from "../navigation/Pages"
import ChatSearch from "../navigation/search/ChatSearch"
import {getMessages} from "../../store/actions/chat/getMessages"
import {addMemberToChat} from "../../store/actions/chat/addMemberToChat";
import {getCurrentUser} from "../../utils/getCurrentUser";

class ChatList extends Component {

    newChat() {
        this.props.addChat('default chat').then(() => {
            let newChatId = this.props.chats.newChatId;
            if (newChatId) {
                let user = getCurrentUser();
                this.props.addMemberToChat(user.userId, newChatId);
                window.location.assign(window.location.origin + '/chat/' + newChatId + '/settings');
            }
        });
    }

    componentDidMount() {
        let user = getCurrentUser()
        this.props.getChats(user.userId)
    }
    render() {
        let items = this.props.chats.chats
        let dialogItems = []
        if (items) {
            for (let key in items) {
                let chat = items[key]
                dialogItems.push(<DialogItem key={"dialog-item-" + chat.chatId} chatId={"" + chat.chatId}/>)
            }
            dialogItems.reverse();
        }

        if (dialogItems.length === 0) {
            dialogItems.push(<div key={'empty'} className={"text-light"}>Chat list is empty</div>)
        }

        const controlPanel = [<Add key={"Add"} onClick={() => {this.newChat()}} />]

        return (
            <div className={"chat"}>
                <div className={"chat-wrapper mx-auto"}>
                    <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>Chats</div>
                    <div className={"dialog-items-wrapper"}>
                        {dialogItems}
                    </div>
                    <Navigation currPage={Pages.CHAT} controlPanel={controlPanel} search={<ChatSearch/>}/>
                </div>
            </div>
        )
    }
}

const chatListStateToProps = (state) => ({
    chats: state.chats
})

const chatListDispatchToProps = {
    getChats, addChat, getMessages, addMemberToChat
}

export default connect(chatListStateToProps, chatListDispatchToProps)(ChatList);