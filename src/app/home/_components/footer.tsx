"use client";
import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };
  return (
    <footer className="bg-main py-8 sm:py-10 xl:py-[56px]">
      <div className="ct-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-white text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start justify-center mt-10 sm:mt-0 text-[16] xl:text-[18px] xl:leading-6 text-center sm:text-left">
            <div>{data?.payload[0]?.footer.address.name}</div>
            <div>{data?.payload[0]?.footer.address.phone}</div>
            <div>{data?.payload[0]?.footer.address.location}</div>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-[50px]">
            {data?.payload[0]?.footer.links.map((item) => (
              <li
                key={item.name}
                className="text-[16] xl:text-[18px] opacity-60"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-x-5">
            {data?.payload[0]?.banner_title?.map((item) => (
              <li key={item} className="text-[16] xl:text-[18px] opacity-60">
                {item}
              </li>
            ))}
          </ul>

          <ul className="sm:hidden flex items-center justify-center gap-4">
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/instagram.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/youtube.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
          </ul>
        </div>
        <div className="mt-8 mb-6 xl:mt-[56px] sm:mt-10 sm:mb-6 xl:mb-8 block w-full h-[1px] bg-[#BBB]"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <Image
            src="/images/footer_bottom_text.png"
            alt="bg_footer"
            width="120"
            height="27"
          />
          <ul className="hidden sm:flex items-center justify-center gap-4">
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/instagram.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
            <li className="bg-acent w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/icons/youtube.svg"
                alt="facebook"
                width="24"
                height="24"
              />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
