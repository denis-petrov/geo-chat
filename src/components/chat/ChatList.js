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

class ChatList extends Component {

    componentDidMount() {
        console.log('test')
        this.props.getChats('33f502fa-fe33-438b-8da3-5072d71444bc')
    }

    render() {
        let items = this.props.chats.chats
        console.log(this.props)
        let dialogItems = []
        for (let key in items) {
            let chat = items[key]
            dialogItems.push(<DialogItem key={"dialog-item-" + chat.chatId} chatId={"" + chat.chatId}/>)
        }

        const controlPanel = [<Add key={"Add"}/>]

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
        getChats, addChat, getMessages
}

export default connect(chatListStateToProps, chatListDispatchToProps)(ChatList);