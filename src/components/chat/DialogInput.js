import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {getCurrentUser} from "../../utils/getCurrentUser";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {getMessages} from "../../store/actions/chat/getMessages";

class DialogInput extends Component {

    componentDidMount() {
        const MAX_LEN = 1000;
        this.connectWs()
        let input = document.getElementById("dialog-input")
        input.addEventListener('input', event => {
            if (input.innerHTML.length > MAX_LEN) {
                input.innerHTML = input.innerHTML.substr(0, MAX_LEN);
            }
        });
    }

    addMessage(e) {
        let msgInput = document.getElementsByClassName('dialog-input')[0];
        let text = msgInput.textContent.trim()
        if (text.length) {
            let user = getCurrentUser()
            console.log(this.props)
            this.props.addMessage(this.props.chatId, user.userId, text);
        }

        msgInput.textContent = "";
    }

    connectWs() {
        let self = this;
        let sockJSClient = new SockJS("http://localhost:80/api/ws");
        let stompClient = Stomp.over(sockJSClient);
        stompClient.connect({}, function () {
            let user = getCurrentUser();
            self.subscribtion = stompClient.subscribe(
                `/user/${user.userId}/queue/message/create`,
                function (frame) {
                    console.log('ПОДПИСКА')
                    console.log(frame, frame.body)
                    let chatId = frame.body.substring(1, frame.body.length - 1)
                    self.props.getMessages(chatId, 1)
                }
            );
        }, function () {
            console.log("error ws");
        });
    }

    componentWillUnmount() {
        if (this.subscribtion !== undefined) {
            this.subscribtion.unsubscribe()
        }
    }

    render() {
        return (
            <div className={"px-3 py-4 bg-transparent"}>
                <div className="d-flex">
                    <div className="block-round-small bg-light w-100 p-2">
                        <div id={"dialog-input"} contentEditable={true} data-placeholder="Message"
                             className={"py-1 px-3 w-100 bg-transparent dialog-input"}/>
                    </div>
                    <div className={"d-flex flex-column-reverse"}>
                        <FontAwesomeIcon icon={faArrowCircleRight} className={"text-light fa-3x ms-2"}
                                         onClick={(e) => {this.addMessage(e)}}/>
                    </div>
                </div>
            </div>
        )
    }
}

const dialogInputStateToProps = (state) => ({
    user: state.user
})

const dialogInputDispatchToProps = {
    addMessage, getChatInfo, getUserInfo, getMessages
}

export default connect(dialogInputStateToProps, dialogInputDispatchToProps)(DialogInput);