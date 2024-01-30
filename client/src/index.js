import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChatStateProvider from './context/ChatState'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChatStateProvider>
    <App />
    </ChatStateProvider>
)


