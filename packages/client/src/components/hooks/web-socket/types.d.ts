export interface Message {
    event: string;
    data: any;
}

export interface Socket {
    connect: () => void;
    send: (message: Message) => void;
    response: Record<string, unknown>;
}