import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import '../../assets/css/chat/Chat.css';
import {connect} from "react-redux";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {getMessages} from "../../store/actions/chat/getMessages";
import {Link} from "react-router-dom";

class DialogItem extends Component {

    componentDidMount() {
        console.log(this.props);
        this.props.getMessages(this.props.chatId, 1);
        console.log(this.props);
        if (this.messages !== undefined && this.messages.length > 0) {
            let lastSender = this.messages[0].sender;
            this.props.getUserInfo(lastSender);
        }
    }

    render() {
        return (
            <Link to={'/chat/1'}>
                <Card className={"block-round chat-item text-white flex-row px-3 py-2 mb-1"}>
                    <img alt="anime girl" className={"profile-picture medium rounded-circle m-auto"}
                         src="https://avatars.mds.yandex.net/get-zen_doc/1911932/pub_5d6370bcac412400aeb2c040_5d884d0d6d29c100adddaf85/scale_1200"/>
                    <Card.Body className={"py-0 text-truncate"}>
                        <Card.Title className={"chat-item-title"}>Card Title</Card.Title>
                        <div className={"text-truncate d-flex chat-item-text"}>
                            <img alt="dead inside" className={"profile-picture small rounded-circle"}
                                 src="https://memepedia.ru/wp-content/uploads/2019/08/ded-insayd-5-768x768.jpg"/>
                            <Card.Text className={"text-truncate ms-2"}>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        )
    }
}

const dialogItemStateToProps = (state) => ({
    messages: state.messages,
    test: state
})

const dialogItemDispatchToProps = {
    getUserInfo, getMessages
}

export default connect(dialogItemStateToProps, dialogItemDispatchToProps)(DialogItem);