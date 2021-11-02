import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { APP_ROOT } from '~/config';
import { App } from '~/components/App';

import './index.css';

const rootElement = document.getElementById(APP_ROOT);

function ReactApp(): JSX.Element {
  return (
    <Suspense fallback={<div />}>
      <Router>
        <App />
      </Router>
    </Suspense>
  );
}

render(<ReactApp />, rootElement);
