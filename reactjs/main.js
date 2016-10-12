import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
ReactDom.render(<App cat={3} txt="this is cool"/>, document.getElementById('app'));
