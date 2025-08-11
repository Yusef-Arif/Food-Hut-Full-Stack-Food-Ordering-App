import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import Image from "next/image";
import serviceImage from "@/../public/assets/images/service.png";
import React from "react";
import servce1 from "@/../public/assets/icons/service1.png";
import servce3 from "@/../public/assets/icons/service3.png";
import servce4 from "@/../public/assets/icons/service4.png";

const Service = async () => {
  const locale = await getCurrentLocale();
  const { services } = await getTrans(locale);
  const servicesText = [
    { service: services.items.onlineOrder, src: servce1 },
    {
      service: services.items.preReservation,
      src: servce3,
    },
    {
      service: services.items.organizedPlace,
      src: servce3,
    },
    { service: services.items.service24, src: servce4 },
    { service: services.items.superChef, src: servce3 },
    { service: services.items.cleanKitchen, src: servce3 },
  ];
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 overflow-x-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <div className="relative w-full max-w-[500px] lg:max-w-none mx-auto">
              <Image
                src={serviceImage}
                alt="Service features illustration"
                width={1500}
                height={300}
                priority
                loading="eager"
                className={`w-full h-auto object-contain transform ${
                  locale === "ar" ? "scale-x-[-1]" : ""
                }`}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 text-start" data-aos="zoom-in">
            {/* Title */}
            <h1 className="text-2xl max-md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 lg:mb-5">
              {services.title[0]}{" "}
              <span className="text-primary">{services.title[1]}</span>{" "}
              {services.title[2]} <br className="hidden sm:block" />
              <span className="text-secondary">{services.title[3]}</span>{" "}
              {services.title[4]}
            </h1>

            {/* Description */}
            <p
              className={`text-muted text-base sm:text-lg mb-4 sm:mb-6 ${
                locale === "ar"
                  ? "text-right"
                  : "max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]"
              }`}
            >
              {services.description}
            </p>

            {/* Services Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-6 lg:my-8">
              {servicesText.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.src}
                      alt={item.service}
                      width={30}
                      height={30}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </div>
                  <span className="flex-1">{item.service}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
