"use client";

import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Memory() {
  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-8 sm:py-12 md:py-[60px] bg-gradient-to-b from-[rgba(255,255,255,0)] to-white bg-[#EAFCFF]"
    >
      <div className="max-w-[1304px] px-0 sm:px-8 lg:px-8 w-full mx-auto">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-1 sm:gap-8 xl:gap-10">
          <p className="text-[14px] sm:text-[16px] xl:text-[18px] leading-6 xl:leading-[26px] text-[rgba(86, 44, 44, 0.80);] max-w-full sm:max-w-[392px] md:max-w-[478px] xl:max-w-[564px]">
            {data?.payload[0]?.bloc_3.title}
          </p>
          <p className="text-[24px] md:text-[40px] font-semibold leading-[42px] xl:leading-[54px] uppercase">
            {data?.payload[0]?.bloc_3?.more_info}{" "}
            <span className="text-acent">#BASIC</span>
          </p>
        </div>
        <div className="mt-8 mb-[22px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative w-full min-h-[400px] sm:min-h-[550px] md:min-h-[694px] h-[50vh] sm:h-[90vh] md:h-[694px] flex items-center justify-center"
          >
            {/* Background Image */}
            <Image
              src="/images/brooke-lark.jpg"
              fill
              className="object-cover rounded-[0px] sm:rounded-[20px]"
              alt="brooke-lark"
            />

            {/* Nội dung responsive */}
            <div className="absolute w-[90%] sm:w-[80%] xl:w-[1030px] h-auto xl:max-h-[590px] bg-white rounded-xl px-2.5 py-[6px]">
              <div className="relative w-full aspect-[16/9] xl:h-[463px]">
                <Image
                  src="/images/brooke-lark-in.jpg"
                  fill
                  className="object-cover rounded-[24px]"
                  alt="brooke-lark-in"
                />
              </div>

              <div className="px-[14px] pt-3">
                <div className="relative flex items-center justify-between">
                  <h4 className="text-[16px] xl:text-[24px] text-black font-semibold">
                    La famile
                  </h4>
                  <button className="w-auto text-black border border-[rgba(102, 102, 102, 0.10)] h-[42px] text-[14px] sm:text-[16px] md:text-[20px] px-2 py-1 sm:px-4 sm:py-[6px] rounded-[20px] flex items-center justify-center tracking-[-0.14px]">
                    24 Sep 2024
                  </button>
                </div>
                <p className="mt-1 text-[14px] sm:text-[16px] xl:text-[18px] leading-6 text-[#666] max-w-[660px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                  harum repellat saepe, tempore a natus! Aspernatur temporibus
                  libero,
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 px-4 sm:px-0">
          {data?.payload[0]?.bloc_3?.cases.map((item, index: number) => (
            <motion.li
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative w-full aspect-square"
            >
              <Image
                src={
                  index === 0
                    ? "/images/avocado.jpg"
                    : index === 1
                    ? "/images/apple.jpg"
                    : index === 2
                    ? "/images/orange.jpg"
                    : "/images/orange2.jpg"
                }
                fill
                className="object-cover rounded-[10px] sm:rounded-[20px] h-full"
                alt="brooke-lark-in"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className="absolute bottom-0 left-0 right-0 w-full h-8 sm:h-[54px] xl:h-[60px] bg-[rgba(86,44,44,0.60)] backdrop-blur-[2px] rounded-b-[10px] sm:rounded-b-[20px] p-2 sm:px-5 sm:py-4 flex items-center justify-between gap-3 xl:gap-4"
              >
                <p className="flex gap-2 items-center justify-start">
                  <Image
                    src={"/icons/Instagram.svg"}
                    width="28"
                    height="28"
                    className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px] xl:w-[28px] xl:h-[28px]"
                    alt="Instagram"
                  />
                  <span className="text-white font-medium text-[12px] sm:text-[16px] xl:text-[18px] line-clamp-1">
                    {item.category}
                  </span>
                </p>
                <Image
                  src="/icons/ArrowUpRightWhite.svg"
                  width="28"
                  height="28"
                  className="w-[16px] h-[16px] sm:w-[24px] sm:h-[24px] xl:w-[28px] xl:h-[28px]"
                  alt="ArrowUpRight"
                />
              </motion.div>
            </motion.li>
          ))}
        </ul>
        <p className="mt-8 xl:mt-12 text-[14px] xl:text-[24px] sm:text-center xl:text-left text-[#666] tracking-[-0.24px] px-4 sm:px-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          officiis veritatis labore? Ut eius quo.
        </p>
      </div>
    </motion.section>
  );
}
