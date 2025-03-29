
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './lib/AuthProvider.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react'
import Posts from './components/Post.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App></App>,
  },
  {
    path: "/posts",
    element:<Posts></Posts>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
     <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthProvider>
 ,
)
