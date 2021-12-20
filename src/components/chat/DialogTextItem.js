import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {connect} from "react-redux";
import {getCurrentUser} from "../../utils/getCurrentUser";

class DialogTextItem extends Component {

    render() {
        const yourMsgClass = "is-out";
        let user = getCurrentUser()
        let isYourMsg = user.userId === this.props.message.senderId;
        let message = this.props.message;

        let date = new Date(message.sentDate);

        return (
            <div className={`my-2 d-flex ${isYourMsg ? yourMsgClass : ""}`}>
                <div className={"message-text px-3 p-2 rounded-3"}>
                    <span>{message.message}</span>
                    <span className={"msg-time"}>{`${date.getHours()}:${date.getMinutes()}`}</span>
                </div>
            </div>
        )
    }
}

const dialogTextItemStateToProps = (state) => ({
    user: state.user
})

const dialogTextItemDispatchToProps = {
}

export default connect(dialogTextItemStateToProps, dialogTextItemDispatchToProps)(DialogTextItem);