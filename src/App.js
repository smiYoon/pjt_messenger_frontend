import './App.css';
import Navbar from './Navbar/Navbar';
import { Register, Modify, List } from './Member';
import { Board_list, Board_create } from './Board';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path="/member/list" element={<List />} />
          <Route path="/member/edit" element={<Modify />} />
          <Route path="/member/register" element={<Register />} />
          <Route path="/board/list" element={<Board_list />} />
          <Route path="/" element={<Board_create />} />
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
