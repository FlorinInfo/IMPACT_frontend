import { Routes, Route, Link } from "react-router-dom";

import './App.scss';
import { Test } from './components/TestComponent/TestComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
