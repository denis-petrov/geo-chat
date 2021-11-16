import React from 'react'
import '../../../assets/css/navigation/Navigation.css'
import {connect} from 'react-redux'
import {updateUserPosition} from '../../../store/actions/position/updateUserPosition'


const GetLocation = (props) => {
    return (
        <button className={"navigation__control_button"} onClick={props.updateUserPosition}>
            <img src={"/icons/navigation/navigation.png"} alt="Add"
                 className={"navigation__control_button__img center"}/>
        </button>
    )
}

const mapStateToProps = (state) => ({
    userPosition: state.userPosition
})


export default connect(mapStateToProps, {updateUserPosition})(GetLocation)

