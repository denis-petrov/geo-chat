import React, {Component} from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {addMessage} from "../../store/actions/chat/addMessage";
import {getChatInfo} from "../../store/actions/chat/getChatInfo";
import {getUserInfo} from "../../store/actions/user/getUserInfo";
import {Redirect} from "react-router";

class Login extends Component {

    check() {
        window.localStorage.setItem('authenticated', 'true');
    }

    render() {
        if (window.localStorage.getItem('authenticated')) {
            return <Redirect to="/map" />;
        }

        return (
            <div className={"text-center d-flex h-100"}>
                <form onSubmit={(e) => this.check()} className="form-login m-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                           autoFocus=""/>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required=""/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}

const loginStateToProps = (state) => ({})

const loginDispatchToProps =
    {
        addMessage, getChatInfo, getUserInfo
    }

export default connect(loginStateToProps, loginDispatchToProps)(Login);