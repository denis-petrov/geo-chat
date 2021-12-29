import React, {useEffect} from 'react'
import '../../assets/css/chat/Chat.css'
import {connect} from 'react-redux'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {getUserInfo} from '../../store/actions/user/getUserInfo'
import * as xss from "xss";

const DialogTextItem = (props) => {

    useEffect(() => {
        if (props.showUser) {
            let users = JSON.parse(window.localStorage.getItem('users'))
            if (!users) {
                users = {}
            }

            let userName = users[message.senderId]
            if (!userName) {
                if (!props.user.user || props.user.user.userId !== message.senderId) {
                    props.getUserInfo(message.senderId)
                }
            }
        }
    }, [])

    const yourMsgClass = "is-out"
    let user = getCurrentUser()
    let isYourMsg = user.userId === props.message.senderId
    let message = props.message

    let date = new Date(message.sentDate)

    let userName = ''
    if (props.showUser && !isYourMsg) {
        let users = JSON.parse(window.localStorage.getItem('users'))
        if (!users) {
            users = {}
        }
        userName = <div className={"d-flex"}>
            <div className={"msg-sender-name"}>
                {users[message.senderId]}
            </div>
        </div>
    }

    let parsedMsg = xss(message.message);
    parsedMsg = parsedMsg.replace(/\bhttps?:\/\/\S+/gi, '<a href="$&" target="_blank" rel="nofollow">$&</a>')

    return (
        <div className={`my-2 d-flex ${isYourMsg ? yourMsgClass : ""}`}>
            <div className={"message-text px-3 p-2 rounded-3"}>
                {userName}
                <span dangerouslySetInnerHTML={{__html: parsedMsg}} />
                <span className={"msg-time"}>{`${date.getHours()}:${date.getMinutes()}`}</span>
            </div>
        </div>
    )
}

const dialogTextItemStateToProps = (state) => ({
    user: state.user
})

const dialogTextItemDispatchToProps = {
    getUserInfo
}

export default connect(dialogTextItemStateToProps, dialogTextItemDispatchToProps)(DialogTextItem)