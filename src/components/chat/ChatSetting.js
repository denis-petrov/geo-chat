import React, {Component} from 'react';
import '../../assets/css/chat/Chat.css';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCheck, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {updateChatName} from "../../store/actions/chat/updateChatName";
import {removeChat} from "../../store/actions/chat/removeChat";
import {removeMember} from "../../store/actions/chat/removeMember";
import {getCurrentUser} from "../../utils/getCurrentUser";
import {Modal} from "react-bootstrap";
import {getFriends} from "../../store/actions/friend/getFriends";
import {addMemberToChat} from "../../store/actions/chat/addMemberToChat";

class ChatSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {showModal: false}
    }

    componentDidMount() {
        this.props.getChatInfo(this.props.chatId).then(() => {
            // get chat members info
            //this.props.getUsersByIds(this.props.chats.chatInfo.members);
        })
        let user = getCurrentUser()
        this.props.getFriends(user.userId)
    }

    leaveFromChat() {
        let user = getCurrentUser()
        this.props.removeMember(user.userId, this.props.chatId)
    }

    changeChatData() {
        console.log(this.props)
        let chatNameBlock = document.getElementById('chat-name')
        if (chatNameBlock) {
            this.props.updateChatName(this.props.chatId, chatNameBlock.textContent)
        }
    }

    addFriendToChat(friendId) {
        this.props.addMemberToChat(friendId, this.props.chatId)
    }

    render() {
        let chat
        let members
        if (this.props.chats.chatInfo) {
            chat = this.props.chats.chatInfo;
            members = chat.members;
        }

        let stateFriends = this.props.friends.friends
        let friends = []

        if (stateFriends) {
            for (let key in stateFriends) {
                let friend = stateFriends[key]
                friends.push(<div id={`friend-${friend.userId}`} key={`friend-${friend.userId}`} className={"text-light d-flex"}>
                    <span className={"w-100"}>{friend.name}</span>
                    <button className="btn-primary" type="button" onClick={() => {
                        this.addFriendToChat(friend.userId)
                    }}>+
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
                        <Link to={'/chat/' + this.props.chatId}>
                            <FontAwesomeIcon icon={faArrowLeft} className={"text-light my-auto me-4"} />
                        </Link>
                        <div>Chat</div>
                        <div id={'save-chat-data'} className={"ms-auto"} onClick={this.changeChatData.bind(this)}>
                            <FontAwesomeIcon icon={faCheck} className={"text-light my-auto me-0"} />
                        </div>
                    </div>

                    <div className={"m-3"}>
                        <div>
                            <img alt="anime girl" className={"profile-picture medium rounded-circle m-auto"}
                                 src="https://avatars.mds.yandex.net/get-zen_doc/1911932/pub_5d6370bcac412400aeb2c040_5d884d0d6d29c100adddaf85/scale_1200"/>
                            <div className="input-group mb-3">
                                <div className="block-round-small bg-light w-100 p-2">
                                    <div id={"chat-name"} contentEditable={true} data-placeholder="Chat name"
                                         className={"py-1 px-3 w-100 bg-transparent dialog-input"}>
                                        {chat ? chat.name : 'default chat name'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div onClick={() => {this.leaveFromChat()}}>
                                <Link to={'/chat'}>
                                    <button id={"leave-chat"} type="button" className="btn btn-danger">Leave Chat</button>
                                </Link>
                            </div>
                            {/*<div onClick={() => {this.props.removeChat(this.props.chatId)}}>
                                <Link to={'/chat'}>
                                    <button id={"remove-chat"} type="button" className="btn btn-danger">Remove Chat</button>
                                </Link>
                            </div>*/}
                        </div>

                        <div className={"members-block"}>
                            <div>{members ? members.length : ''} Members</div>
                            <button id={"add-member"} type="button" className="btn btn-primary" onClick={() => {
                                this.setState({showModal: true})
                            }}>
                                Add Member
                            </button>

                            <div>
                                {members}
                            </div>
                        </div>
                    </div>

                </div>

                <Modal show={this.state.showModal}>
                    <div className={"chat"}>
                        <div className={"chat-wrapper mx-auto"}>

                            <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                                <div className={"w-100"}>Add Member</div>
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.setState({showModal: false})
                                }}>
                                    x
                                </button>
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
        );
    }
}

const chatSettingStateToProps = (state) => ({
    chats: state.chats,
    friends: state.friends
})

const chatSettingDispatchToProps = {
    getChatInfo, updateChatName, removeChat, removeMember, getFriends, addMemberToChat
}

export default connect(chatSettingStateToProps, chatSettingDispatchToProps)(ChatSetting);