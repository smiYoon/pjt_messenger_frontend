import './App.css';
import {Chat_main} from './chatting';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import ChatRoom from './chatting/chattingroom/Chatroom';

console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Chat_main />} />
          <Route path="/chat" element={<ChatRoom/>} />
        </Routes>
      </div>
    </div>
  );
}

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
