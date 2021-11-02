import React from 'react'
import {Card} from 'react-bootstrap'
import '../../assets/css/navigation/Navigation.css'
import {Link} from 'react-router-dom'
import Pages from '../navigation/Pages'

const Navigation = (props) => {

    const currPage = props.currPage
    console.log(currPage)
    return (
        <Card className={"navigation"}>
            <Card className={"navigation__search" }>{/*m-auto mt-3 mb-2*/}
                <input type="text" placeholder={"Where we go?"} className={"navigation__search_input"}/>
            </Card>
            <Card className={"navigation__block flex-row p-2 mb-2"}>
                <Card className={"navigation__block_item mx-auto" + (currPage === Pages.MAP ? " active": "")}>
                    <Link to="/map">Map</Link>
                </Card>
                <Card className={"navigation__block_item mx-auto" + (currPage === Pages.CHAT? " active": "")}>
                    <Link to="/chat">Chat</Link>
                </Card>
                <Card className={"navigation__block_item mx-auto" + (currPage === Pages.PROFILE? " active": "")}>
                    <Link to="/profile">profile</Link>
                </Card>
                <Card className={"navigation__block_item mx-auto" + (currPage === Pages.SETTINGS? " active": "")}>
                    <Link to="/settings">Settings</Link>
                </Card>
            </Card>
        </Card>
    )
}

export default Navigation