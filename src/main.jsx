import { StrictMode } from 'react';
import App from './App.jsx';
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./styles/globals.scss";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <Projects /> },
    ],
  },
], {
  basename: '/simpelcity.github.io',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)