import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import DialogTextItem from "./DialogTextItem";
import {connect} from "react-redux";
import {getMessages} from "../../store/actions/chat/getMessages";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getCurrentUser} from "../../utils/getCurrentUser";

class Dialog extends Component {

    componentDidMount() {
        console.log(this.props.chatId)
        this.props.getMessages(this.props.chatId, 50);
    }

    render() {
        console.log(this.props);

        let dialogTextItems = [];
        let messages = this.props.messages.messages;
        if (messages) {
            messages.reverse();
            messages.forEach((message) => {
                dialogTextItems.push(<DialogTextItem key={`message-${message.messageId}`} message={message} />);
            });
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
    getMessages, addMessage
}

export default connect(messagesStateToProps, dialogDispatchToProps)(Dialog);