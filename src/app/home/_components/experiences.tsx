"use client";

import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Experiences() {
  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-[1304px] px-0 sm:px-8 lg:px-8 w-full mx-auto"
    >
      <div className="hidden sm:flex gap-6">
        <div className="flex flex-col sm:gap-8 xl:gap-[60px]">
          <h3 className="sm:text-[32px] md:text-[40px] xl:text-[48px] font-semibold leading-[60px] uppercase text-acent w-[90%]">
            {data?.payload[0]?.bloc_4?.subtitle}
          </h3>
          <div className="flex gap-[48px] w-full">
            <Image
              src="/images/Line.png"
              alt="Line"
              width={81}
              height={1}
              className="w-[81px] h-[1px] mt-5 sm:hidden xl:block"
            />
            <div className="flex flex-col gap-[19px]">
              <div className="sm:text-[20px] md:text-6 xl:text-[28px] font-semibold capitalize flex gap-5 sm:gap-6 md:gap-8 items-center justify-center xl:block">
                <Image
                  src="/images/Line.png"
                  alt="Line"
                  width={81}
                  height={1}
                  className="w-[48px] h-[1px] hidden sm:block xl:hidden"
                />
                {data?.payload[0]?.bloc_4?.title}
              </div>
              <div className="sm:text-[16px] xl:text-[18px] sm:leading-6 xl:leading-[26px] text-[rgba(86,44,44,0.80)]">
                {data?.payload[0]?.bloc_4?.text}
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-full sm:w-[369px] sm:h-[524px] md:w-[403px] md:h-[412px] xl:w-[503px] xl:h-[574px] flex-shrink-0"
        >
          <Image
            src="/images/cream.jpg"
            alt="cream"
            width={503}
            height={574}
            className="w-full h-full object-cover rounded-[10px]"
          />
        </motion.div>
      </div>

      {/* mobile */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative block sm:hidden w-full h-[533px] flex-shrink-0 px-4 py-8"
      >
        <Image
          src="/images/cream.jpg"
          alt="cream"
          fill
          className="w-full h-full object-cover"
        />

        <div className="flex flex-col gap-8 rounded-[16px] bg-white/60 backdrop-blur-[7.5px] px-3 py-4">
          <h3 className="text-[24px] font-semibold uppercase text-acent">
            {data?.payload[0]?.bloc_4?.subtitle}
          </h3>
          <div className="flex flex-col gap-2 mt-6">
            <div className="text-[16px] font-semibold capitalize flex gap-2 items-center ">
              <Image
                src="/images/Line.png"
                alt="Line"
                width={1}
                height={24}
                className="w-[1px] h-[24px]"
              />
              {data?.payload[0]?.bloc_4?.title}
            </div>
            <div className="text-[14px] text-[rgba(86,44,44,0.80)]">
              {data?.payload[0]?.bloc_4?.text}
            </div>
          </div>
        </div>
      </motion.div>

      <ul className="flex flex-wrap items-center justify-center sm:justify-between gap-3 mt-5 sm:mt-8 md:mt-20 lg:mt-[82px]">
        {data?.payload[0]?.bloc_4?.pictos?.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center max-w-[200px]"
          >
            <div className="relative bg-[#0E9594] rounded-full w-10 h-10 sm:w-[44px] sm:h-[44px] md:w-[56px] md:h-[56px] xl:w-[58px] xl:h-[58px] flex items-center justify-center">
              <div className="absolute w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8">
                <Image
                  src={
                    index === 0
                      ? "/icons/authenticite.svg"
                      : index === 1
                      ? "/icons/respect.svg"
                      : index === 2
                      ? "/icons/disversite.svg"
                      : index === 3
                      ? "/icons/people.svg"
                      : "/icons/smile.svg"
                  }
                  alt="authenticite"
                  width="34"
                  height="34"
                />
              </div>
            </div>
            <span className=" mt-2 sm:mt-3 xl:mt-4 text-[16px] sm:text-[18px] md:text-[20px] xl:text-[24px] font-medium leading-8">
              {item.title}
            </span>
            <span className="mt-1 xl:mt-2 text-[14px] xl:text-[18px] text-[rgba(86, 44, 44, 0.80);] leading-6">
              {item.description}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
