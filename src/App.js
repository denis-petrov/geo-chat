import React from 'react'
import {browserHistory, Link, Route, Router} from 'react-router'
import logo from './assets/icons/logo.svg'
import './assets/css/App.css'
import Chat from "./components/chat/Chat";

const Page = ({title}) => (
    <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>{title}</h2>
        </div>
        <p className="App-intro">
            This is the {title} page.
        </p>
        <p>
            <Link to="/">Home</Link>
        </p>
        <p>
            <Link to="/chat">Chat</Link>
        </p>
        <p>
            <Link to="/about">About</Link>
        </p>
        <p>
            <Link to="/settings">Settings</Link>
        </p>
    </div>
)

const Home = (props) => (
    <Page title="Home"/>
)

const About = (props) => (
    <Page title="About"/>
)

const Settings = (props) => (
    <Page title="Settings"/>
)


const App = () => (
    <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/>
    </Router>
)

export default App
