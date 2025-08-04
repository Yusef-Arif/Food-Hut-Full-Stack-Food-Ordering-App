import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import Image from "next/image";
import serviceImage from "@/../public/assets/images/service.png";
import React from "react";

const Service = async () => {
  const locale = await getCurrentLocale();
  const { services } = await getTrans(locale);
  const servicesText = [
    { service: services.items.onlineOrder, src: "/assets/icons/service1.png" },
    {
      service: services.items.preReservation,
      src: "/assets/icons/service3.png",
    },
    {
      service: services.items.organizedPlace,
      src: "/assets/icons/service3.png",
    },
    { service: services.items.service24, src: "/assets/icons/service4.png" },
    { service: services.items.superChef, src: "/assets/icons/service3.png" },
    { service: services.items.cleanKitchen, src: "/assets/icons/service3.png" },
  ];
  return (
    <section>
      <div className="container flex justify-center items-center max-h-[850px] overflow-hidden">
        <div>
          <Image
            src={serviceImage}
            alt="Hero Image"
            width={1700}
            height={300}
            priority
            loading="eager"
            className={`object-contain h-[fit] ${
              locale === "ar" ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
        <div className="text-start">
          <h1 className="text-5xl font-bold mb-5">
            {services.title[0]}{" "}
            <span className="text-primary">{services.title[1]}</span>{" "}
            {services.title[2]} <br />
            <span className="text-secondary">{services.title[3]}</span>{" "}
            {services.title[4]}
          </h1>
          <p
            className={`text-muted  text-lg mb-4 ${
              locale === "ar" ? "text-right" : "max-w-[80%]"
            }`}
          >
            {services.description}
          </p>
          <ul className="grid grid-cols-2 gap-2 my-6">
            {servicesText.map((item, index) => (
              <li key={index} className="flex items-center space-x-2 text-lg">
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
