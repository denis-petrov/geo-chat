import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/App.css'
import ChatList from './components/chat/ChatList'
import Map from './components/map/Map'
import Login from "./components/user/Login";
import Chat from "./components/chat/Chat";
import ChatSetting from "./components/chat/ChatSetting";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

function requireAuth(component) {
    if (!window.localStorage.getItem('authenticated')) {
        if (component === 'login') {
            return <Login/>;
        } else if (component === 'signup') {
            return <Register/>;
        }

        return <Redirect to="/login"/>;
    }

    if (component === null || typeof component === 'string') {
        return <Redirect to="/map"/>;
    }

    return component;
}

const App = () => {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener("resize", function () {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => requireAuth(null)}/>
                <Route path="/map" exact render={() => requireAuth(<Map/>)}/>
                <Route path="/profile" exact render={() => requireAuth(<Profile />)}/>
                <Route path="/chat" exact render={() => requireAuth(<ChatList/>)}/>
                <Route path="/chat/:chatId/settings" render={({match}) => (
                    requireAuth(<ChatSetting chatId={match.params.chatId}/>)
                )}/>
                <Route path="/chat/:chatId" render={({match}) => (
                    requireAuth(<Chat chatId={match.params.chatId}/>)
                )}/>
                <Route path="/login" exact render={() => requireAuth('login')}/>
                <Route path="/signup" exact render={() => requireAuth('signup')}/>
                <Route path="/logout" exact render={() => {
                    window.localStorage.removeItem('authenticated');
                    return <Redirect to="/login"/>;
                }}/>
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App
