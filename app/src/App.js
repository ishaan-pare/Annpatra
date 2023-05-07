//@Application imports
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//@Pages
//import Home from './pages/Home';
import Home from './pages/Home';
import Navbar from './pages/components/Navbar';
import { useContext } from 'react';
import ClientContext from './context/ClientContext';
import DashBoard from './pages/Dashboard';
import Profile from './pages/Profile';

//@Application
function App() {
  const clientContext = useContext(ClientContext);
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
