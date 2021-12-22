import React from 'react'
import {Card} from 'react-bootstrap'
import '../../assets/css/navigation/Navigation.css'
import {Link} from 'react-router-dom'
import Pages from '../navigation/Pages'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";


const Navigation = (props) => {
    const currPage = props.currPage

    const search = props.search
    const controlPanel = props.controlPanel

    let chatMessages = JSON.parse(window.localStorage.getItem('chatMessages'))
    if (!chatMessages) {
        chatMessages = {}
    }

    let unreadMessages = ''
    if (Object.keys(chatMessages).length > 0) {
        unreadMessages = <FontAwesomeIcon icon={faCircle} className={"text-primary fa-xs unread-msg-point"}/>
    }

    return (
        <div className={"navigation__wrapper"}>
            <div className={"navigation__control_panel d-flex align-items-end flex-column"}>
                {controlPanel}
            </div>

            <Card className={"navigation"}>
                {search}

                <Card className={"navigation__block flex-row p-2 mb-2"}>

                    <Card className={"navigation__block_item mx-auto"}>
                        <Link to="/map">
                            <div
                                className={"navigation__block_item_background" + (currPage === Pages.MAP ? " active" : "")}>
                                <img src={"/icons/navigation/map.png"} alt="Map"
                                     className={"navigation__block_item_logo center"}/>
                            </div>
                            <p className={"navigation__block_item_name p__center"}>Map</p>
                        </Link>
                    </Card>

                    <Card className={"navigation__block_item mx-auto"}>
                        <Link to="/chat">
                            <div
                                className={"navigation__block_item_background" + (currPage === Pages.CHAT ? " active" : "")}>
                                <img src={"/icons/navigation/chat.png"} alt="Chat"
                                     className={"navigation__block_item_logo center"}/>
                            </div>
                            <p className={"navigation__block_item_name p__center"}>Chat</p>
                            {unreadMessages}
                        </Link>
                    </Card>

                    <Card className={"navigation__block_item mx-auto"}>
                        <Link to="/profile">
                            <div
                                className={"navigation__block_item_background" + (currPage === Pages.PROFILE ? " active" : "")}>
                                <img src={"/icons/navigation/profile.png"} alt="Profile"
                                     className={"navigation__block_item_logo center"}/>
                            </div>
                            <p className={"navigation__block_item_name p__center"}>Profile</p>
                        </Link>
                    </Card>

                    <Card className={"navigation__block_item mx-auto" + (currPage === Pages.FRIENDS ? " active" : "")}>
                        <Link to="/friends">
                            <div
                                className={"navigation__block_item_background" + (currPage === Pages.FRIENDS ? " active" : "")}>
                                <img src={"/icons/navigation/settings.png"} alt="Profile"
                                     className={"navigation__block_item_logo center"}/>
                            </div>
                            <p className={"navigation__block_item_name p__center"}>Friends</p>
                        </Link>
                    </Card>
                </Card>
            </Card>
        </div>
    )
}

export default Navigation