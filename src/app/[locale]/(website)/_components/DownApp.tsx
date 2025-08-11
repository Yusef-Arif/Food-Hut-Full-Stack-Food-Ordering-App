import Image from "next/image";
import appImage from "@/../public/assets/images/app.png";
import googlePlayImage from "@/../public/assets/images/googleplay.png";
import appStoreImage from "@/../public/assets/images/appstore.png";
import React from "react";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";
import getTrans from "@/lib/translation";

const DownApp = async () => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  return (
    <section className="gradiant-bg-bottom my-20">
      <div className="container flex max-md:flex-col">
        <div className="order-2" data-aos="fade-left">
          <Image
            src={appImage}
            alt="Hero Image"
            width={600}
            height={300}
            priority
            loading="eager"
            className=" object-contain h-[fit] mb-10"
          />
        </div>
        <div
          className="flex justify-center items-start text-start flex-col max-md:p-5"
          data-aos="zoom-in"
        >
          <h1 className="md:text-5xl max-md:text-4xl font-bold mb-5">
            {translation.appSection.title[0]}{" "}
            <span className="text-primary">
              {translation.appSection.title[1]}
            </span>{" "}
            {translation.appSection.title[2]}{" "}
            <span className="text-secondary">
              {translation.appSection.title[3]}
            </span>{" "}
            <br />
            {translation.appSection.title[4]}
            <span className="text-primary">
              {translation.appSection.title[5]}
            </span>
          </h1>
          <p className="text-muted max-md:text-md md:text-lg max-w-[80%] my-3">
            {translation.appSection.description}
          </p>
          <div className="flex justify-center items-start gap-3 ">
            <Image
              src={googlePlayImage}
              alt="Hero Image"
              width={600}
              height={300}
              priority
              loading="eager"
              className=" object-contain size-32 cursor-pointer hover:scale-110 transition-all duration-300"
            />
            <Image
              src={appStoreImage}
              alt="Hero Image"
              width={600}
              height={300}
              priority
              loading="eager"
              className=" object-contain size-32 cursor-pointer hover:scale-110 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownApp;
