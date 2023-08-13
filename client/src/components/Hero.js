import React, { useEffect, useState } from "react";
import "../App.css";
import Deals from "./Deals";
import Offer from "./Offer";

const Hero = () => {
  const [offers, setoffers] = useState([]);
  const [deals, setDeals] = useState([]);

  const getOffers = async () => {
    const response = await fetch("http://127.0.0.1:8000/general");
    const jsonRes = await response.json();
    if (response.status === 200) {
      const newOffers = [];
      newOffers.push(jsonRes.result[0]);
      jsonRes.result.splice(0, 1);
      newOffers.push(jsonRes.result[10]);
      jsonRes.result.splice(10, 1);
      newOffers.push(jsonRes.result[13]);
      jsonRes.result.splice(13, 1);
      setoffers(offers.concat(newOffers));
      setDeals(deals.concat(jsonRes.result));
    }
    else {
      console.log(jsonRes.error);
    }
  };

  useEffect(()=>{
    getOffers();
  // eslint-disable-next-line
  }, []);

  return (
    <div className="hero">
      <div className="flex flex-col md:flex-row items-center justify-between md:w-max xl:w-[70vw] mx-auto gap-4 pt-3 pt-2 mb-5">
        {offers.map((element)=>{
          return <Offer article_id={element.article_id} prod_name={element.product_type_name} price={element.price} image={`data:image/jpeg;base64,${element.image}`} />
        })}
      </div>
      <Deals deals={deals.slice(-15)} />
    </div>
  );
};

export default Hero;
