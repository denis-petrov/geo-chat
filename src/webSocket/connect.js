import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {getCurrentUser} from "../utils/getCurrentUser";

let stompClient = null;

export const connectWs = () => {
    let sockJSClient = new SockJS("http://localhost:80/api/ws");
    stompClient = Stomp.over(sockJSClient);
    stompClient.connect({}, onConnected, onError);
};

const onConnected = () => {console.log("connected")
    let user = getCurrentUser();
    setTimeout(() => {
        stompClient.subscribe(
            `/user/${user.userId}/queue/message/create`,
            receiveMsg
        );
    }, 1000)
};

const onError = () => {
    console.log("error ws");
};

const receiveMsg = (msg) => {
    console.log(msg);
};
