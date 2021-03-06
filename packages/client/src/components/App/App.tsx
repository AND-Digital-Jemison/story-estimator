import React, { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { API_URL } from "~/config";
import { checkServerVersion, Logger } from "~/utils";
import { Game } from "../game/Game";
import { Landing } from "../landing/Landing";

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>("NO SERVER RESPONSE");

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

  return (

      <Router>
        <Switch>
          <Route path="/" exact={true} render={() => <Landing />}></Route>
          <Route path="/game" exact={true} render={() => <Game />}></Route>
        </Switch>
      </Router>

  );
};
