import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {connect} from "react-redux";

class DialogTextItem extends Component {

    render() {
        const yourMsgClass = "is-out";
        console.log(this.props);
        let isYourMsg = this.props.user.userId === this.props.message.sender;
        let message = this.props.message;

        let date = new Date(message.sentDate);

        return (
            <div className={`my-2 d-flex ${isYourMsg ? yourMsgClass : ""}`}>
                <div className={"message-text px-3 p-2 rounded-3"}>
                    {message.message}
                    <span className={"msg-time"}>{`${date.getHours()}:${date.getMinutes()}`}</span>
                </div>
            </div>
        )
    }
}

const dialogTextItemStateToProps = (state) => ({
})

const dialogTextItemDispatchToProps = {
    addMessage, getChatInfo
}

export default connect(dialogTextItemStateToProps, dialogTextItemDispatchToProps)(DialogTextItem);