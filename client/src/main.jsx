import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import JobBoardPage from './pages/jobBoardPage.jsx';
import ListingPage from './pages/listingPage.jsx';
import LoadingPage from './pages/loadingPage.jsx';
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
        element: <JobBoardPage />
      }, {
        path: '/:listingSearch',
        element: <JobBoardPage />
      }, {
        path: '/profile/me',
        element: <h2>This is the user's profile</h2>
      }, {
        path: '/profile/:profileId',
        element: <h2>This is another user's profile</h2>
      }, {
        path: '/auth-page',
        element: <h2>This is the auth page</h2>
      },{
        path: '/listing/:listingId',
        element: <ListingPage />
      }, {
        path: '/about',
        element: <h2>About us...</h2>
      }, {
        path: '/donate',
        element: <h2>Give me your money</h2>
      }, {
        path: '/contact',
        element: <h2>Contact us</h2>
      },
      {
        path: '/loading',
        element: <LoadingPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
