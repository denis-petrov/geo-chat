import React from 'react'
import {Redirect, Route} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/App.css'
import Chat from './components/chat/Chat'
import Map from './components/map/Map'


const App = () => (
    <BrowserRouter>
        <Redirect to="/map"/>
        <Route path="/map" component={Map}/>
        <Route path="/chat" component={Chat}/>
    </BrowserRouter>
)

export default App
