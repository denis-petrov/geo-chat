import React from 'react'
import "../../assets/css/auth/Auth.css"
import {connect} from "react-redux"
import {Redirect} from "react-router"
import {Link} from "react-router-dom"
import {authByEmail} from "../../store/actions/user/userAuth"

const Login = (props) => {

    const auth = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let userAuthData = new FormData()
        userAuthData.append('email', formData.get('email'))
        userAuthData.append('password', formData.get('password'))
        props.authByEmail(userAuthData)
            .then((user) => {
                console.log(user, JSON.stringify(user))
                if (Object.keys(user).length > 0) {
                    window.localStorage.setItem('authenticated', JSON.stringify(user))
                    window.location.assign(window.location.origin + '/map')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if (window.localStorage.getItem('authenticated')) {
        return <Redirect to="/map"/>
    }

    return (
        <div className={"text-center d-flex flex-row h-100"}>
            <div className={"m-auto"}>
                <form onSubmit={(e) => {
                    auth(e)
                }} className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
                    <input type="email" name="email" id="inputEmail" className="form-control"
                           placeholder="Email address" required="required"
                           autoFocus=""/>
                    <input type="password" name="password" id="inputPassword" className="form-control"
                           placeholder="Password"
                           required="required"/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                </form>
                <div>
                    <Link to={'/signup'}>
                        <button className="btn btn-lg btn-primary btn-block">Create New Account</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const loginStateToProps = (state) => ({
    user: state.user
})

const loginDispatchToProps = {
    authByEmail
}

export default connect(loginStateToProps, loginDispatchToProps)(Login)