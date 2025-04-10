import './App.css';
import Navbar from './Navbar/Navbar';
import { Register, Modify, List } from './Member';
import { Notice_list, Board_update, Notice_create, Notice_detail, Feedback_boardList , Feedback_create , Feedback_update } from './Board';
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
          <Route path="/member/edit/:employeeId" element={<Modify />} />
          <Route path="/member/register" element={<Register />} />
          <Route path="/board/create" element={<Notice_create />} />
          <Route path="/board/detail" element={<Notice_detail />} />
          <Route path="/board/list" element={<Notice_list />} />
          <Route path="/board/update" element={<Board_update />} />
          <Route path="/board/Feedbacklist" element={<Feedback_boardList />} />
          <Route path="/board/Feedback" element={<Feedback_create />} />
          <Route path="/board/Feedbackupdate" element={<Feedback_update />} />
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
