import React, {useEffect} from 'react'
import "../../assets/css/chat/Chat.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons"
import {connect} from "react-redux"
import {addMessage} from "../../store/actions/chat/addMessage"
import {getChatInfo} from "../../store/actions/chat/getChatInfo"
import {getUserInfo} from "../../store/actions/user/getUserInfo"
import {getCurrentUser} from "../../utils/getCurrentUser"
import {getMessages} from "../../store/actions/chat/getMessages"

const DialogInput = (props) => {

    useEffect(() => {
        const MAX_LEN = 1000
        let input = document.getElementById("dialog-input")
        input.addEventListener('input', event => {
            if (input.innerHTML.length > MAX_LEN) {
                input.innerHTML = input.innerHTML.substr(0, MAX_LEN)
            }
        })
    }, [])

    const addMessage = (e) => {
        let msgInput = document.getElementsByClassName('dialog-input')[0]
        let text = msgInput.textContent.trim()
        if (text.length) {
            let user = getCurrentUser()
            console.log(props)
            props.addMessage(props.chatId, user.userId, text)
        }

        msgInput.textContent = ""
    }

    return (
        <div className={"px-3 py-4 bg-transparent"}>
            <div className="d-flex">
                <div className="block-round-small bg-light w-100 p-2">
                    <div id={"dialog-input"} contentEditable={true} data-placeholder="Message"
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

const dialogInputStateToProps = (state) => ({
    user: state.user
})

const dialogInputDispatchToProps = {
    addMessage, getChatInfo, getUserInfo, getMessages
}

export default connect(dialogInputStateToProps, dialogInputDispatchToProps)(DialogInput)