export interface Socket {
    connect: () => void;
    response: Record<string, unknown>;
    send: (data: any) => void;
}