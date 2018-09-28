import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './app';

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <App baseUrl={baseUrl} />,
        document.querySelector('#root')
    );
}

renderApp();

registerServiceWorker();