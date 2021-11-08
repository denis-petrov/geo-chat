import React from 'react'
import {Card} from 'react-bootstrap'
import '../../../assets/css/navigation/Navigation.css'

const ChatSearch = () => {
    return (
        <Card className={"navigation__search"}>
            <form action={"/chat"} className={"navigation__search_form"}>
                <input placeholder={"Which do you want?"} className={"navigation__search_form__input"}/>
                <button className={"navigation__search_form__submit"}>
                    <img src={"/icons/navigation/arrow.png"} alt="Arrow"
                         className={"navigation__search_form__submit_icon"}/>
                </button>
            </form>
        </Card>
    )
}

export default ChatSearch

