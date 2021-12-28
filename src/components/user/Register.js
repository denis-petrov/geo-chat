import React, {useEffect, useState} from 'react'
import "../../assets/css/auth/Auth.css"
import {connect} from "react-redux"
import {Redirect} from "react-router"
import {createUser} from "../../store/actions/user/createUser"
import {getUserInfo} from "../../store/actions/user/getUserInfo"

const Register = (props) => {

    const [formError, setFormError] = useState(false)

    const register = (e) => {
        e.preventDefault()
        console.log(props)
        const formData = new FormData(e.target)
        props.createUser(formData.get("name"), formData.get("email"), formData.get("password"))
            .then((userId) => {
                if (userId) {
                    props.getUserInfo(userId)
                        .then((user) => {
                            console.log(props, JSON.stringify(user))
                            if (Object.keys(user).length > 0) {
                                window.localStorage.setItem('authenticated', JSON.stringify(user))
                                window.location.assign(window.location.origin + '/map')
                            }
                        })
                }
            })
            .catch((err) => {
                setFormError(true)
            })
    }

    if (window.localStorage.getItem('authenticated')) {
        return <Redirect to="/map" />
    }

    console.log(formError)

    return (
        <div className={"text-center d-flex flex-row h-100 auth-wrapper"}>
            <div className={"m-auto pt-3 pb-4 px-3 border border-white"}>
                <form onSubmit={(e) => {
                    register(e)
                }} className="form-login pb-3">
                    <h1 className="h3 mb-3 font-weight-normal text-light">Sign Up</h1>
                    <div className={`alert alert-danger ${!formError ? 'd-none' : ''}`} role="alert">
                        {props.user.error}
                    </div>
                    <input type="text" name="name" id="inputText" className="form-control px-0 mb-3" placeholder="Name" required="required"
                           autoFocus=""/>
                    <input type="email" name="email" id="inputEmail" className="form-control px-0 mb-3" placeholder="Email address" required="required"
                           autoFocus=""/>
                    <input type="password" name="password" id="inputPassword" className="form-control px-0 mb-3" placeholder="Password"
                           required="required"/>
                    <button className="btn btn-primary btn-block w-100" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

const registerStateToProps = (state) => ({
    user: state.user
})

const registerDispatchToProps = {
    createUser, getUserInfo
}

export default connect(registerStateToProps, registerDispatchToProps)(Register)