import "../../assets/css/chat/Chat.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowCircleRight} from "@fortawesome/free-solid-svg-icons";

const DialogInput = (props) => {
    function addMessage(e) {
        let msgInput = document.getElementsByClassName('dialog-input')[0];
        if (msgInput.textContent.length) {
            console.log('added msg');
        }

        msgInput.textContent = "";
    }

    return (
        <div className={"px-3 py-4 bg-transparent"}>
            <div className="d-flex">
                <div className="block-round-small bg-light w-100">
                    <div contentEditable={true} data-placeholder="Message"
                         className={"py-1 px-3 w-100 bg-transparent dialog-input"}/>
                </div>
                <div className={"d-flex flex-column-reverse"}>
                    <FontAwesomeIcon icon={faArrowCircleRight} className={"text-light fa-3x ms-2"}
                                     onClick={(e) => addMessage(e)}/>
                </div>
            </div>
        </div>
    )
};

export default DialogInput;