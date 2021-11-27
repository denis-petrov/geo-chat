import React, {Component} from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {Redirect} from "react-router";

class Register extends Component {

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
            <div className={"text-center d-flex h-100"}>
                <form onSubmit={(e) => {this.check(e)}} className="form-login m-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                           autoFocus=""/>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required=""/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

const registerStateToProps = (state) => ({})

const registerDispatchToProps = {}

export default connect(registerStateToProps, registerDispatchToProps)(Register);