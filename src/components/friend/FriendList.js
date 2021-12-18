import React, {Component} from 'react'
import '../../assets/css/chat/Chat.css'
import '../../assets/css/friend/Friend.css'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import Pages from '../navigation/Pages'
import ChatSearch from '../navigation/search/ChatSearch'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {getFriends} from '../../store/actions/friend/getFriends'
import {addFriend} from '../../store/actions/friend/addFriend'
import {removeFriend} from "../../store/actions/friend/removeFriend";

class FriendList extends Component {

    componentDidMount() {
        let user = getCurrentUser()
        this.props.getFriends(user.userId)
    }

    addFriend() {
        let input = document.getElementById('add-friend-field')
        let friendId = input.value
        let user = getCurrentUser()
        this.props.addFriend(user.userId, friendId)
        input.value = ''
    }

    removeFriend(friendId) {
        let user = getCurrentUser()
        this.props.removeFriend(user.userId, friendId)
        document.getElementById(`friend-${friendId}`).remove()
    }

    render() {
        let stateFriends = this.props.friends.friends
        let friends = []

        if (stateFriends) {
            for (let key in stateFriends) {
                let friend = stateFriends[key]
                friends.push(<div id={`friend-${friend.userId}`} key={`friend-${friend.userId}`} className={"text-light d-flex"}>
                    <span className={"w-100"}>{friend.name}</span>
                    <button className="btn-primary" type="button" onClick={() => {
                        this.removeFriend(friend.userId)
                    }}>x
                    </button>
                </div>)
            }
        }

        if (friends.length === 0) {
            friends.push(<div key={'empty'} className={"text-light"}>Friend list is empty</div>)
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
                                        this.addFriend()
                                    }}>Add friend
                                    </button>
                                </div>
                        </div>

                        <div className={"text-light py-2"}>
                            <h4>Friends</h4>
                            <div className={"friend-list-content"}>
                                {friends}
                            </div>
                        </div>
                    </div>

                    <Navigation currPage={Pages.PROFILE} controlPanel={[]} search={<ChatSearch/>}/>
                </div>
            </div>
        )
    }
}

const friendListStateToProps = (state) => ({
    friends: state.friends
})

const friendListDispatchToProps = {
    getFriends, addFriend, removeFriend
}

export default connect(friendListStateToProps, friendListDispatchToProps)(FriendList)