export const onConnected = () => {
    console.log("connected");

    window.stompClient.subscribe(
        "/message/create/33f502fa-fe33-438b-8da3-5072d71444bc",
        test()
    );
};

export const onError = () => {
    console.log("error ws");
};

export function test() {
    console.log('msg received');
    return 'test subscribe';
}