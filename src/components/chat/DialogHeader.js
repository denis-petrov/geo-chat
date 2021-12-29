import React, {useEffect} from 'react'
import '../../assets/css/chat/Chat.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import {getChatInfo} from '../../store/actions/chat/getChatInfo'
import {getUserInfo} from '../../store/actions/user/getUserInfo'
import {Link} from 'react-router-dom'
import {getChats} from '../../store/actions/chat/getChats'

const DialogHeader = (props) => {

    useEffect(() => {
        props.getChatInfo(props.chatId)
        if (props.chats.chatInfo) {
            document.title = props.chats.chatInfo.name
        }
    }, [])

    console.log(props)
    let chat
    if (props.chats.chatInfo) {
        chat = props.chats.chatInfo
    }

    return (
        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
            <Link to={'/chat'}>
                <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"} />
            </Link>
            <div>{chat ? chat.name : 'default chat name'}</div>
            <div className={"ms-auto"}>
                <Link to={'/chat/' + props.chatId + '/settings'}>
                    <FontAwesomeIcon icon={faEllipsisV} className={"text-light my-auto"}/>
                </Link>
            </div>
        </div>
    )
}

const dialogHeaderStateToProps = (state) => ({
    chats: state.chats
})

const dialogHeaderDispatchToProps = {
    getChatInfo, getUserInfo, getChats
}

export default connect(dialogHeaderStateToProps, dialogHeaderDispatchToProps)(DialogHeader)