import React from 'react'
import '../../../assets/css/navigation/Navigation.css'

const Add = () => {
    return (
        <button className={"navigation__control_button"} key={"Add"}>
            <img src={"/icons/navigation/add.png"} alt="Add"
                 className={"navigation__control_button__img center"}/>
        </button>
    )
}

export default Add

