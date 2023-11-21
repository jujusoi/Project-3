import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import JobBoardPage from './pages/jobBoardPage.jsx';
import ListingPage from './pages/listingPage.jsx';
import LoadingPage from './pages/loadingPage.jsx';
import App from './App.jsx'
import './index.css'
import ProfilePage from './pages/profilePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import SignUpPage from './pages/signupPage.jsx';

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
        path: '/profile/:profileId',
        element: <ProfilePage />
      }, {
        path: '/login',
        element: <LoginPage />
      },{
        path: '/listing/:listingId',
        element: <ListingPage />
      },
      {
        path: '/loading',
        element: <LoadingPage />
      }, {
        path: '/create-account',
        element: <SignUpPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
