
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(

  // appcontextprovider ka children app hai
  <AppContextProvider>
        <App />
  </AppContextProvider>

)
