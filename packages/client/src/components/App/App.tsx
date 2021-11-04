import { Dictionary } from '@nest-react/domain';
import React, { FC, useEffect, useState } from "react";

import { API_URL } from '~/config';
import { checkServerVersion, Logger } from '~/utils';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>("NO SERVER RESPONSE");

  let socket: WebSocket;
  function connect(){
    socket = new WebSocket("ws://localhost:8001");
    socket.onopen = function() {
      console.log("Socket open");

      socket.onerror = function(error) {
        console.error(error);
      };

      socket.onmessage = function(data) {
        console.log(data);
        console.log(JSON.parse(data.data));
      };

      socket.onclose = function(closed) {
        console.log(closed);
      };

    };
  }

  function send() {
    const msg = {
      event: "story-event-listener",
      data: {
        name: 'title',
        title: 'title',
        event: 'create'
      }
    };
    console.log("sending", msg);
    socket.send(JSON.stringify(msg));
  }
  function join() {
    const msg = {
      event: "story-event-listener",
      data: {
        name: 'title',
        gameId: '1',
        event: 'join'
      }
    };
    console.log("sending", msg);
    socket.send(JSON.stringify(msg));
  }

  function point() {
    const msg = {
      event: "story-event-listener",
      data: {
        name: 'title',
        userId: 1,
        gameId: '1',
        event: 'point',
        point: '13'
      }
    };
    console.log("sending", msg);
    socket.send(JSON.stringify(msg));
  }

  function complete() {
    const msg = {
      event: "story-event-listener",
      data: {
        name: 'title',
        gameId: '1',
        event: 'complete',
        point: '13',
        title: 'The name of round'
      }
    };
    console.log("sending", msg);
    socket.send(JSON.stringify(msg));
  }

  useEffect(() => {
    async function fetchResponse(): Promise<void> {
      try {
        const res = await fetch(API_URL);
        const data = await res.text();
        setResponse(data);
      } catch (err) {
        Logger.error(err);
      }
    }

    fetchResponse();
  }, []);

  useEffect(() => {
    checkServerVersion();
  }, []);

  const dictExample: Dictionary<number> = {
    first: 1,
    second: 2
  };

  return (
    <>
      <div>
        Here we use a <code>Dictionary&lt;number&gt;</code> interface from the{" "}
        <pre>hello team!</pre>
        <code>@nest-react/domain</code> package:
        <pre>{JSON.stringify({})}</pre>
      </div>
      <div>
        And here we get a response from the API:
        <br />
        <br />
        {response}
      </div>

      <button onClick={connect}>Connect</button>
      <button onClick={send}>Create</button>
      <button onClick={join}>Join</button>
      <button onClick={point}>Point</button>
      <button onClick={complete}>Complete</button>
    </>
  );
};
