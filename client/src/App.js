import React, { useState } from 'react';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SearchResult from './components/SearchResult';
import ItemDesc from './components/ItemDesc';
import Registration from './components/Registration';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [newSearch, setNewSearch] = useState(0);
  const [reloadDesc, setReloadDesc] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [numItemsCart, setNumItemsCart] = useState(0);

  return (
    <div>
      <Router>
        <Navbar newSearch={newSearch} setNewSearch={setNewSearch} isLogin={isLogin} setIsLogin={setIsLogin} numItemsCart={numItemsCart} />
        <Routes>
          <Route exact path='/' element={<Hero isLogin={isLogin} />}></Route>
          <Route exact path='/search' element={<SearchResult newSearch={newSearch} />}></Route>
          <Route exact path='/itemdesc' element={<ItemDesc key={reloadDesc} reloadDesc={reloadDesc} setReloadDesc={setReloadDesc} isLogin={isLogin} numItemsCart={numItemsCart} setNumItemsCart={setNumItemsCart} />}></Route>
          <Route exact path='/register' element={<Registration />}></Route>
          <Route exact path='/login' element={<Login setIsLogin={setIsLogin} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;