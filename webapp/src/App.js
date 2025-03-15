import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route without components you don't need */}
        <Route path="/" element={<div>Welcome to the E-commerce App</div>} />
      </Routes>
    </Router>
  );
}

export default App;


