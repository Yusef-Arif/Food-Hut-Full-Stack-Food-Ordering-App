import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";
import Image from "next/image";
import React from "react";
import decore from "@/../public/assets/icons/decore.png";
import heroImage from "@/../public/assets/images/hero.png";
import heartIcon from "@/../public/assets/icons/heart.png";
import arrowIcon from "@/../public/assets/icons/arrow1.png";

const Hero = async () => {
  const locale = await getCurrentLocale();
  const { hero } = await getTrans(locale);
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden relative py-8 sm:py-12 md:py-16">
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8 max-md:flex-col max-md:gap-6 lg:gap-12">
        <div className="max-md:order-2 w-full lg:w-1/2 relative z-10">
          {/* Heart Badge */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 bg-primary/10 p-2 sm:p-3 rounded-3xl w-fit">
            <Image
              src={heartIcon}
              alt="logo"
              width={30}
              height={30}
              priority
              loading="eager"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
            />
            <span className="text-xs sm:text-sm md:text-base">
              {hero.heart}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 sm:mb-6 lg:mb-7">
            {hero.title.split(" ")[0]}{" "}
            <span className="text-primary relative inline-block">
              {hero.title.split(" ")[1]}{" "}
              <Image
                src={arrowIcon}
                alt="Decorative arrow"
                width={70}
                height={70}
                priority
                loading="eager"
                className={`hidden lg:block absolute top-[-100px] sm:top-[-125px] lg:top-[-175px] left-0 w-20 sm:w-24 lg:w-28 object-contain transform ${
                  locale === "ar" ? "scale-x-[-1]" : ""
                }`}
              />
            </span>{" "}
            {hero.title.split(" ")[2]}
            <br className="hidden sm:block" />
            <span className="text-primary">
              {hero.title.split(" ")[3]}
            </span>{" "}
            {hero.title.split(" ")[4]}{" "}
            <span className="text-secondary relative">
              {hero.title.split(" ")[5]}{" "}
              <Image
                src={decore}
                alt="Decorative element"
                width={500}
                height={500}
                priority
                loading="eager"
                className="absolute bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-40px] left-0 w-full h-[6px] sm:h-[8px] lg:h-[10px] object-contain"
              />
            </span>
            .
          </h1>

          {/* Description */}
          <p className="text-muted text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%]">
            {hero.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base">
              {hero.orderNow}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              {hero.learnMore}
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-md:order-1 w-full lg:w-1/2 px-4 sm:px-0">
          <Image
            src={heroImage}
            alt="Hero Image"
            width={700}
            height={700}
            priority
            loading="eager"
            className={`w-full h-auto max-w-[400px] sm:max-w-[500px] lg:max-w-[700px] mx-auto object-contain transform ${
              locale === "ar" ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
      </div>

      {/* Background Gradient */}
      <div
        className={`absolute ${
          locale === "ar"
            ? "left-0 sm:left-[-30px] lg:left-[-60px]"
            : "right-0 sm:right-[-30px] lg:right-[-60px]"
        } top-0 sm:top-[-30px] lg:top-[-60px] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] gradiant-bg opacity-75 sm:opacity-100`}
      ></div>
    </section>
  );
};

export default Hero;
