import ChatApp from './ChatApp';
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom'
import Register from './Register';
function App() {
  return (
    <div >
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/chats' element={<ChatApp/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
