
import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { createRoot } from 'react-dom/client';

const store = configureStore();
const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
  <App />
</Provider>);
