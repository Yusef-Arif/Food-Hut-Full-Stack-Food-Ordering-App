import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const about = [
    { link: "About Us" },
    { link: "Service Us" },
    { link: "Contact" },
    { link: "Company" },
  ];

  const company = [
    { link: "Partnership" },
    { link: "Terms of Use" },
    { link: "Privacy" },
    { link: "Sitemap" },
  ];
  return (
    <footer className="">
      <div className="container my-20 flex justify-start items-start gap-15">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Foodhut</h1>
          <p className="text-muted text-lg max-w-[50%] my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor{" "}
          </p>
          <div className="flex gap-3 text-secondary">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>

        <ul>
          <h1 className="text-3xl font-semibold text-primary mb-3">About Us</h1>
          {about.map((item) => (
            <li key={item.link} className="text-muted">
              {item.link}
            </li>
          ))}
        </ul>

        <ul>
          <h1 className="text-3xl font-semibold text-primary mb-3">Company</h1>
          {company.map((item) => (
            <li key={item.link} className="text-muted">
              {item.link}
            </li>
          ))}
        </ul>

        <div>
          <h1 className="text-3xl font-semibold text-primary">Get in touch</h1>
          <p className="text-muted text-lg max-w-[70%] my-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Email..."
              className="border-none outline-none p-3 rounded-3xl bg-black/10"
            />
            <Button size="lg">Subscribe</Button>
          </div>
        </div>

      </div>

      <p className="text-center text-muted my-3">
        © 2025 Foodhut. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
