import logo from './logo.svg';
import './App.css';
import AddMobileForm from './Main';
import LoginPage from './Login';
import Accesories from './Accesories';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Slider from './Slider';
import Select from './Select';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/select" element={<Select  />} />
      <Route path="/upload" element={<AddMobileForm/>} />
      <Route path='/uploadaccessories' element={< Accesories />}/>
      <Route path='/uploadslider' element={< Slider />}/>
    </Routes>
  </Router>
  );
}

export default App;
