// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackPage from './FeedBack';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/feedback/:memberId/:projectId" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;