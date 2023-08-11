import React from "react";
import costume from "../assets/costume.jpg";
import jacket from "../assets/jacket.jpg";
import jacket2 from "../assets/2.jpg";
import jacket3 from "../assets/3.jpg";
import Card from "./Card";

const Deals = () => {
  const cards = [
    { photo: costume, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket2, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket3, title: "Rapid Charger & Stylus Pen" },
    { photo: costume, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket2, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket3, title: "Rapid Charger & Stylus Pen" },
    { photo: costume, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket2, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket3, title: "Rapid Charger & Stylus Pen" },
    { photo: costume, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket, title: "Rapid Charger & Stylus Pen" },
    { photo: jacket2, title: "Rapid Charger & Stylus Pen" },
  ];
  return (
    <div className="w-full flex justify-center pb-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:w-max xl:w-[70vw] gap-4 mt-4 mx-auto">
        {cards.map((card) => (
          <Card photo={card.photo} title={card.title} price={card.price} />
        ))}
      </div>
    </div>
  );
};

export default Deals;
