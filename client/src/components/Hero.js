import React, { useEffect, useState } from "react";
import "../App.css";
import Deals from "./Deals";
import Offer from "./Offer";

const Hero = (props) => {
  const [offers, setoffers] = useState([]);
  const [deals, setDeals] = useState([]); //

  const getOffers = async () => {
    let response;
    if(!props.isLogin){
      response = await fetch("http://127.0.0.1:8000/general");
    }
    else{
      response = await fetch("http://127.0.0.1:8000/promotion", {
        method: "GET",
        headers: {"Authorization": localStorage.getItem('token')}
      });
    }
    const jsonRes = await response.json();
    if (response.status === 200) {
      const newOffers = [];
      newOffers.push(jsonRes.result[0]);
      jsonRes.result.splice(0, 1);
      newOffers.push(jsonRes.result[10]);
      jsonRes.result.splice(10, 1);
      newOffers.push(jsonRes.result[13]);
      jsonRes.result.splice(13, 1);
      setoffers(newOffers);
      if(jsonRes.result.length < 50)
        jsonRes.result = jsonRes.result.slice(-15)
      setDeals(jsonRes.result);
    }
    else {
      console.log(jsonRes.error);
    }
  };

  useEffect(()=>{
    getOffers();
  // eslint-disable-next-line
  }, [props.isLogin]);

  return (
    <div className="hero">
      <div className="flex flex-col md:flex-row items-center justify-between md:w-max xl:w-[70vw] mx-auto gap-4 pt-3 pt-2 mb-5">
        {offers.map((element)=>{
          return <Offer article_id={element.article_id} prod_name={element.product_type_name} price={element.price} image={`data:image/jpeg;base64,${element.image}`} />
        })}
      </div>
      <Deals deals={deals} />
    </div>
  );
};

export default Hero;
