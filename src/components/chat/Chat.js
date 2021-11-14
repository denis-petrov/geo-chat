import React from 'react'
import "../../assets/css/chat/Chat.css";
import DialogItem from "./DialogItem";
import Search from "../search/Search";
import Navigation from "../navigation/Navigation";
import Pages from '../navigation/Pages'
import Add from '../navigation/control-button/Add'
import ChatSearch from '../navigation/search/ChatSearch'

const Chat = (props) => {
    let items = [];
    for (let i = 0; i < 12; i++) {
        items.push(<DialogItem/>);
    }

    const controlPanel = [<Add key={"Add"}/>]

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <Search/>
                <div className={"dialog-items-wrapper"}>
                    {items}
                </div>
                <Navigation currPage={Pages.CHAT} controlPanel={controlPanel} search={ChatSearch}/>
            </div>
        </div>
    );
}

export default Chat;