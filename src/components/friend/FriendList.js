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

const FriendList = (props) => {

    const [modalShow, setModalShow] = useState(false)

    useEffect(() => {
        document.title = "Friends"
        let user = getCurrentUser()
        props.getFriends(user.userId)
        props.getInvites(user.userId)
    }, [props.friends.requestStatus])

    const addFriend = () => {
        let input = document.getElementById('add-friend-field')
        let friendId = input.value
        let user = getCurrentUser()
        props.inviteFriend(user.userId, friendId)
        input.value = ''
    }

    const removeFriend = (friendId) => {
        let user = getCurrentUser()
        props.removeFriend(user.userId, friendId)
        document.getElementById(`friend-${friendId}`).remove()
    }

    const removeFriendItem = (friendId) => {
        document.getElementById(`friend-${friendId}`).remove()
    }

    let stateFriends = props.friends.friends
    let friends = []

    if (stateFriends) {
        for (let key in stateFriends) {
            let friend = stateFriends[key]
            friends.push(<div id={`friend-${friend.userId}`} key={`friend-${friend.userId}`} className={"text-light d-flex py-1"}>
                <span className={"w-100 name-field"}>{friend.name}</span>
                <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto"} onClick={() => {
                    removeFriendItem(friend.userId)
                    removeFriend(friend.userId)
                }}/>
            </div>)
        }
    }

    if (friends.length === 0) {
        friends.push(<div key={'empty'} className={"text-light"}>Friend list is empty</div>)
    }

    let invites = []

    let stateInvites = props.friends.invites
    if (stateInvites) {
        let user = getCurrentUser()
        for (let key in stateInvites) {
            let invite = stateInvites[key]
            invites.push(<div id={`friend-${invite.userId}`} key={`friend-${invite.userId}`} className={"text-light d-flex py-1"}>
                <span className={"w-100 name-field"}>{invite.name}</span>
                <FontAwesomeIcon icon={faCheckCircle} className={"fa-lg my-auto"} onClick={() => {
                    removeFriendItem(invite.userId)
                    props.acceptInvite(user.userId, invite.userId)
                }}/>
                <FontAwesomeIcon icon={faTimes} className={"fa-lg my-auto ms-3"} onClick={() => {
                    removeFriendItem(invite.userId)
                    props.rejectInvite(user.userId, invite.userId)
                }}/>
            </div>)
        }
    }

    if (invites.length === 0) {
        invites.push(<div key={'empty'} className={"text-light"}>Invite list is empty</div>)
    }

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                    Friends
                </div>

                <div className={"dialog-items-wrapper p-3"}>

                    <div className="input-group mb-3">
                        <input id="add-friend-field" type="text" className="form-control" placeholder="User id"
                               aria-label="User id" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <button id={"add-friend"} className="btn btn-primary" type="button" onClick={() => {
                                    addFriend()
                                }}>Add friend
                                </button>
                            </div>
                    </div>

                    <button id={"friend-invites"} type="button" className="btn btn-primary my-2"
                            onClick={() => setModalShow(true)}>Friend Invites
                    </button>

                    <div className={"text-light py-2"}>
                        <h4>Friends</h4>
                        <div className={"friend-list-content"}>
                            {friends}
                        </div>
                    </div>
                </div>

                <Navigation currPage={Pages.FRIENDS} controlPanel={[]} search={<ChatSearch/>}/>
            </div>

            <Modal show={modalShow}>
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