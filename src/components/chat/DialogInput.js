import React, {Component} from 'react'
import "../../assets/css/chat/Chat.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons"
import {connect} from "react-redux"
import {addMessage} from "../../store/actions/chat/addMessage"
import {getChatInfo} from "../../store/actions/chat/getChatInfo"
import {getUserInfo} from "../../store/actions/user/getUserInfo"

class DialogInput extends Component {

    componentDidMount() {
        //this.props.getChatInfo();
        //this.props.getUserInfo();
    }

    render() {
        const ws = new WebSocket("ws://6392-136-169-211-95.ngrok.io/api/ws");
        ws.onmessage = event => {
            console.log(event.data)
        }
        ws.onopen = () => {
            console.log("[open] Соединение установлено")
            console.log("Отправляем данные на сервер")
            ws.send("test msg")
        }
        /*let socket = new WebSocket("ws://6392-136-169-211-95.ngrok.io/ws");

        socket.onopen = function(e) {
            console.log("[open] Соединение установлено");
            console.log("Отправляем данные на сервер");
            socket.send("Меня зовут Джон");
        };

        socket.onmessage = function(event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log('[close] Соединение прервано');
            }
        };

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        };*/

        const addMessage = (e) => {
            let msgInput = document.getElementsByClassName('dialog-input')[0];
            if (msgInput.textContent.length) {
                //sendMessage(msgInput.textContent)
                this.props.addMessage(this.props.chatId, '33f502fa-fe33-438b-8da3-5072d71444bc', msgInput.textContent);
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