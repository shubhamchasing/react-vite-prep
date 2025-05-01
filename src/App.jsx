import "./App.css";
// import UseReducer from './Components/UseReducer'
// import UseState from './Components/UseState'

import ProgressBar from "./Components/ProgressBar";

// import ObjectUseState from './Components/ObjectUseState'
function App() {
  const progressBarList = [0,1,3, 4,5, 10, 18, 50, 79, 100];

  return (
    <>
      <div className="App">
        <h1>Progress Bars</h1>
        {progressBarList.map((value) => (
          <ProgressBar key={value} progress={value} />
        ))}
      </div>
    </>
  );
}

export default App;
