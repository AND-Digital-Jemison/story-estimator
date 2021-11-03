import { Dictionary } from "@nest-react/domain";
import React, { FC, useEffect, useState } from "react";

import { API_URL } from '~/config';
import { checkServerVersion, Logger } from '~/utils';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>("NO SERVER RESPONSE");

  // const user = new User(1, "cheese");
// console.log(user.name);
  //  const x = new Classes.User(1, 'a');

  const socket = new WebSocket("ws://localhost:8001");
  socket.onopen = function() {
    console.log("Connected");

    socket.onerror = function(error) {
      console.error(error);
    };

    socket.onmessage = function(data) {
      console.log(data);
    };

    socket.onclose = function(closed) {
      console.log(closed);
    };

  };

  function send() {
    const msg = {
      event: "story-event-listener",
   //   data: new NewGameEvent('Dale', 'Game title')
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

      <button onClick={send}>Send event</button>
    </>
  );
};
