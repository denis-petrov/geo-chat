import {Card} from 'react-bootstrap'
import '../../assets/css/navigation/Navigation.css'
import {Link} from 'react-router-dom'

const Navigation = () => {
    console.log(window.location.pathname)
    return (
        <Card className={"navigation flex-row p-3"}>
            <Card className={"navigation__item mx-auto block-round"}>
                <Link to="/map">Map</Link>
            </Card>
            <Card className={"navigation__item active mx-auto block-round"}>
                <Link to="/chat">Chat</Link>
            </Card>
            <Card className={"navigation__item mx-auto block-round"}>
                <Link to="/profile">profile</Link>
            </Card>
            <Card className={"navigation__item mx-auto block-round"}>
                <Link to="/settings">Settings</Link>
            </Card>
        </Card>
    )
}


export default Navigation