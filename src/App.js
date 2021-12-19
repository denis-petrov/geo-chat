import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/App.css'
import ChatList from './components/chat/ChatList'
import Map from './components/map/Map'
import Login from "./components/user/Login";
import Chat from "./components/chat/Chat";

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'


function requireAuth(component = null) {
    if (!window.localStorage.getItem('authenticated')) {
        if (component === null) {
            return <Login />;
        }

        return <Redirect to="/login"/>;
    }

    if (component === null) {
        return <Map />;
    }

    return component;
}

const App = () => {

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener("resize", function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => requireAuth()}/>
                <Route path="/map" exact render={() => requireAuth(<Map />)}/>
                <Route path="/chat" exact render={() => requireAuth(<ChatList />)}/>
                <Route path="/chat/:chatId" render={({ match }) => (
                    requireAuth(<Chat chatId={match.params.chatId} />)
                )} />
                <Route path="/login" exact render={() => requireAuth()}/>
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    );
}

export default App
