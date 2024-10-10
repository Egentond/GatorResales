import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

import Home from './components/Home.jsx'
import PageNotFound from './components/PageNotFound.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <PageNotFound />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
