import React, {useEffect, useState} from 'react'
import '../../assets/css/chat/Chat.css'
import '../../assets/css/friend/Friend.css'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import Pages from '../navigation/Pages'
import ChatSearch from '../navigation/search/ChatSearch'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {getFriends} from '../../store/actions/friend/getFriends'
import {removeFriend} from '../../store/actions/friend/removeFriend'
import {inviteFriend} from '../../store/actions/friend/inviteFriend'
import {Modal} from 'react-bootstrap'
import {getInvites} from '../../store/actions/friend/getInvites'
import {acceptInvite} from '../../store/actions/friend/acceptInvite'
import {rejectInvite} from '../../store/actions/friend/rejectInvite'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle, faTimes} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"


const FriendList = (props) => {
    const [modalShow, setModalShow] = useState(false)

    const user = getCurrentUser()

    useEffect(() => {
        document.title = "Friends"
        props.getFriends(user.userId)
        props.getInvites(user.userId)
    }, [props.friends.requestStatus])

    const removeFriend = (friendId) => {
        props.removeFriend(user.userId, friendId)
    }

    const removeFriendItem = (friendId) => {
        document.getElementById(`friend-${friendId}`).remove()
    }

    const friends = []
    const invites = []

    const stateFriends = props.friends.friends
    if (stateFriends) {
        stateFriends.forEach(friend =>
            friends.push(
                <div id={`friend-${friend.userId}`} key={`friend-${friend.userId}`}
                     className={"text-light d-flex py-1"}>
                    <span className={"w-100 name-field"}>{friend.name}</span>
                    <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto"} onClick={() => {
                        removeFriendItem(friend.userId)
                        removeFriend(friend.userId)
                    }}/>
                </div>
            )
        )
    }

    if (friends.length === 0) {
        friends.push(<div key={'empty'} className={"text-light"}>You do not have friends</div>)
    }

    const stateInvites = props.friends.invites
    if (stateInvites) {
        stateInvites.forEach(invite =>
            invites.push(
                <div id={`friend-${invite.userId}`} key={`friend-${invite.userId}`}
                     className={"text-light d-flex py-1"}>
                    <span className={"w-100 name-field"}>{invite.name}</span>
                    <FontAwesomeIcon icon={faCheckCircle} className={"fa-lg my-auto"} onClick={() => {
                        removeFriendItem(invite.userId)
                        props.acceptInvite(user.userId, invite.userId)
                    }}/>
                    <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto ms-3"} onClick={() => {
                        removeFriendItem(invite.userId)
                        props.rejectInvite(user.userId, invite.userId)
                    }}/>
                </div>
            )
        )
    }

    if (invites.length === 0) {
        invites.push(<div key={'empty'} className={"text-light"}>Invite list is empty</div>)
    }

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"dialog-items-wrapper p-3"}>

                    <div className={"d-flex"}>
                        <Link to={'/find-friends'} className={"d-block"}>
                            <button id={"find-friends"} type="button" className="btn btn-primary my-2"
                                    onClick={() => setModalShow(true)}>Find Users
                            </button>
                        </Link>
                        <button id={"friend-invites"} type="button" className="btn btn-primary my-2 ms-auto"
                                onClick={() => setModalShow(true)}>Invites
                        </button>
                    </div>

                    <div className={"text-light py-2"}>
                        <h4>Friends</h4>
                        <div className={"friend-list-content"}>
                            {friends}
                        </div>
                    </div>
                </div>

                <Navigation currPage={Pages.FRIENDS} controlPanel={[]} search={<ChatSearch/>}/>
            </div>

            <Modal show={modalShow} centered>
                <div className={"chat"}>
                    <div className={"chat-wrapper mx-auto"}>

                        <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                            <div className={"w-100"}>Friend Invites</div>
                            <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto ms-3"} onClick={() => {
                                setModalShow(false)
                            }}/>
                        </div>

                        <div className={"dialog-items-wrapper p-3"}>
                            <div className={"text-light py-2friend-list-content"}>
                                {invites}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const friendListStateToProps = (state) => ({
    friends: state.friends
})

const friendListDispatchToProps = {
    getFriends, inviteFriend, removeFriend, getInvites, acceptInvite, rejectInvite
}

export default connect(friendListStateToProps, friendListDispatchToProps)(FriendList)