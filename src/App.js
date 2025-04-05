import './App.css';
import {Chat_main} from './chatting';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        {/* <div class="navbar"></div> */}
        <Routes>
          <Route path="/" element={<Chat_main />} />
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
