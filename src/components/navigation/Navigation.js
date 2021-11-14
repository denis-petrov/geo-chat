import React from 'react'
import {Card} from 'react-bootstrap'
import '../../assets/css/navigation/Navigation.css'
import {Link} from 'react-router-dom'
import Pages from '../navigation/Pages'
import ChatSearch from './search/ChatSearch'
import MapSearch from './search/MapSearch'
import Add from './control-button/Add'


const Navigation = (props) => {

    const currPage = props.currPage

    let search
    let controlPanel = []
    if (currPage === Pages.CHAT) {
        search = ChatSearch
        controlPanel.push(<Add/>)
    } else if (currPage === Pages.MAP) {
        search = MapSearch
        controlPanel.push(<Add/>)
    }

    return (
        <div className={"navigation__wrapper"}>
            <div className={"navigation__control_panel d-flex align-items-end flex-column"}>
                {controlPanel}
            </div>

            <Card className={"navigation"}>
                {search()}

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

                    <Card className={"navigation__block_item mx-auto" + (currPage === Pages.SETTINGS ? " active" : "")}>
                        <Link to="/settings">
                            <div
                                className={"navigation__block_item_background" + (currPage === Pages.SETTINGS ? " active" : "")}>
                                <img src={"/icons/navigation/settings.png"} alt="Profile"
                                     className={"navigation__block_item_logo center"}/>
                            </div>
                            <p className={"navigation__block_item_name p__center"}>Settings</p>
                        </Link>
                    </Card>
                </Card>
            </Card>
        </div>
    )
}

export default Navigation