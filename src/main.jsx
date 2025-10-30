import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import {  store } from './redux/store.js'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'

export const serverUrl = "https://chitthi-goje.onrender.com/"

// const persistor = persistStore(store)
createRoot(document.getElementById('root')).render(

 <BrowserRouter>
 <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
 <App />
 {/* </PersistGate> */}
 </Provider >
 
 </BrowserRouter>
    
 
   
  
)
