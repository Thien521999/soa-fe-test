"use client";

import { PageData } from "@/lib/types/home";
import { useAllPages } from "@/queries/useHome";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function Map() {
  const t = useTranslations();

  const [selectedPoint, setSelectedPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scale, setScale] = useState(1);

  const lang = useLocale();
  const { data } = useAllPages(lang as "en" | "fr") as {
    data: PageData | undefined;
    isPending: boolean;
  };

  const points = [
    {
      id: "point1",
      name: "Eiffel Tower",
      x: 33,
      y: 42,
      src: "/images/MapPin.png",
      activities: ["Tour", "Photo"],
    },
    {
      id: "point2",
      name: "Louvre Museum",
      x: 30,
      y: 60,
      src: "/images/MapPin2.png",
      activities: ["Art", "History"],
    },
    {
      id: "point3",
      name: "Location 3",
      x: 50,
      y: 47,
      src: "/images/MapPin3.png",
      activities: ["Travel", "Ho Chi Minh"],
    },
  ];

  const handleZoom = (x: number, y: number) => {
    if (selectedPoint?.x === x && selectedPoint?.y === y) {
      // Reset nếu nhấn vào điểm đã chọn
      setSelectedPoint(null);
      setScale(1);
    } else {
      setSelectedPoint({ x, y });
      setScale(2);
    }
  };

  return (
    <section className="relative w-full h-[812px] sm:h-[958px] md:h-[970px] xl:h-[986px]">
      <div className="absolute z-[1] inset-0 opacity-[0.3] bg-[lightgray] bg-[length:140.897%_185.598%] bg-no-repeat bg-[-392.609px_-456px]"></div>
      <Image
        src="/images/bg_history.jpg"
        alt="bg_history"
        fill
        className="object-cover"
      />

      <div className="max-w-[1304px] px-4 sm:px-8 lg:px-8 relative z-[3] h-full w-full left-1/2 -translate-x-1/2 py-[60px]">
        <div className="flex flex-nowrap items-center justify-center gap-10 w-full">
          <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
          <h2 className="text-[24px] leading-normal sm:text-[32px] md:text-[40px] xl:text-[52px] font-semibold sm:leading-[60px] uppercase text-acent text-center max-w-full sm:max-w-[70%] whitespace-nowrap">
            {/* {data?.payload[0]?.bloc_2?.title} */}
            {t("Title2")}
          </h2>
          <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
        </div>
        <ul className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-5 py-5 sm:py-6 xl:py-8">
          {data?.payload[0]?.bloc_2?.cases?.map((item, index: number) => (
            <li className="ct-activite" key={item}>
              <Image
                src={
                  index === 0
                    ? "/icons/mountains_color.svg"
                    : index === 1
                    ? "/icons/whale.svg"
                    : "/icons/hunting.svg"
                }
                alt="AdventureTourism"
                width="25"
                height="25"
                className="object-cover w-5 h-5 sm:w-[25px] sm:height-[25px] rounded-lg"
              />
              <span className="ct-activite-text"> {item}</span>
            </li>
          ))}
        </ul>

        <motion.div
          animate={{
            // scale: scale,
            x: selectedPoint ? `${50 - selectedPoint.x}%` : "0%",
            y: selectedPoint ? `${50 - selectedPoint.y}%` : "0%",
            scale: selectedPoint ? 2 : 1, // Phóng nhưng không làm vỡ layout
            clipPath: selectedPoint
              ? "inset(25% 25% 25% 25%)" // Giữ phần trung tâm xung quanh điểm click
              : "inset(0% 0% 0% 0%)", // Hiển thị toàn bộ khi không chọn
          }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[550px] sm:h-[698px] overflow-hidden"
        >
          <Image
            src="/images/map.jpg"
            alt="map"
            fill
            className="object-cover rounded-lg"
            priority
          />

          <div className="flex items-center justify-center gap-2 absolute z-[5] top-4 left-4 bg-white/60 shadow-[0px_2px_10px_0px_rgba(51,51,51,0.1)] backdrop-blur-[7.5px] rounded-lg py-1 px-2.5">
            <Image
              src="/icons/sample.svg"
              alt="sample"
              width="40"
              height="40"
            />
            <h3 className="text-5 font-medium leading-5 text-main shadow-[0px_0px_8px_rgba(0,0,0,0.1)]">
              {t("Location")}
            </h3>
          </div>

          {points.map((point) => (
            <motion.div
              className="absolute w-8 h-[42px] cursor-pointer will-change-transform"
              style={{
                top: `${point.y}%`,
                left: `${point.x}%`,
                transform: selectedPoint ? "scale(1)" : "scale(1)", // Luôn giữ icon rõ
              }}
              onClick={() => handleZoom(point.x, point.y)}
              whileHover={{ scale: 1.2 }}
              key={point.id}
            >
              <Image
                src={point.src}
                alt="MapPin"
                width="32"
                height="42"
                className="will-change-transform"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Hiển thị thông tin khi chọn điểm */}
        {selectedPoint && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2  bg-white/90 border border-gray-200 shadow-xl backdrop-blur-lg rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-3"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[#562C2C] tracking-wide">
              {
                points.find(
                  (p) => p.x === selectedPoint.x && p.y === selectedPoint.y
                )?.name
              }
            </h3>
            <ul className="text-sm sm:text-base text-gray-700 space-y-1">
              {points
                .find((p) => p.x === selectedPoint.x && p.y === selectedPoint.y)
                ?.activities.map((activity) => (
                  <li key={activity} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {activity}
                  </li>
                ))}
            </ul>
            <button
              className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base font-medium rounded-lg shadow-md transition-all duration-200"
              onClick={() => handleZoom(selectedPoint.x, selectedPoint.y)}
            >
              {t("Close")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
