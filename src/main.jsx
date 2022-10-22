import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//   },
//   {
//     path: 'App',
//     element: <App />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
