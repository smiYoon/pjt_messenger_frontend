import './App.css';
import Navbar from './Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { W_List, W_Create, W_Detail } from './Work/index.js';


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Modify />} /> */}
          <Route path="/work" element={<W_List/>}/>
          <Route path="/work/create" element={<W_Create/>}/>
          <Route path="/work/detail" element={<W_Detail/>}/>
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
