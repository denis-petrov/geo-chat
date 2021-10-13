import "../../assets/css/Chat.css";
import DialogItem from "./DialogItem";
import Search from "../search/Search";

export default function Chat(props) {
    let items = [];
    for (let i = 0; i < 5; i++) {
        items.push(<DialogItem/>);
    }
    return (
        <>
            <Search/>
            {items}
        </>
    );
}