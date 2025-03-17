import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route without components you don't need */}
        <Route path="/" element={<div>Frontend is working</div>} />
      </Routes>
    </Router>
  );
}

export default App;

