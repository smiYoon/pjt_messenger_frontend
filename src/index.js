import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootApp from './App';

console.groupCollapsed('src/index.js');console.groupEnd();

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <RootApp />
);
