import React, { FC, useEffect, useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

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
    <Routes>
      <Route path="/" element={<Landing />}></Route>
    </Routes>
  );
};
