import logo from './logo.svg';
import './App.css';
import AddMobileForm from './Main';
import LoginPage from './Login';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/upload" element={<AddMobileForm/>} />
    </Routes>
  </Router>
  );
}

export default App;
