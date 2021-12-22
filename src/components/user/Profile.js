import React from 'react';
import "../../assets/css/auth/Auth.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getCurrentUser} from "../../utils/getCurrentUser";
import {removeUser} from "../../store/actions/user/removeUser";
import Navigation from "../navigation/Navigation";
import Pages from "../navigation/Pages";
import ChatSearch from "../navigation/search/ChatSearch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Profile = (props) => {

    const deleteAccount = () => {
        let user = getCurrentUser()
        props.removeUser(user.userId)
    }

    let user = getCurrentUser();

    return (
        <div className={"chat"}>
            <div className={"chat-wrapper mx-auto"}>
                <div className={"px-4 py-2 bg-transparent dialog-header d-flex"}>
                    <div>
                        {user ? user.name : ''}
                    </div>
                    <Link to={'/logout'} className={"d-block my-auto ms-auto"}>
                        <FontAwesomeIcon icon={faSignOutAlt} className={"text-light"} onClick={() => {
                            let userId = document.getElementById("user-id")
                            userId.select()
                            document.execCommand("copy")
                        }}/>
                    </Link>
                </div>

                <div className={"my-3 mx-4"}>
                    <div className={"text-light pb-2 border-bottom mb-3"}>
                        <h5>Your User Id:</h5>
                        <div className={"d-flex"}>
                            <input className={"token-field w-100"} readOnly={true} type={"text"} id="user-id" value={user.userId}/>
                            <FontAwesomeIcon icon={faCopy} className={"text-light"} onClick={() => {
                                let userId = document.getElementById("user-id")
                                userId.select()
                                document.execCommand("copy")
                            }}/>
                        </div>
                    </div>

                    <button id={"remove-user"} type="button" className="btn btn-danger" onClick={() => {deleteAccount()}}>Delete Account</button>

                </div>

                <Navigation currPage={Pages.PROFILE} controlPanel={[]} search={<ChatSearch/>}/>
            </div>
        </div>
    )
}

const profileStateToProps = (state) => ({
    user: state.user
})

const profileDispatchToProps = {
    removeUser
}

export default connect(profileStateToProps, profileDispatchToProps)(Profile);