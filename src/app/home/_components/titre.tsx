"use client";

import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Titre() {
  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };

  return (
    <section>
      <div className="ct-container flex items-center justify-between w-full">
        <h3 className="text-[48px] text-acent font-semibold leading-[60px] uppercase">
          Titre
        </h3>
        <div className="absolu flex gap-1 text-[20px] font-medium leading-[30px] capitalize">
          En savoir plus
          <Image
            src="/icons/ArrowRight.svg"
            alt="ArrowRight"
            width="24"
            height="24"
          />
        </div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={56}
        loop={true}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {data &&
          data?.payload[0]?.bloc_3?.cases?.map((item) => (
            <SwiperSlide
              key={item.category}
              className="flex justify-center items-center"
            >
              <motion.div
                className="w-full h-full flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative w-[340px] h-[340px] flex flex-col items-center justify-center">
                  <Image
                    src="/images/avocado.jpg"
                    alt="avocado"
                    width={100}
                    height={200}
                    sizes="100vw"
                    className="w-[340px] h-[340px]"
                  />
                  <div className="mt-6">{item?.tagline}</div>
                  <div className="mt-2 mb-4">{item?.category}</div>
                  <div className="">{item?.description}</div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
