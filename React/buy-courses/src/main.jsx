import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// importing taosts s1 is npm i react-toastify then write below 2 lines
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-poppins'>
      <App />
      <ToastContainer />
    </div>
  </StrictMode>,
)
