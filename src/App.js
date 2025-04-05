import './App.css';
import Navbar from './Navbar/Navbar';
import Register_member from './Member/Register_member';

console.groupCollapsed('src/App.js'); console.groupEnd();

const App = (props) => {
  console.group('App(', props, ') invoked.'); console.groupEnd();
  return (
    <div className="App">
      <Navbar />
      {/* <Register_member /> */}
    </div>
  );
}

export default App;
