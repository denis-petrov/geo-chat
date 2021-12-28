import React, {useEffect} from 'react'
import {Card} from 'react-bootstrap'
import '../../assets/css/chat/Chat.css'
import {connect} from 'react-redux'
import {getUserInfo} from '../../store/actions/user/getUserInfo'
import {getMessages} from '../../store/actions/chat/getMessages'
import {useHistory} from 'react-router-dom'
import {getChatInfo} from '../../store/actions/chat/getChatInfo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
import {removeChat} from '../../store/actions/chat/removeChat'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {GET_LAST_MESSAGES_FOR_CHAT_LIST} from '../../store/types'
import {removeMember} from '../../store/actions/chat/removeMember'

const DialogItem = (props) => {

    useEffect(() => {
        props.getMessages(props.chatId, 1, GET_LAST_MESSAGES_FOR_CHAT_LIST)
        connectWs()
    }, [])

    const history = useHistory()

    const connectWs = () => {
        let sockJSClient = new SockJS(`${window.location.protocol}//${window.location.host}/api/ws`)
        let stompClient = Stomp.over(sockJSClient)
        stompClient.connect({}, function () {
            let user = getCurrentUser()
            stompClient.subscribe(
                `/user/${user.userId}/queue/message/create`,
                function (frame) {
                    console.log('ПОДПИСКА')
                    let chatId = frame.body.substring(1, frame.body.length - 1)
                    props.getMessages(chatId, 1, GET_LAST_MESSAGES_FOR_CHAT_LIST)
                }
            )
        }, function () {
            console.log("error ws")
        })
    }

    const leaveFromChat = () => {
        let user = getCurrentUser()
        props.removeMember(user.userId, props.chatId)
    }

    console.log(props)
    let messages = props.messages.lastMessages
    let chat = props.chats.chats[props.chatId]
    let lastMsg = null

    if (messages !== undefined) {
        let chatMessage = messages[props.chatId]
        if (chatMessage !== undefined) {
            lastMsg = <div className={"text-truncate d-flex chat-item-text w-100"}>
                <img alt="dead inside" className={"profile-picture small rounded-circle"}
                     src="https://memepedia.ru/wp-content/uploads/2019/08/ded-insayd-5-768x768.jpg"/>
                <Card.Text className={"text-truncate ms-2"}>
                    {chatMessage.message}
                </Card.Text>
            </div>
        }
    }

    let chatMessages = JSON.parse(window.localStorage.getItem('chatMessages'))
    let unreadMessages = ''
    if (chatMessages && chatMessages[props.chatId] !== undefined) {
        unreadMessages = <FontAwesomeIcon icon={faCircle} className={"text-primary fa-xs"}/>
    }

    return (
        <Card className={"block-round chat-item text-white flex-row px-3 py-2 mb-1"} onClick={() => {
            history.push('/chat/' + props.chatId)
        }}>
            <img alt="anime girl" className={"profile-picture medium rounded-circle m-auto"}
                 src="https://avatars.mds.yandex.net/get-zen_doc/1911932/pub_5d6370bcac412400aeb2c040_5d884d0d6d29c100adddaf85/scale_1200"/>
            <Card.Body className={"py-0 text-truncate"}>
                <Card.Title className={"chat-item-title"}>{chat ? chat.name : 'new chat'}</Card.Title>
                <div className={"d-flex"}>
                    {lastMsg}
                    {unreadMessages}
                </div>
            </Card.Body>
            <FontAwesomeIcon icon={faTimes} className={"text-light ms-2"}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 leaveFromChat()
                             }}/>
        </Card>
    )
}

const dialogItemStateToProps = (state) => ({
    messages: state.messages,
    chats: state.chats
})

const dialogItemDispatchToProps = {
    getUserInfo, getMessages, getChatInfo, removeChat, removeMember
}

export default connect(dialogItemStateToProps, dialogItemDispatchToProps)(DialogItem)