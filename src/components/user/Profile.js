import React, {Component} from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../../utils/getCurrentUser";
import {removeUser} from "../../store/actions/user/removeUser";
import Navigation from "../navigation/Navigation";
import Pages from "../navigation/Pages";
import ChatSearch from "../navigation/search/ChatSearch";

class Login extends Component {

    deleteAccount() {
        let user = getCurrentUser()
        console.log(user.userId)
        this.props.removeUser(user.userId)
    }

    render() {
        let user = getCurrentUser();

        return (
            <div className={"chat"}>
                <div className={"chat-wrapper mx-auto"}>
                    <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                        {user.name}
                    </div>

                    <div>
                        <div>
                            <Link to={'/logout'}>
                                <button id={"logout"} type="button" className="btn btn-primary">Logout</button>
                            </Link>
                        </div>

                        <button id={"remove-user"} type="button" className="btn btn-danger" onClick={() => {this.deleteAccount()}}>Delete Account</button>
                    </div>

                    <Navigation currPage={Pages.PROFILE} controlPanel={[]} search={<ChatSearch/>}/>
                </div>
            </div>
        );
    }
}

const loginStateToProps = (state) => ({
    user: state.user
})

const loginDispatchToProps = {
    removeUser
}

export default connect(loginStateToProps, loginDispatchToProps)(Login);