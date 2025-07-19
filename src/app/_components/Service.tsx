import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Service = () => {
  const services = [
    { service: "Online Order", src: "/assets/icons/service1.png" },
    { service: "Pre-Reservation", src: "/assets/icons/service3.png" },
    { service: "Oragonized Foodhut Place", src: "/assets/icons/service3.png" },
    { service: "24/7 Service", src: "/assets/icons/service4.png" },
    { service: "Super Chef", src: "/assets/icons/service3.png" },
    { service: "Clean Kitchen", src: "/assets/icons/service3.png" },
  ];
  return (
    <section>
      <div className="container flex justify-center items-center max-h-[850px] overflow-hidden">
        <div>
          <Image
            src="/assets/images/service.png"
            alt="Hero Image"
            width={1700}
            height={300}
            priority
            loading="eager"
            className=" object-contain h-[fit]"
          />
        </div>
        <div className="text-start">
          <h1 className="text-5xl font-bold mb-5">
            We are <span className="text-primary">more</span> than <br />
            <span className="text-secondary">multiple</span> service
          </h1>
          <p className="text-muted max-w-[80%] text-lg mb-4">
            This is a type of resturent which typically serves food and drink,
            in addition to light refreshments such as baked goods or snacks. The
            term comes frome the rench word meaning food
          </p>
          <ul className="grid grid-cols-2 gap-2 mb-4">
            {services.map((item, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-lg"
              >
                <Image
                  src={item.src}
                  alt={item.service}
                  width={30}
                  height={30}
                  className="size-6 object-contain"
                />
                <span>{item.service}</span>
              </li>
            ))}
          </ul>
          <Button size="lg">Order Now</Button>
        </div>
      </div>
    </section>
  );
};

export default Service;
