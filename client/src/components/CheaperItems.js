import React, { useState, useEffect } from 'react';
import CheaperItem from './CheaperItem';

function CheaperItems(props) {
    const [cheaperItems, setCheaperItems] = useState([]);

    const getCheaperDetails=async()=>{
        const response = await fetch("http://127.0.0.1:8000/cheaper", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `article_id=${encodeURIComponent(localStorage.getItem('selectedItem'))}`
        });
        if(response.status === 200){
            const items = await response.json();
            setCheaperItems(items.result);
        }
    };

    useEffect(()=>{
        getCheaperDetails();
    }, []);

    const [itemClicked, setItemClicked] = useState(false);
    useEffect(()=>{
      if(itemClicked)
      props.setReloadDesc(props.reloadDesc + 1);
      //eslint-disable-next-line
    }, [itemClicked]);

  return (
    <div id="cheaperItems">
        {cheaperItems.length > 0 && <h3 id="cheaperHead">Similar items at cheaper prices</h3>}
        <div className="searchResult">
        {cheaperItems.map((element)=>{
            return <CheaperItem key={element.article_id} article_id={element.article_id} title={element.prod_name} price={element.price} image={`data:image/jpeg;base64,${element.image}`} color_name={element.perceived_colour_value_name} colour_master_name={element.perceived_colour_master_name} dept_name={element.department_name} setItemClicked={setItemClicked} />
        })}
        </div>
    </div>
  )
}

export default CheaperItems;