import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import Home from './components/Home.jsx'
import PageNotFound from './components/PageNotFound.jsx';
import ListTicket from './components/ListTicket.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <PageNotFound />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <PageNotFound />,
  },

  {
    path: '/list-ticket',
    element:(
      //<PrivateRoute>
        <ListTicket />
      //</PrivateRoute>
    ),   
    errorElement: <PageNotFound />,
  },
  
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
