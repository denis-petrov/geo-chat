import React from 'react'
import {Button} from 'react-bootstrap'
import '../../../assets/css/navigation/Navigation.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";

const ChatSearch = () => {
    return (
        <div className={"p-3 bg-transparent"}>
            <div className="d-flex block-round search">
                <input type="text" placeholder={"Which do you want?"}
                       className={"border-0 py-1 px-3 w-100 rounded-left bg-transparent"}/>
                <div className={"my-1 bg-secondary stick"} />
                <div className="input-group-append">
                    <Button className={"border-0 bg-transparent rounded-right shadow-none"}>
                        <FontAwesomeIcon icon={faLongArrowAltRight} className={"text-dark fa-lg"}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatSearch

