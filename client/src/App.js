import React from 'react';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SearchResult from './components/SearchResult';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Hero />}></Route>
          <Route exact path='/search' element={<SearchResult />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
