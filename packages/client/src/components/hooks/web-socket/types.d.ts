
export interface WebSocket {
    connect: () => void;
    response: {};
    send: (data: any) => void;
}