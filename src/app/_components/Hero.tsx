import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[100vh] flex items-center justify-center overflow-hidden relative">
      <div className="container flex items-center justify-between py-16 space-x-8">
        <div>
          <div className="flex items-center space-x-2 mb-4 bg-primary/10 p-2 rounded-3xl w-fit">
            <Image
              src="/assets/icons/heart.png"
              alt="logo"
              width={30}
              height={30}
              priority
              loading="eager"
              className="size-6 object-contain"
            />
            <span className="text-sm">People Trust us</span>
          </div>
          <h1 className="text-6xl font-black leading-tight mb-7">
            We&apos;re{" "}
            <span className="text-primary relative">
              Serious{" "}
              <Image
                src="/assets/icons/arrow1.png"
                alt="logo "
                width={70}
                height={70}
                priority
                loading="eager"
                className="absolute top-[-175px] left-0 size-35 object-contain"
              />
            </span>{" "}
            For
            <br />
            <span className="text-primary">Food</span> &{" "}
            <span className="text-secondary relative">
              Delivery{" "}
              <Image
                src="/assets/icons/decore.png"
                alt="logo "
                width={500}
                height={500}
                priority
                loading="eager"
                className="absolute bottom-[-40px] left-0 size-6 object-contain w-full h-full"
              />
            </span>
            .
          </h1>
          <p className="text-muted max-w-[80%] text-xl mb-8">
            Best cooks and best delivery guys all at your service. Hot tasty
            food will reach you in 60 minutes.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">Order Now</Button>
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/hero.png"
            alt="Hero Image"
            width={700}
            height={700}
            priority
            loading="eager"
            className=" object-contain"
          />
        </div>
      </div>
      <div className="absolute top-[-60px] right-[-60px] w-[500px] h-[500px] gradiant-bg"></div>
    </section>
  );
};

export default Hero;
