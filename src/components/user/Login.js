import React, {useState} from 'react'
import '../../assets/css/auth/Auth.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'
import {authByEmail} from '../../store/actions/user/userAuth'

const Login = (props) => {

    const [formError, setFormError] = useState(false)

    const auth = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const userAuthData = new FormData()
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
                setFormError(true)
            })
    }

    if (window.localStorage.getItem('authenticated')) {
        return <Redirect to="/map"/>
    }

    return (
        <div className={"text-center d-flex flex-row h-100 auth-wrapper"}>
            <div className={"m-auto pt-3 pb-4 px-3 border border-white"}>
                <form onSubmit={(e) => {
                    auth(e)
                }} className="form-login pb-3 mb-3 border-bottom border-white">
                    <h1 className="h3 mb-3 font-weight-normal text-light">Log in</h1>
                    <div className={`alert alert-danger ${!formError ? 'd-none' : ''}`} role="alert">
                        {props.user.error}
                    </div>
                    <input type="email" name="email" id="inputEmail" className="form-control px-0 mb-3"
                           placeholder="Email address" required="required"
                           autoFocus=""/>
                    <input type="password" name="password" id="inputPassword" className="form-control px-0 mb-3"
                           placeholder="Password"
                           required="required"/>
                    <button className="btn btn-primary btn-block w-100" type="submit">Log In</button>
                </form>
                <div>
                    <Link to={'/signup'}>
                        <button className="btn btn-primary btn-block w-100">Create New Account</button>
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