import {onConnected, onError} from "./messageNotification";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export const connectWs = () => {
    let sockJS = new SockJS("http://localhost:80/api/ws");
    window.stompClient = Stomp.over(sockJS);
    window.stompClient.connect({}, onConnected, onError);
};
