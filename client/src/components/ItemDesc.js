import React, { useEffect, useState } from 'react';
import CheaperItems from './CheaperItems';
import { useNavigate } from "react-router-dom";

function ItemDesc(props) {
  const navigate = useNavigate();
  const [item, setItem] = useState({});

  const getItemDetails = async () => {
    const response = await fetch("http://127.0.0.1:8000/getitemdetails", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `article_id=${encodeURIComponent(localStorage.getItem('selectedItem'))}`
    });
    if (response.status === 200) {
      const product = await response.json();
      setItem(product.result);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  const addToCart = async () => {
    if (!props.isLogin) {
      navigate('/login');
    }
    else {
      const response = await fetch("http://127.0.0.1:8000/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": localStorage.getItem('token')
        },
        body: `article_id=${encodeURIComponent(item['article_id'])}`
      });
      const jsonRes = await response.json();
      if (response.status === 200) {
        props.setNumItemsCart(props.numItemsCart + 1);
        console.log(jsonRes.success);
      }
      else {
        navigate('/checkout');
      }
    }
  };

  const getCartItem=async()=>{
    const data = await fetch("http://127.0.0.1:8000/checkcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": localStorage.getItem('token')
      },
      body: `article_id=${encodeURIComponent(localStorage.getItem('selectedItem'))}`
    });
    if(data.status === 200){
      const response = await fetch("http://127.0.0.1:8000/numcart", {
        method: 'GET',
        headers: { 'Authorization': localStorage.getItem('token') }
      });
      if (response.status === 200) {
        const jsonRes = await response.json();
        document.getElementById('addCartOption').innerHTML = `View cart (${jsonRes.numsItems})`;
      }
      else{
        document.getElementById('addCartOption').innerHTML = "Add to cart";
      }
    }
  };

  useEffect(()=>{
    if(props.isLogin){
      getCartItem();
    }
    else{
      document.getElementById('addCartOption').innerHTML = "Add to cart";
    }
    // eslint-disable-next-line
  }, [props.isLogin, props.numItemsCart]);

  return (
    <div>
      <div className="desc">
        <div className="showItemImg">
          <img src={`data:image/jpeg;base64,${item.image}`} alt="" />
        </div>
        <div className="card addToCart">
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            Best seller
          </span>
          <span className="group">{item.perceived_colour_value_name} {item.perceived_colour_master_name} {item.department_name}</span>
          <span className="gender">{item.index_group_name}</span>
          <h5 className="card-title">{item.prod_name}</h5>
          <span className="price">&#8377;{item.price}</span>
          <p className="card-text">{item.detail_desc}</p>
          <button type="button" id="addCartOption" className="btn btn-primary custom-btn rounded-5" onClick={addToCart}>Add to cart</button>
        </div>
      </div>
      <CheaperItems reloadDesc={props.reloadDesc} setReloadDesc={props.setReloadDesc} />
    </div>
  )
}

export default ItemDesc;
