import React from 'react'
import {Card} from 'react-bootstrap'
import '../../../assets/css/navigation/Navigation.css'

const MapSearch = () => {
    return (
        <Card className={"navigation__search"}>
            <form action={"/map"} className={"navigation__search_form"}>
                <input placeholder={"Where we go?"} className={"navigation__search_form__input"}/>
                <button className={"navigation__search_form__submit"}>
                    <img src={"/icons/navigation/arrow.png"} alt="Arrow"
                         className={"navigation__search_form__submit_icon"}/>
                </button>
            </form>
        </Card>
    )
}

export default MapSearch

