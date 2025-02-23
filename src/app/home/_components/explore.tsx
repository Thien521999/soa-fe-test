"use client";

import CustomButtom from "@/components/ui/CustomButton";
import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Explore() {
  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };
  console.log(data);
  return (
    <aside className="bg-white">
      <section className="w-full h-[483px] sm:h-[524px] xl:h-[666px] relative flex items-center justify-center ">
        <Image
          src="/images/bg_footer.jpg"
          alt="bg_footer"
          fill
          className="object-cover"
        />

        <div className="ct-container absolute top-[40px] xl:top-[70px] flex flex-col items-center justify-center text-center">
          <div className="max-w-[80%] xl:max-w-[647px]">
            <h2 className="text-[24px] sm:text-[32px] xl:text-[52px] font-semibold capitalize leading-8 sm:leading-10 xl:leading-[60px] break-words">
              {data?.payload[0]?.bloc_6.title}
            </h2>
            <h2 className="text-[24px] sm:text-[32px] xl:text-[52px] font-semibold capitalize leading-8 sm:leading-10 xl:leading-[60px] opacity-50 break-words">
              {data?.payload[0]?.bloc_6.subtitle}
            </h2>
            <h4 className="mt-2 sm:mt-4 md:mt-6 mb-4 sm:mb-8 md:mb-10 text-[14px] sm:text-[16px] xl:text-[24px] break-words">
              {data?.payload[0]?.bloc_6.text}
            </h4>
            <CustomButtom
              type="contained"
              name={`${data?.payload[0]?.bloc_6.button}`}
              className="!w-[145px] xl:w-[152px] mx-auto"
            />
          </div>
        </div>
      </section>
    </aside>
  );
}
