import './App.css';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { P_List } from './Project'; 


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path="/" element={<P_List />} />
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
