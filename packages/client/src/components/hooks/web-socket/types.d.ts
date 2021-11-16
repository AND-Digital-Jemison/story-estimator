export interface Socket {
    connect: () => void;
    send: (data: any) => void;
    response: Record<string, unknown>;
}