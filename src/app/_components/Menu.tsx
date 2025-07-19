import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import React from "react";

const Menu = () => {
  const categorys =[
    { name: "Pizza" },
    { name: "Burger" },
    { name: "Pasta" },
    { name: "Salad" },
    { name: "Dessert" },
    { name: "Beverages" },
  ]

  const data = [
    {
      id: 1,
      title: "Special Offer 1",
      description: "Get 20% off on your first order!",
      image: "/assets/images/food.png",
      price: 10,
    },
    {
      id: 2,
      title: "Special Offer 2",
      description: "Buy one get one free on selected items!",
      image: "/assets/images/food.png",
      price: 15,
    },
    {
      id: 3,
      title: "Special Offer 3",
      description: "Free delivery on orders over $50!",
      image: "/assets/images/food.png",
      price: 20,
    },
    {
      id: 4,
      title: "Special Offer 4",
      description: "Free delivery on orders over $50!",
      image: "/assets/images/food.png",
      price: 20,
    },
  ];

  return (
    <section className=" py-20">
      <div className="container">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-primary">Menu</span> that{" "}
          <span className="text-secondary">always</span> make you <br /> fall in
          <span className="text-primary">love</span>
        </h1>

        <div className="flex justify-center items-center my-10">
            {categorys.map((category, index) => (
              <Button key={index} className="m-2" size='lg' variant={index === 0 ? "default" : "outline"}>
                {category.name}
              </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {data.map((offer) => (
            <div key={offer.id}>
              <ProductCard
                image={offer.image}
                title={offer.title}
                description={offer.description}
                price={offer.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
