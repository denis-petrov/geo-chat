import React, {Component} from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {createUser} from "../../store/actions/user/createUser";
import {getUserInfo} from "../../store/actions/user/getUserInfo";

class Register extends Component {

    register(e) {
        e.preventDefault()
        let formData = new FormData(e.target);
        this.props.createUser(formData.get("name"), formData.get("email"), formData.get("password"))
            .then(() => {
                console.log(this.props.user.userId);
                this.props.getUserInfo(this.props.user.userId).then(() => {
                    console.log(this.props)
                    window.localStorage.setItem('authenticated', JSON.stringify(this.props.user));
                    window.location.assign(window.location.origin + '/map');
                });
            })
            .catch((err) => {console.log(err)})
    }

    render() {
        if (window.localStorage.getItem('authenticated')) {
            return <Redirect to="/map" />;
        }

        return (
            <div className={"text-center d-flex h-100"}>
                <form onSubmit={(e) => {this.register(e)}} className="form-login m-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                    <input type="text" name="name" id="inputText" className="form-control" placeholder="Name" required="required"
                           autoFocus=""/>
                    <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required="required"
                           autoFocus=""/>
                    <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password"
                           required="required"/>
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

const registerStateToProps = (state) => ({
    user: state.user,
})

const registerDispatchToProps = {
    createUser, getUserInfo
}

export default connect(registerStateToProps, registerDispatchToProps)(Register);