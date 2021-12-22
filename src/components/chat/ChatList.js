import React, {useEffect, useState} from 'react'
import '../../assets/css/chat/Chat.css'
import DialogItem from './DialogItem'
import Navigation from '../navigation/Navigation'
import {connect} from "react-redux"
import {getChats} from "../../store/actions/chat/getChats"
import {addChat} from "../../store/actions/chat/addChat"
import Add from "../navigation/control-button/Add"
import Pages from "../navigation/Pages"
import ChatSearch from "../navigation/search/ChatSearch"
import {getMessages} from "../../store/actions/chat/getMessages"
import {addMemberToChat} from "../../store/actions/chat/addMemberToChat"
import {getCurrentUser} from "../../utils/getCurrentUser"
import {Modal} from "react-bootstrap";
import {addMemberByInvite} from "../../store/actions/chat/addMemberByInvite";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/free-solid-svg-icons";

const ChatList = (props) => {

    const [isShowModal, setShowModal] = useState(false)
    const [createChatModal, setCreateChatModal] = useState(false)

    useEffect(() => {
        let user = getCurrentUser()
        props.getChats(user.userId)
    }, [props.chats.inviteStatus])

    const newChat = (chatName) => {
        console.log(chatName)
        props.addChat(chatName)
            .then((newChatId) => {
            if (newChatId) {
                let user = getCurrentUser();
                props.addMemberToChat(user.userId, newChatId);
                window.location.assign(window.location.origin + '/chat/' + newChatId);
            }
        })
    }

    const addMemberByInvite = () => {
        let input = document.getElementById('invite-token-field')
        let token = input.value
        let user = getCurrentUser()
        props.addMemberByInvite(token, user.userId)
        input.value = ''
    }

    let items = props.chats.chats
    let dialogItems = []
    if (items) {
        for (let key in items) {
            let chat = items[key]
            dialogItems.push(<DialogItem key={"dialog-item-" + chat.chatId} chatId={"" + chat.chatId}/>)
        }
        dialogItems.reverse();
    }

    if (dialogItems.length === 0) {
        dialogItems.push(<h5 key={'empty'} className={"text-light text-center p-5"}>Chat list is empty</h5>)
    }

    const controlPanel = [<Add key={"Add"} onClick={() => {
        setCreateChatModal(true)
    }} />]

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                    <div>Chats</div>
                    <FontAwesomeIcon icon={faPlus} className={"text-light my-auto ms-auto"} onClick={() => {
                        setShowModal(true)
                    }}/>
                </div>
                <div className={"dialog-items-wrapper"}>
                    {dialogItems}
                </div>
                <Navigation currPage={Pages.CHAT} controlPanel={controlPanel} search={<ChatSearch/>}/>
            </div>

            <Modal show={isShowModal}>
                <div className={"chat"}>
                    <div className={"chat-wrapper mx-auto"}>

                        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                            <div className={"w-100"}>Find Chat</div>
                            <FontAwesomeIcon icon={faTimes} className={"my-auto"} onClick={() => {
                                setShowModal(false)
                            }}/>
                        </div>

                        <div className={"dialog-items-wrapper p-3"}>
                            <div className="input-group mb-3">
                                <input id="invite-token-field" type="text" className="form-control" placeholder="Invite token"
                                       aria-label="Invite token" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button id={"add-friend"} className="btn btn-primary" type="button" onClick={() => {
                                        addMemberByInvite()
                                    }}>Find
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal show={createChatModal}>
                <div className={"chat"}>
                    <div className={"chat-wrapper mx-auto"}>

                        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                            <div className={"w-100"}>Create Chat</div>
                            <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto ms-3"} onClick={() => {
                                setCreateChatModal(false)
                            }}/>
                        </div>

                        <div className={"dialog-items-wrapper p-3"}>
                            <div className={"text-light py-2friend-list-content"}>
                                <div className="input-group mb-3">
                                    <input id="chat-name" type="text" className="form-control" placeholder="Chat Name"
                                           aria-label="Chat Name" aria-describedby="basic-addon2"/>
                                    <div className="input-group-append">
                                        <button id={"create-chat"} className="btn btn-primary" type="button" onClick={() => {
                                            let chatName = document.getElementById('chat-name').value.trim()
                                            if (chatName.length > 0) {
                                                newChat(chatName)
                                            }
                                        }}>Create Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const chatListStateToProps = (state) => ({
    chats: state.chats
})

const chatListDispatchToProps = {
    getChats, addChat, getMessages, addMemberToChat, addMemberByInvite
}

export default connect(chatListStateToProps, chatListDispatchToProps)(ChatList);