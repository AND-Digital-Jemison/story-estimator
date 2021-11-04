import React, { useState } from "react"
import { WebSocket } from "../hooks/web-socket/types";

export const CreateGame = (props: {
    socket: WebSocket
}) => {
    const { socket } = props;
    const [newGameData, setNewGameData] = useState({
        name: '',
        roundName: ''
    })

    const handleClick = () => {
        socket.send(newGameData)
    }

    return (
        <form>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={newGameData.name}
                onChange={(event) => setNewGameData({ ...newGameData, name: event.target.value })}
            />

            <label>Round Name:</label>
            <input
                type="text"
                name="round-name"
                onChange={(event) => setNewGameData({ ...newGameData, roundName: event.target.value })}
            />
            <button onClick={handleClick}>CREATE</button>
        </form>
    )
}