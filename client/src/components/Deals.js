import React from "react";
import Card from "./Card";

const Deals = (props) => {
  return (
    <div className="w-full flex justify-center pb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:w-max xl:w-[70vw] gap-4 mt-4 mx-auto">
        {(props.deals).map((element) => (
          <Card article_id={element.article_id} image={`data:image/jpeg;base64,${element.image}`} title={element.prod_name} price={element.price} />
        ))}
      </div>
    </div>
  );
};

export default Deals;
