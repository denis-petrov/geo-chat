import "../../assets/css/chat/Chat.css";

const DialogTextItem = (props) => {
    const yourMsgClass = "is-out";
    console.log(props);
    let isYourMsg = props.user.userId === props.message.sender;
    let message = props.message;

    let date = new Date(message.sentDate);

    return (
        <div className={`my-2 d-flex ${isYourMsg ? yourMsgClass : ""}`}>
            <div className={"message-text px-3 p-2 rounded-3"}>
                {message.message}
                <span className={"msg-time"}>{`${date.getHours()}:${date.getMinutes()}`}</span>
            </div>
        </div>
    )
};

export default DialogTextItem;