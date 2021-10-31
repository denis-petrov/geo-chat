import '../../assets/css/chat/Chat.css';
import DialogItem from './DialogItem';
import Search from '../search/Search';
import Navigation from '../navigation/Navigation';
import {useLocation} from "react-router";
import Dialog from "./Dialog";
import DialogHeader from "./DialogHeader";
import DialogInput from "./DialogInput";

const Chat = (props) => {
    let items = [];
    for (let i = 0; i < 2; i++) {
        items.push(<DialogItem key={"dialog-item-" + i} id={i} />);
    }

    const search = useLocation().search;
    const chatId = new URLSearchParams(search).get('id');
    if (chatId) {
        return (
            <div className={"chat"}>
                <div className={"chat-wrapper mx-auto"}>
                    <DialogHeader chatId={chatId}/>
                    <Dialog/>
                    <DialogInput/>
                </div>
            </div>
        );
    }

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <Search/>
                <div className={"dialog-items-wrapper"}>
                    {items}
                </div>
                <Navigation/>
            </div>
        </div>
    );
}

export default Chat;