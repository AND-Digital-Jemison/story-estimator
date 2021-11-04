import { useCallback, useMemo, useState } from "react"

const useWebSocket = (socketUrl: string) => {
    const [response, setResponse] = useState({});
    const socket = new WebSocket(socketUrl);

    const connect = useCallback(() => {
        socket.onopen = () => {
            console.log('Connected');

            socket.onerror = (error: any) => {
                console.error(error);
            }

            socket.onmessage = (event: any) => {
                console.log('Data: ', event.data);
                setResponse(JSON.parse(event.data));
            }

            socket.onclose = () => {
                console.log('Disconnected');
            }
        }
    }, [socketUrl])

    const send = useCallback((data: any) => {
        try {
            socket.send(JSON.stringify(data))
        }
        catch (error) {
            console.error(error);
        }
    }, [socketUrl])

    return { connect, response, send };
}

export default useWebSocket;