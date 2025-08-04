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
    <section className="min-h-[100vh] flex items-center justify-center overflow-hidden relative">
      <div className="container flex items-center justify-between py-16 space-x-8">
        <div>
          <div className="flex items-center space-x-2 mb-4 bg-primary/10 p-2 rounded-3xl w-fit">
            <Image
              src={heartIcon}
              alt="logo"
              width={30}
              height={30}
              priority
              loading="eager"
              className="size-6 object-contain"
            />
            <span className="text-sm">{hero.heart}</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-7">
            {hero.title.split(" ")[0]}{" "}
            <span className="text-primary relative">
              {hero.title.split(" ")[1]}{" "}
              <Image
                src={arrowIcon}
                alt="logo "
                width={70}
                height={70}
                priority
                loading="eager"
                className={`absolute top-[-175px] left-0 size-35 object-contain ${
                  locale === "ar" ? "scale-x-[-1]" : ""
                }`}
              />
            </span>{" "}
            {hero.title.split(" ")[2]}
            <br />
            <span className="text-primary">
              {hero.title.split(" ")[3]}
            </span>{" "}
            {hero.title.split(" ")[4]}{" "}
            <span className="text-secondary relative">
              {hero.title.split(" ")[5]}{" "}
              <Image
                src={decore}
                alt="logo "
                width={500}
                height={500}
                priority
                loading="eager"
                className="absolute bottom-[-40px] left-0 size-6 object-contain w-full h-full "
              />
            </span>
            .
          </h1>
          <p className="text-muted max-w-[80%] text-xl mb-8">
            {hero.description}
          </p>
          <div className="flex space-x-4">
            <Button size="lg">{hero.orderNow}</Button>
            <Button variant="ghost" size="lg">
              {hero.learnMore}
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={heroImage}
            alt="Hero Image"
            width={700}
            height={700}
            priority
            loading="eager"
            className={`object-contain ${
              locale === "ar" ? "scale-x-[-1]" : ""
            }`}
          />
        </div>
      </div>
      <div
        className={`absolute ${
          locale === "ar" ? "left-[0px]" : "right-[-60px]"
        } top-[-60px] w-[500px] h-[500px] gradiant-bg`}
      ></div>
    </section>
  );
};

export default Hero;
