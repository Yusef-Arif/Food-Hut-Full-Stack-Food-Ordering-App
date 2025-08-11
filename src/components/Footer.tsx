import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale ";

const Footer = async () => {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const about = [
    { link: translation.footer.about.title },
    { link: translation.footer.about.service },
    { link: translation.footer.about.contact },
    { link: translation.footer.about.company },
  ];

  const company = [
    { link: translation.footer.company.partnership },
    { link: translation.footer.company.terms },
    { link: translation.footer.company.privacy },
    { link: translation.footer.company.sitemap },
  ];
  return (
    <footer className="pt-8 pb-3 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl sm:text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Foodhut
            </h2>
            <p className="text-muted text-sm sm:text-base mb-6 max-w-md lg:max-w-xs">
              {translation.footer.getInTouch.description}
            </p>
            <div className="flex gap-4 text-secondary">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              {translation.footer.about.title}
            </h2>
            <ul className="space-y-3">
              {about.map((item) => (
                <li
                  key={item.link}
                  className="text-muted text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                >
                  {item.link}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              {translation.footer.company.title}
            </h2>
            <ul className="space-y-3">
              {company.map((item) => (
                <li
                  key={item.link}
                  className="text-muted text-sm sm:text-base hover:text-primary transition-colors cursor-pointer"
                >
                  {item.link}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              {translation.footer.getInTouch.title}
            </h2>
            <p className="text-muted text-sm sm:text-base mb-4">
              {translation.footer.getInTouch.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={translation.footer.getInTouch.emailPlaceholder}
                className="flex-1 min-w-0 px-4 py-2 text-sm sm:text-base rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                size="default"
                className="w-full sm:w-auto whitespace-nowrap"
              >
                {translation.footer.getInTouch.subscribe}
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-muted text-sm">
            © 2025 Foodhut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
