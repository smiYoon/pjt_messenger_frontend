import './App.css';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Organization from './Organization/Organization.js';
import { Member_register, Member_modify, Member_list } from './Member';
import { Notice_list, Notice_update, Notice_create, Notice_detail, Feedback_list , Feedback_create , Feedback_update, Feedback_detail } from './Board';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


console.groupCollapsed('src/App.js'); console.groupEnd();

const App = () => {
  console.group('App() invoked.'); console.groupEnd();
  const location = useLocation(); // 현재 경로를 가져옴
  const excludedRoutes = ['/']; // Navbar를 숨길 경로 목록
  
  return (
    <div className="App">
      <div className='main'>
        {!excludedRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/member/list" element={<Member_list />} />
          <Route path="/member/edit/:empno" element={<Member_modify />} />
          <Route path="/member/register" element={<Member_register />} />

          <Route path="/board/notice/list" element={<Notice_list />} />
          <Route path="/board/notice/create" element={<Notice_create />} />
          <Route path="/board/notice/detail/:id" element={<Notice_detail />} />
          <Route path="/board/notice/update/:id" element={<Notice_update />} />

          <Route path="/board/feedback/list" element={<Feedback_list />} />
          <Route path="/board/feedback/create" element={<Feedback_create />} />
          <Route path="/board/feedback/detail/:id" element={<Feedback_detail />} />
          <Route path="/board/feedback/update" element={<Feedback_update />} />
          
          <Route path="/organization/:deptNum" element={<Organization/>}/>
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
