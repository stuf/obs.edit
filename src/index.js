import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import './styles/main.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
