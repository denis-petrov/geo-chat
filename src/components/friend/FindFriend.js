import React, {useEffect} from 'react'
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
import {getInvites} from '../../store/actions/friend/getInvites'
import {acceptInvite} from '../../store/actions/friend/acceptInvite'
import {rejectInvite} from '../../store/actions/friend/rejectInvite'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {getUsersByName} from "../../store/actions/user/getUsersByName";

const FindFriend = (props) => {

    useEffect(() => {
        document.title = "Find Friends"
    }, [])

    const searchFriend = () => {
        const field = document.getElementById("search-friend-field");
        const name = field.value.trim()
        const user = getCurrentUser()
        props.getUsersByName(user.userId, name)
    }

    const addFriend = (userId) => {
        let user = getCurrentUser()
        props.inviteFriend(user.userId, userId)
    }

    let stateUsers = props.user.users
    let users = []

    if (stateUsers) {
        for (let key in stateUsers) {
            let user = stateUsers[key]
            users.push(<div id={`friend-${user.userId}`} key={`friend-${user.userId}`}
                            className={"text-light d-flex py-1"}>
                <span className={"w-100 name-field"}>{user.name}</span>
                <FontAwesomeIcon id={`user-${user.userId}`} icon={faPlus} className={"fa-lg my-auto"} onClick={(e) => {
                    addFriend(user.userId)
                    document.getElementById(`user-${user.userId}`).remove()
                }}/>
            </div>)
        }
    }

    if (users.length === 0) {
        users.push(<div key={'empty'} className={"text-light"}>User list is empty</div>)
    }

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                    Find Friends
                </div>

                <div className={"dialog-items-wrapper p-3"}>

                    <div className="input-group mb-3">
                        <input id="search-friend-field" type="text" className="form-control" placeholder="User Name"
                               aria-label="User Name" aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button id={"search-friend"} className="btn btn-primary" type="button" onClick={() => {
                                searchFriend()
                            }}>Search
                            </button>
                        </div>
                    </div>

                    <div className={"text-light py-2"}>
                        <h4>Users</h4>
                        <div className={"friend-list-content"}>
                            {users}
                        </div>
                    </div>
                </div>

                <Navigation currPage={Pages.FRIENDS} controlPanel={[]} search={<ChatSearch/>}/>
            </div>
        </div>
    )
}

const findFriendStateToProps = (state) => ({
    user: state.user
})

const findFriendDispatchToProps = {
    getFriends, inviteFriend, removeFriend, getInvites, acceptInvite, rejectInvite, getUsersByName
}

export default connect(findFriendStateToProps, findFriendDispatchToProps)(FindFriend)