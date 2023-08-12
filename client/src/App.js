import React, { useState } from 'react';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SearchResult from './components/SearchResult';
import ItemDesc from './components/ItemDesc';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [newSearch, setNewSearch] = useState(0);
  const [reloadDesc, setReloadDesc] = useState(0);

  return (
    <div>
      <Router>
        <Navbar newSearch={newSearch} setNewSearch={setNewSearch} />
        <Routes>
          <Route exact path='/' element={<Hero />}></Route>
          <Route exact path='/search' element={<SearchResult newSearch={newSearch} />}></Route>
          <Route exact path='/itemdesc' element={<ItemDesc key={reloadDesc} reloadDesc={reloadDesc} setReloadDesc={setReloadDesc} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
