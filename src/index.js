import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './reducers/store';
import App from './App';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <ErrorsBoundary> */}
   <App/>
   <ToastContainer 
   position='top-center'
   autoClose={3000}
   closeOnClick
   pauseOnHover
   draggable
   />
   {/* </ErrorsBoundary> */}
  
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
