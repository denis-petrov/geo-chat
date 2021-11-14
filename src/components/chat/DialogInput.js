import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";

class DialogInput extends Component {

    componentDidMount() {
        this.props.getChatInfo();
        this.props.getUserInfo();
    }

    render() {
        const addMessage = (e) => {
            let msgInput = document.getElementsByClassName('dialog-input')[0];
            if (msgInput.textContent.length) {
                this.props.addMessage(this.props.chatId, this.props.user.userId, msgInput.textContent);
            }

            msgInput.textContent = "";
        }

        return (
            <div className={"px-3 py-4 bg-transparent"}>
                <div className="d-flex">
                    <div className="block-round-small bg-light w-100 p-2">
                        <div contentEditable={true} data-placeholder="Message"
                             className={"py-1 px-3 w-100 bg-transparent dialog-input"}/>
                    </div>
                    <div className={"d-flex flex-column-reverse"}>
                        <FontAwesomeIcon icon={faArrowCircleRight} className={"text-light fa-3x ms-2"}
                                         onClick={(e) => {addMessage(e)}}/>
                    </div>
                </div>
            </div>
        )
    }
}

const dialogInputStateToProps = (state) => ({
    chat: state.chat,
    user: state.user
})

const dialogInputDispatchToProps = {
    addMessage, getChatInfo, getUserInfo
}

export default connect(dialogInputStateToProps, dialogInputDispatchToProps)(DialogInput);