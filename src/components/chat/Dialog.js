import React, {useEffect} from 'react'
import '../../assets/css/chat/Chat.css'
import DialogTextItem from './DialogTextItem'
import {connect} from 'react-redux'
import {getMessages} from '../../store/actions/chat/getMessages'
import {addMessage} from '../../store/actions/chat/addMessage'
import {getMessagesBeforeDate} from '../../store/actions/chat/getMessagesBeforeDate'

const Dialog = (props) => {

    useEffect(() => {
        props.getMessages(props.chatId, 50)
        let dialogContent = document.getElementsByClassName('dialog-content')[0]
        dialogContent.addEventListener('scroll', function(e) {
            getMessagesBefore(e.target)
        })
    }, [])

    const updateUnreadMessages = (chatId) => {
        let chatMessages = JSON.parse(window.localStorage.getItem('chatMessages'))
        if (!chatMessages) {
            chatMessages = {}
        }

        delete chatMessages[chatId]
        window.localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
    }

    const getMessagesBefore = (target) => {
        if (target.scrollTop < 0) {
            if (target.offsetHeight - target.scrollHeight >= target.scrollTop) {
                let messages = props.messages.messages
                if (messages) {
                    messages = messages[props.chatId]
                    if (messages) {
                        let message = messages[messages.length - 1]
                        let date = new Date(message.sentDate)
                        props.getMessagesBeforeDate(props.chatId, 50, date.getTime())
                    }
                }
            }
        }
    }

    const reverse = (arr) => {
        var ret = []
        for (var i = arr.length - 1; i >= 0; i--) {
            ret.push(arr[i])
        }

        return ret
    }

    let dialogTextItems = []
    let messages = props.messages.messages
    if (messages !== undefined && messages[props.chatId]) {
        messages = messages[props.chatId]
        messages = reverse(messages)
        for (let i = 0; i < messages.length; i++) {
            let message = messages[i]
            if (message.chatId !== props.chatId) {
                continue
            }

            let message2 = i - 1 >= 0 ? messages[i - 1] : messages[i]

            let date = new Date(message.sentDate)
            let date2 = new Date(message2.sentDate)

            if (i === 0 || date.toLocaleDateString() !== date2.toLocaleDateString()) {
                dialogTextItems.push(<div key={"date-" + message.sentDate + i} className={"text-light mx-auto w-25"}>{date.toLocaleDateString()}</div>)
            }

            let showUser = i === 0 || message.senderId !== message2.senderId

            dialogTextItems.push(<DialogTextItem key={`message-${message.messageId}`} message={message} showUser={showUser} />)
        }
    }

    updateUnreadMessages(props.chatId)

    return (
        <div className={"p-3 dialog-content"}>
            <div id={'dialog-content'} className={"w-100"}>
                {dialogTextItems}
            </div>
        </div>
    )
}

const messagesStateToProps = (state) => ({
    messages: state.messages
})

const dialogDispatchToProps = {
    getMessages, addMessage, getMessagesBeforeDate
}

export default connect(messagesStateToProps, dialogDispatchToProps)(Dialog)