import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>404 Not Found!!!</h2>,
    children: [
      {
        index: true,
        element: <h2>Main page (Job area)</h2>,
      }, {
        path: '/profile',
        element: <h2>This is a user's profile</h2>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
