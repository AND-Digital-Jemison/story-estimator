import React, { FC, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Landing } from '../landing/Landing';

import { API_URL } from '~/config';
import { Logger, checkServerVersion } from '~/utils';

export const App: FC<unknown> = () => {
  const [response, setResponse] = useState<string>('NO SERVER RESPONSE');

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
      </Switch>
    </Router>
  );
};
