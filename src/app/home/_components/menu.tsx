"use client";

import { locales } from "@/i18n/config";
import { setUserLocale } from "@/lib/services/locale";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState, useTransition } from "react";

interface MenuProps {
  menu: string[];
}

export default function Menu({ menu }: MenuProps) {
  const currentLocale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(currentLocale);
  const changeLocale = (locale: string) => {
    if (locale) {
      startTransition(() => {
        setSelected(locale);
        setIsActive(!isActive);
        setUserLocale(locale);
      });
    }
  };

  return (
    <section className="block md:hidden">
      <input
        className="peer hidden"
        type="checkbox"
        name=""
        id="nav-mobile-input"
      />

      <div
        className="fixed inset-0 z-[2000] w-full max-w-full h-full min-h-screen bg-white p-4 backdrop-blur-[15px]
                -translate-x-full opacity-0 transition-transform duration-300 ease-linear peer-checked:translate-x-0 peer-checked:opacity-100"
      >
        <label
          htmlFor="nav-mobile-input"
          className="absolute right-4 top-4 cursor-pointer"
        >
          <Image
            src="/icons/iconClose.svg"
            alt="close"
            width="19"
            height="19"
          />
        </label>

        <div className="text-4 font-bold text-gray-800 mb-6">LOGO SAMPLE</div>
        <ul className="flex flex-col gap-2 text-4 font-medium leading-6 opacity-90">
          {menu
            ? menu?.map((item) => (
                <li
                  key={item}
                  className="text-base text-[#562c2c] hover:text-[#8b5e3c] transition-colors duration-300"
                >
                  <a href="#">{item}</a>
                </li>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="w-[80px] h-[20px] bg-gray-500 bg-opacity-30 animate-pulse rounded"
                ></li>
              ))}
        </ul>

        <ul className="flex m-0 p-0 mt-10">
          {locales.map((locale: string, index) => (
            <li
              key={index}
              onClick={() => changeLocale(locale)}
              className={`pr-5 text-[18px] leading-[23.4px] font-medium cursor-pointer list-none border border-t-0 border-l-0 border-r-[1px] border-b-0 border-solid border-[#0000004D] ${
                index === 1 || index === 2 ? "px-5" : ""
              } ${index === 1 && "!border-r-0"} ${
                locale === selected ? "text-acent font-bold" : "text-main"
              }`}
            >
              {locale === "en" ? "English" : "French"}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
