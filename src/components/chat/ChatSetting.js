import React, {useEffect, useState} from 'react'
import '../../assets/css/chat/Chat.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faCheck, faCopy, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
import {getChatInfo} from '../../store/actions/chat/getChatInfo'
import {updateChatName} from '../../store/actions/chat/updateChatName'
import {removeChat} from '../../store/actions/chat/removeChat'
import {removeMember} from '../../store/actions/chat/removeMember'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {Modal} from 'react-bootstrap'
import {getFriends} from '../../store/actions/friend/getFriends'
import {addMemberToChat} from '../../store/actions/chat/addMemberToChat'
import {getUserInfo} from '../../store/actions/user/getUserInfo'
import {getChatInvite} from '../../store/actions/chat/getChatInvite'

const ChatSetting = (props) => {

    const [isShowModal, setShowModal] = useState(false)

    useEffect(() => {
        props.getChatInfo(props.chatId)
        let user = getCurrentUser()
        props.getFriends(user.userId)
        props.getChatInvite(props.chatId)

        document.title = props.chats.chatInfo.name
    }, [])

    const changeChatData = () => {
        let chatNameBlock = document.getElementById('chat-name')
        if (chatNameBlock) {
            props.updateChatName(props.chatId, chatNameBlock.textContent)
        }
    }

    const addFriendToChat = (friendId) => {
        props.addMemberToChat(friendId, props.chatId)
    }

    const removeUserFromChat = (userId) => {
        props.removeMember(userId, props.chatId)
    }

    const getChatMembers = (chat) => {
        let members = []
        for (let key in chat.members) {
            let member = chat.members[key]
            let users = JSON.parse(window.localStorage.getItem('users'))
            if (!users) {
                users = {}
            }

            const user = getCurrentUser()

            let userName = users[member]
            members.push(
                <div className={"py-1 d-flex"} id={`chat-member-${member}`} key={`chat-member-${member}`}>
                    <div>{userName}</div>
                    {user.userId === chat.adminId && member !== user.userId &&
                    <FontAwesomeIcon icon={faTimes} className={"my-auto fa-lg ms-auto"} onClick={() => {
                        document.getElementById(`chat-member-${member}`).remove()
                        removeUserFromChat(member)
                    }}/>
                    }
                </div>
            )
            if (!userName) {
                props.getUserInfo(member)
            }
        }

        return members
    }

    let chat
    let members
    if (props.chats.chatInfo) {
        chat = props.chats.chatInfo
        members = getChatMembers(chat)
    }

    let stateFriends = props.friends.friends
    let friends = []

    if (stateFriends) {
        for (let key in stateFriends) {
            let friend = stateFriends[key]
            friends.push(<div id={`friend-${friend.userId}`} key={`friend-${friend.userId}`}
                              className={"text-light d-flex"}>
                <span className={"w-100"}>{friend.name}</span>
                <FontAwesomeIcon icon={faPlus} className={"my-auto"} onClick={() => {
                    addFriendToChat(friend.userId)
                }}/>
            </div>)
        }
    }

    if (friends.length === 0) {
        friends.push(<div key={'empty'} className={"text-light"}>Friend list is empty</div>)
    }

    let inviteToken = props.chats.inviteToken ? props.chats.inviteToken : ''

    const user = getCurrentUser()

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                    <Link to={'/chat/' + props.chatId}>
                        <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"}/>
                    </Link>
                    <div>Chat</div>
                    <div id={'save-chat-data'} className={"ms-auto"} onClick={changeChatData}>
                        <FontAwesomeIcon icon={faCheck} className={"text-light my-auto me-0"}/>
                    </div>
                </div>

                <div className={"m-3"}>
                    <div>
                        <div className="input-group mb-3">
                            <div className="block-round-small bg-light w-100 p-2">
                                <div id={"chat-name"} contentEditable={true} suppressContentEditableWarning={true}
                                     data-placeholder="Chat name"
                                     className={"py-1 px-3 w-100 bg-transparent dialog-input"}>
                                    {chat ? chat.name : 'default chat name'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"pb-2 border-bottom"}>
                        <Link to={'/chat'} className={"d-block mb-2"}>
                            <button id={"leave-chat"} type="button" className="btn btn-danger" onClick={() => {
                                removeUserFromChat(user.userId)
                            }}>Leave Chat
                            </button>
                        </Link>

                        <button id={"add-member"} type="button" className="btn btn-primary"
                                onClick={() => setShowModal(true)}>
                            Add Member
                        </button>
                    </div>

                    {(chat && user.userId === chat.adminId) &&
                    <div className={"text-light py-3 border-bottom"}>
                        <h5>Invite Token:</h5>
                        <div className={"d-flex"}>
                            <input className={"token-field w-100"} readOnly={true} type={"text"} id="invite-token"
                                   value={inviteToken}/>
                            <FontAwesomeIcon icon={faCopy} className={"text-light"} onClick={() => {
                                var token = document.getElementById("invite-token")
                                token.select()
                                document.execCommand("copy")
                            }}/>
                        </div>
                    </div>
                    }

                    <div className={"members-block py-3"}>
                        <h5>{members ? members.length : ''} Members</h5>
                        <div>
                            {members}
                        </div>
                    </div>
                </div>

            </div>

            <Modal show={isShowModal}>
                <div className={"chat"}>
                    <div className={"chat-wrapper mx-auto"}>

                        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                            <div className={"w-100"}>Add Member</div>
                            <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto ms-3"} onClick={() => {
                                setShowModal(false)
                            }}/>
                        </div>

                        <div className={"dialog-items-wrapper p-3"}>
                            <div className={"text-light py-2"}>
                                <h4>Friends</h4>
                                <div className={"friend-list-content"}>
                                    {friends}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const chatSettingStateToProps = (state) => ({
    chats: state.chats,
    friends: state.friends,
    user: state.user
})

const chatSettingDispatchToProps = {
    getChatInfo, updateChatName, removeChat, removeMember, getFriends, addMemberToChat, getUserInfo, getChatInvite
}

export default connect(chatSettingStateToProps, chatSettingDispatchToProps)(ChatSetting)