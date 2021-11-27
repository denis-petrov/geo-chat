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

class ChatSetting extends Component {

    componentDidMount() {
        this.props.getChatInfo(this.props.chatId).then(() => {
            // get chat members info
            //this.props.getUsersByIds(this.props.chats.chatInfo.members);
        });
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

    render() {
        console.log(this.props)
        let chat
        let members
        if (this.props.chats.chatInfo) {
            chat = this.props.chats.chatInfo;
            members = chat.members;
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
                            <div onClick={() => {this.props.removeChat(this.props.chatId)}}>
                                <Link to={'/chat'}>
                                    <button id={"remove-chat"} type="button" className="btn btn-danger">Remove Chat</button>
                                </Link>
                            </div>
                        </div>

                        <div className={"members-block"}>
                            <div>{members ? members.length : ''} Members</div>
                            <button id={"add-member"} type="button" className="btn btn-primary">Add Member</button>
                            <div>
                                {members}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const chatSettingStateToProps = (state) => ({
    chats: state.chats,
})

const chatSettingDispatchToProps = {
    getChatInfo, updateChatName, removeChat, removeMember
}

export default connect(chatSettingStateToProps, chatSettingDispatchToProps)(ChatSetting);