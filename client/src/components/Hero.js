import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Deals from "./Deals";
import Promotion from "./Promotion";
import Offer from "./Offer";

const Hero = (props) => {
  const [topPromotions, setTopPromotions] = useState([]);
  const [deals, setDeals] = useState([]);
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    let general = await fetch("http://127.0.0.1:8000/general");
    if (props.isLogin) {
      let topPromo = await fetch("http://127.0.0.1:8000/toppromotion", {
        method: "GET",
        headers: { "Authorization": localStorage.getItem('token') }
      });
      if (topPromo.status === 200) {
        topPromo = await topPromo.json();
        setTopPromotions(topPromo.result);
      }
    }
    general = await general.json();
    general = general.result;
    let newOffers = [];
    newOffers.push(general[0]);
    general.splice(0, 1);
    newOffers.push(general[10]);
    general.splice(10, 1);
    newOffers.push(general[13]);
    general.splice(13, 1);
    setOffers(newOffers);
    general = general.slice(-15)
    setDeals(general);
  };

  useEffect(() => {
    getOffers();
    // eslint-disable-next-line
  }, [props.isLogin]);

  return (
    <div className="hero">
      {props.isLogin && topPromotions.length > 0 && <div className="shadow-lg border rounded p-4 w-[95vw] mx-auto mb-5">
        <div className="flex justify-between">
          <p className="mb-4 font-bold text-xl recentText">Recent search recommendations</p>
          <Link to="/searchrec" className="mb-4 font-bold text-xl recentText" style={{ color: '#008080' }}>See more</Link>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between md:w-max xl:w-[70vw] mx-auto gap-4">
          {topPromotions.map((element) => (
            <Promotion article_id={element.article_id} prod_name={element.product_type_name} price={element.price} image={`data:image/jpeg;base64,${element.image}`} />
          ))}
        </div>
      </div>}

      {(!props.isLogin || topPromotions.length === 0) && <div className="flex flex-col md:flex-row items-center justify-between md:w-max xl:w-[70vw] mx-auto gap-4 pt-3 pt-2 mb-5">
        {offers.map((element)=>{
          return <Offer article_id={element.article_id} prod_name={element.product_type_name} price={element.price} image={`data:image/jpeg;base64,${element.image}`} />
        })}
      </div>}
      <Deals deals={deals} />
    </div>
  );
};

export default Hero;
