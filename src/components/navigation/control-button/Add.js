import React from 'react'
import '../../../assets/css/navigation/Navigation.css'

const Add = (props) => {
    return (
        <button id={"add-btn"} className={"navigation__control_button"} key={"Add"} onClick={props.onClick}>
            <img src={"/icons/navigation/add.png"} alt="Add"
                 className={"navigation__control_button__img center"}/>
        </button>
    )
}

export default Add

