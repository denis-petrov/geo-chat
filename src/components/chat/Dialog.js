import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import DialogTextItem from "./DialogTextItem";
import {connect} from "react-redux";
import {getMessages} from "../../store/actions/chat/getMessages";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getMessagesBeforeDate} from "../../store/actions/chat/getMessagesBeforeDate";

class Dialog extends Component {

    componentDidMount() {
        this.props.getMessages(this.props.chatId, 10);
        let dialogContent = document.getElementsByClassName('dialog-content')[0]
        dialogContent.addEventListener('scroll', function(e) {
            this.getMessagesBefore(e.target)
        }.bind(this));
    }

    getMessagesBefore(target) {
        if (target.scrollTop < 0) {
            if (target.offsetHeight - target.scrollHeight >= target.scrollTop) {
                let messages = this.props.messages.messages;
                if (messages) {
                    messages = messages[this.props.chatId]
                    if (messages) {
                        let message = messages[messages.length - 1]
                        this.props.getMessagesBeforeDate(this.props.chatId, 50, message.sentDate);
                    }
                }
            }
        }
    }

    render() {
        let dialogTextItems = [];
        let messages = this.props.messages.messages;
        if (messages !== undefined && messages[this.props.chatId]) {
            messages = messages[this.props.chatId]
            messages.reverse();
            for (let i = 0; i < messages.length; i++) {
                let message = messages[i]
                if (message.chatId !== this.props.chatId) {
                    continue
                }

                let message2 = i - 1 >= 0 ? messages[i - 1] : messages[i]

                let date = new Date(message.sentDate)
                let date2 = new Date(message2.sentDate)

                if (i === 0 || date.toLocaleDateString() !== date2.toLocaleDateString()) {
                    dialogTextItems.push(<div key={"date-" + message.sentDate + i} className={"text-light mx-auto w-25"}>{date.toLocaleDateString()}</div>);
                }

                dialogTextItems.push(<DialogTextItem key={`message-${message.messageId}`} message={message} />);
            }
        }

        return (
            <div className={"p-3 dialog-content"}>
                <div id={'dialog-content'} className={"w-100"}>
                    {dialogTextItems}
                </div>
            </div>
        )
    }
}

const messagesStateToProps = (state) => ({
    messages: state.messages
})

const dialogDispatchToProps = {
    getMessages, addMessage, getMessagesBeforeDate
}

export default connect(messagesStateToProps, dialogDispatchToProps)(Dialog);