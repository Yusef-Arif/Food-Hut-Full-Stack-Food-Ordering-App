import Image from "next/image";
import appImage from "@/../public/assets/images/app.png";
import googlePlayImage from "@/../public/assets/images/googleplay.png";
import appStoreImage from "@/../public/assets/images/appstore.png";
import React from "react";

const DownApp = () => {
  return (
    <section className="gradiant-bg-bottom my-20">
      <div className="container flex">
        <div className="order-2">
          <Image
            src={appImage}
            alt="Hero Image"
            width={600}
            height={300}
            priority
            loading="eager"
            className=" object-contain h-[fit]"
          />
        </div>
        <div className="flex justify-center items-start text-start flex-col">
          <h1 className="text-5xl font-bold mb-5">
            It’s Now <span className="text-primary">More Easy</span> to{" "}
            <span className="text-secondary">Order</span> <br /> by Our Mobile
            <span className="text-primary"> App</span>
          </h1>
          <p className="text-muted text-lg max-w-[80%] my-3">
            All you need to do is download one of the best delivery apps, make a
            and most companies are opting for mobile app development for food
            delivery
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
