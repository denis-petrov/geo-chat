const connect = () => {
    const Stomp = require("stompjs");
    let SockJS = require("sockjs-client");
    SockJS = new SockJS("http://localhost:8081/ws");
    window.stompClient = Stomp.over(SockJS);
    window.stompClient.connect({}, onConnected, onError);
};