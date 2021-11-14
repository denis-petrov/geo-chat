const onConnected = (userId) => {
    console.log("connected");

    stompClient.subscribe(
        "message/create/" + userId,
        console.log('received msg')
    );
};