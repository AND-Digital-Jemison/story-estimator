import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from '~/components/hooks/web-socket/socket-context';

import { APP_ROOT } from '~/config';
import { App } from '~/components/app';

import './index.css';

const rootElement = document.getElementById(APP_ROOT);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Suspense>
  );
}

render(<ReactApp />, rootElement);
