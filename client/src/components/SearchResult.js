import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';

function SearchResult() {
    const [items, setItems] = useState([]);

    const fetchResult=async()=>{
        const str = localStorage.getItem('searchStr');
        const response = await fetch("http://127.0.0.1:8000/search", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `searchStr=${encodeURIComponent(str)}`
        });
        if(response.status === 200){
            const results = await response.json();
            setItems(results.result);
        }
    };

    useEffect(()=>{
        fetchResult();
    }, [items]);

  return (
    <div id="searchResult">
      {items.map((element)=>{
        return <SearchCard title={element.prod_name} price={element.price} desc={element.index_group_name} image={`data:image/jpeg;base64,${element.image}`} />
      })}
    </div>
  )
}

export default SearchResult;