import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import '../../assets/css/chat/Chat.css';
import {connect} from "react-redux";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {getMessages} from "../../store/actions/chat/getMessages";
import {Link} from "react-router-dom";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {removeChat} from "../../store/actions/chat/removeChat";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {getCurrentUser} from "../../utils/getCurrentUser";
import {GET_LAST_MESSAGES_FOR_CHAT_LIST} from "../../store/types";

class DialogItem extends Component {

    componentDidMount() {
        this.props.getMessages(this.props.chatId, 1, GET_LAST_MESSAGES_FOR_CHAT_LIST)
        this.connectWs()
    }

    connectWs() {
        let self = this
        let sockJSClient = new SockJS("http://localhost:80/api/ws");
        let stompClient = Stomp.over(sockJSClient);
        stompClient.connect({}, function () {
            let user = getCurrentUser();
            self.subscribtion = stompClient.subscribe(
                `/user/${user.userId}/queue/message/create`,
                function (frame) {
                    console.log('ПОДПИСКА')
                    let chatId = frame.body.substring(1, frame.body.length - 1)
                    self.props.getMessages(chatId, 1, GET_LAST_MESSAGES_FOR_CHAT_LIST)
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

    removeChosedChat() {
        this.props.removeChat(this.props.chatId)
        document.getElementById(this.props.chatId).remove()
    }

    render() {
        console.log(this.props);
        let messages = this.props.messages.lastMessages;
        let chat = this.props.chats.chats[this.props.chatId];
        let lastMsg = null;

        if (messages !== undefined) {
            let chatMessage = messages[this.props.chatId]
            if (chatMessage !== undefined) {
                lastMsg = <div className={"text-truncate d-flex chat-item-text"}>
                    <img alt="dead inside" className={"profile-picture small rounded-circle"}
                         src="https://memepedia.ru/wp-content/uploads/2019/08/ded-insayd-5-768x768.jpg"/>
                    <Card.Text className={"text-truncate ms-2"}>
                        {chatMessage.message}
                    </Card.Text>
                </div>
            }
        }

        return (
            <Link to={'/chat/' + this.props.chatId} id={this.props.chatId}>
                <Card className={"block-round chat-item text-white flex-row px-3 py-2 mb-1"}>
                    <img alt="anime girl" className={"profile-picture medium rounded-circle m-auto"}
                         src="https://avatars.mds.yandex.net/get-zen_doc/1911932/pub_5d6370bcac412400aeb2c040_5d884d0d6d29c100adddaf85/scale_1200"/>
                    <Card.Body className={"py-0 text-truncate"}>
                        <Card.Title className={"chat-item-title"}>{chat ? chat.name : 'new chat'}</Card.Title>
                        {lastMsg}
                    </Card.Body>
                    <Link to={'/chat'}>
                        <FontAwesomeIcon icon={faTimes} className={"text-light ms-2"}
                                         onClick={() => {
                                             this.removeChosedChat()
                                         }}/>
                    </Link>
                </Card>
            </Link>
        )
    }
}

const dialogItemStateToProps = (state) => ({
    messages: state.messages,
    chats: state.chats
})

const dialogItemDispatchToProps = {
    getUserInfo, getMessages, getChatInfo, removeChat
}

export default connect(dialogItemStateToProps, dialogItemDispatchToProps)(DialogItem);