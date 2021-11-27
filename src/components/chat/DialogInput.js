import React, {Component} from 'react';
import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {getCurrentUser} from "../../utils/getCurrentUser";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {connectWs} from "../../webSocket/connect";
import {test} from "../../webSocket/messageNotification";

class DialogInput extends Component {

    componentDidMount() {
        //this.props.getChatInfo();
        //this.props.getUserInfo();
    }

    render() {

        let sockJSClient = new SockJS("http://localhost:80/api/ws");
        let stompClient = Stomp.over(sockJSClient);
        stompClient.connect({}, function () {
            console.log("connected")
            stompClient.subscribe(
                "/create/33f502fa-fe33-438b-8da3-5072d71444bc",
                test()
            );
        }, function () {
            console.log('error')
        });

        const addMessage = (e) => {
            let msgInput = document.getElementsByClassName('dialog-input')[0];
            if (msgInput.textContent.length) {
                //sendMessage(msgInput.textContent);
                let user = getCurrentUser()
                this.props.addMessage(this.props.chatId, user.userId, msgInput.textContent);
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