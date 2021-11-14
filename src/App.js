import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/App.css'
import ChatList from './components/chat/ChatList'
import Map from './components/map/Map'
import Chat from "./components/chat/Chat";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/map" exact component={Map}/>
            <Route path="/chat" exact component={ChatList}/>
            <Redirect to="/map"/>
        </Switch>
    </BrowserRouter>
)

export default App
