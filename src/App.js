import './App.css';

console.groupCollapsed('src/App.js'); console.groupEnd();

const App = (props) => {
  console.group('App(', props, ') invoked.'); console.groupEnd();
  return (
    <div className="App">
      App Page 입니다.
    </div>
  );
}

export default App;
