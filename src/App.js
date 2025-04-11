import './App.css';
import Navbar from './Navbar/Navbar';
import { Register, Modify, List } from './Member';
import { Notice_list, Notice_update, Notice_create, Notice_detail, Feedback_boardList , Feedback_create , Feedback_update } from './Board';
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
          <Route path="/member/edit/:empno" element={<Modify />} />
          <Route path="/member/register" element={<Register />} />
          <Route path="/board/notice/create" element={<Notice_create />} />
          <Route path="/board/notice/detail" element={<Notice_detail />} />
          <Route path="/board/notice/list" element={<Notice_list />} />
          <Route path="/board/notice/update" element={<Notice_update />} />
          <Route path="/board/feedback/list" element={<Feedback_boardList />} />
          <Route path="/board/feedback/create" element={<Feedback_create />} />
          <Route path="/board/feedback/update" element={<Feedback_update />} />
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
