import React from 'react'
import '../../assets/css/chat/Chat.css'
import Dialog from './Dialog'
import DialogHeader from './DialogHeader'
import DialogInput from './DialogInput'
import {connect} from 'react-redux'
import {getChats} from '../../store/actions/chat/getChats'
import {addChat} from '../../store/actions/chat/addChat'
import {getMessages} from '../../store/actions/chat/getMessages'

const Chat = (props) => {

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <DialogHeader chatId={props.chatId}/>
                <Dialog chatId={props.chatId}/>
                <DialogInput chatId={props.chatId}/>
            </div>
        </div>
    )
}

const chatStateToProps = (state) => ({
    chats: state.chats,
    messages: state.messages
})

const chatDispatchToProps = {
    getChats, addChat, getMessages
}

export default connect(chatStateToProps, chatDispatchToProps)(Chat)