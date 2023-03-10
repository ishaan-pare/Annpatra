//@Application imports
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


//@Pages
import Home from './pages/Home';
import Navbar from './pages/jsx/Navbar';
import JoinUs from './pages/JoinUs';


//@Application
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/joinus" element={<JoinUs/>}/>

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
