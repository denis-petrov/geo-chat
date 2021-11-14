import React, {Component} from 'react';
import '../../assets/css/chat/Chat.css';
import Dialog from "./Dialog";
import DialogHeader from "./DialogHeader";
import DialogInput from "./DialogInput";
import {connect} from "react-redux";
import {getChats} from "../../store/actions/chat/getChats";
import {addChat} from "../../store/actions/chat/addChat";

class Chat extends Component {

    componentDidMount() {
        this.props.getChats();
    }

    render() {
        console.log(this.props);
        return (
            <div className={"chat"}>
                <div className={"chat-wrapper mx-auto"}>
                    <DialogHeader chatId={this.props.chatId}/>
                    <Dialog chatId={this.props.chatId}/>
                    <DialogInput chatId={this.props.chatId}/>
                </div>
            </div>
        );
    }
}

const chatStateToProps = (state) => ({
    chats: state.chats
})

const chatDispatchToProps = {
    getChats, addChat
}

export default connect(chatStateToProps, chatDispatchToProps)(Chat);