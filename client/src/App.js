import React, { useState } from 'react';
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SearchResult from './components/SearchResult';
import ItemDesc from './components/ItemDesc';
import Registration from './components/Registration';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import SearchRecommend from './components/SearchRecommend';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [newSearch, setNewSearch] = useState(0);
  const [reloadDesc, setReloadDesc] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [numItemsCart, setNumItemsCart] = useState(0);
  const [buyInStore, setBuyInStore] = useState(false);

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
          <Route exact path='/checkout' element={<Checkout isLogin={isLogin} numItemsCart={numItemsCart} buyInStore={buyInStore} setBuyInStore={setBuyInStore} setNumItemsCart={setNumItemsCart} />}></Route>
          <Route exact path='/payment' element={<Payment buyInStore={buyInStore} />}></Route>
          <Route exact path='/searchrec' element={<SearchRecommend />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;