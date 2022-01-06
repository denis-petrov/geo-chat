import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {BrowserRouter} from 'react-router-dom'
import './assets/css/App.css'
import ChatList from './components/chat/ChatList'
import Map from './components/map/Map'
import Login from './components/user/Login'
import Chat from './components/chat/Chat'
import ChatSetting from './components/chat/ChatSetting'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import FriendList from './components/friend/FriendList'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {getCurrentUser} from './utils/getCurrentUser'
import {getMessages} from './store/actions/chat/getMessages'
import {connect} from 'react-redux'
import FindFriend from "./components/friend/FindFriend";


function requireAuth(component) {
    if (!window.localStorage.getItem('authenticated')) {
        if (component === 'login') {
            return <Login/>
        } else if (component === 'signup') {
            return <Register/>
        }

        return <Redirect to="/login"/>
    }

    if (component === null || typeof component === 'string') {
        return <Redirect to="/map"/>
    }

    return component
}

const App = (props) => {

    useEffect(() => {
        if (Object.keys(getCurrentUser()).length > 0) {
            connectWs()
        }
    }, [])

    const connectWs = () => {
        const sockJSClient = new SockJS(`${window.location.protocol}//${window.location.host}/api/ws`)
        const stompClient = Stomp.over(sockJSClient)
        stompClient.connect({}, () => {
            const user = getCurrentUser()
            stompClient.subscribe(
                `/user/${user.userId}/queue/message/create`,
                frame => {
                    const chatId = frame.body.substring(1, frame.body.length - 1)
                    props.getMessages(chatId, 1)
                        .then((messages) => {
                            changeLocalStorageMsg(chatId, messages)
                        })
                }
            )
        }, () => {
        })
    }

    const changeLocalStorageMsg = (chatId, messages) => {
        let chatMessages = JSON.parse(window.localStorage.getItem('chatMessages'))
        if (!chatMessages) {
            chatMessages = {}
        }

        const user = getCurrentUser()
        if (messages[0].senderId !== user.userId) {
            chatMessages[chatId] = chatMessages[chatId] !== undefined ? chatMessages[chatId] + 1 : 1
            window.localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
        }
    }

    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener("resize", () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => requireAuth(null)}/>
                <Route path="/map" exact render={() => requireAuth(<Map/>)}/>
                <Route path="/profile" exact render={() => requireAuth(<Profile/>)}/>
                <Route path="/friends" exact render={() => requireAuth(<FriendList/>)}/>
                <Route path="/find-friends" exact render={() => requireAuth(<FindFriend/>)}/>
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
                    window.localStorage.clear()
                    return <Redirect to="/login"/>
                }}/>
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    )
}

const appStateToProps = (state) => ({
    messages: state.messages,
    chats: state.chats
})

const appDispatchToProps = {
    getMessages
}

export default connect(appStateToProps, appDispatchToProps)(App)
