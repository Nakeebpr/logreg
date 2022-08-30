import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import LogIn from './components/LogIn';
import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/login" element = {<LogIn/>}/>
          <Route path = "/register" element = {<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
