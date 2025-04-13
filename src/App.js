import './App.css';
import Navbar from './Navbar/Navbar';
import { Member_register, Member_modify, Member_list } from './Member';
import { Notice_list, Notice_update, Notice_create, Notice_detail, Feedback_list , Feedback_create , Feedback_update, Feedback_detail } from './Board';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  return (
    <div className="App">
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path="/member/list" element={<Member_list />} />
          <Route path="/member/edit/:empno" element={<Member_modify />} />
          <Route path="/member/register" element={<Member_register />} />
          <Route path="/member/edit/" element={<Member_modify />} />

          <Route path="/board/notice/list" element={<Notice_list />} />
          <Route path="/board/notice/create" element={<Notice_create />} />
          <Route path="/board/notice/detail" element={<Notice_detail />} />
          <Route path="/board/notice/update" element={<Notice_update />} />

          <Route path="/board/feedback/list" element={<Feedback_list />} />
          <Route path="/board/feedback/create" element={<Feedback_create />} />
          <Route path="/board/feedback/detail" element={<Feedback_detail />} />
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
