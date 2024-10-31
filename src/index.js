import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './reducers/store';
import App from './App';
import { ToastContainer } from 'react-toastify';
import NoInternet from './helper/NoInternet';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <NoInternet> */}
   <App/>
   <ToastContainer 
   position='top-center'
   autoClose={1500}
   closeOnClick
   pauseOnHover
   draggable
   style={{
    top:"50%",
    transform:"translateY(-50%)",
    backgroundColor:'transparent',
    color:'#000',
    boxShadow:'none'
   }}
   />
   {/* </NoInternet> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
