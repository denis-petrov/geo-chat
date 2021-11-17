import React from 'react'
import '../../../assets/css/navigation/Navigation.css'
import {connect} from 'react-redux'
import {updateCenterByUserPosition} from '../../../store/actions/position/updateCenterByUserPosition'


const GetLocation = (props) => {
    return (
        <button className={"navigation__control_button"} onClick={props.updateCenterByUserPosition}>
            <img src={"/icons/navigation/navigation.png"} alt="Add"
                 className={"navigation__control_button__img center"}/>
        </button>
    )
}

const mapStateToProps = (state) => ({
    userPosition: state.userPosition
})


export default connect(mapStateToProps, {updateCenterByUserPosition})(GetLocation)

