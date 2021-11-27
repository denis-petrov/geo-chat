import React, {Component} from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class Login extends Component {

    check(e) {
        e.preventDefault()
        window.localStorage.setItem('authenticated', 'true');
        window.location.assign(window.location.origin + '/map');
    }

    render() {
        if (window.localStorage.getItem('authenticated')) {
            return <Redirect to="/map" />;
        }

        return (
            <div className={"text-center d-flex flex-row h-100"}>
                <div className={"m-auto"}>
                    <form onSubmit={(e) => {this.check(e)}} className="form-login">
                        <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                               autoFocus=""/>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required=""/>
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
        );
    }
}

const loginStateToProps = (state) => ({})

const loginDispatchToProps = {}

export default connect(loginStateToProps, loginDispatchToProps)(Login);