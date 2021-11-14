import React from 'react'
import "../../assets/css/chat/Chat.css";
import DialogItem from "./DialogItem";
import Search from "../search/Search";
import Navigation from "../navigation/Navigation";
import Pages from '../navigation/Pages'

const Chat = (props) => {
    let items = [];
    for (let i = 0; i < 12; i++) {
        items.push(<DialogItem/>);
    }

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <Search/>
                <div className={"dialog-items-wrapper"}>
                    {items}
                </div>
                <Navigation currPage={Pages.CHAT}/>
            </div>
        </div>
    );
}

export default Chat;