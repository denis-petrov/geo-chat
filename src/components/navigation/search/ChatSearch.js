import React from 'react'
import {Button} from 'react-bootstrap'
import '../../../assets/css/navigation/Navigation.css'

const ChatSearch = () => {
    return (
        <div className={"px-3 py-4 bg-transparent"}>
            <div className="d-flex block-round search">
                <input type="text" placeholder={"Which do you want?"}
                       className={"border-0 py-1 px-3 w-100 rounded-left bg-transparent"}/>
                <div className={"my-1 bg-secondary stick"}/>
                <div className="input-group-append">
                    <Button className={"border-0 bg-transparent rounded-right shadow-none search_button"}>
                        <img src={"/icons/navigation/arrow.png"} alt="Arrow"
                             className={"search__submit_icon"}/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatSearch

