import './App.css';
import Navbar from './Navbar/Navbar';
import { Register, Modify, List } from './Member';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/1" element={<Modify />} />
          <Route path="/2" element={<Register />} />
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
