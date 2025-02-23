"use client";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
dayjs.extend(localizedFormat);

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const busyDays = ["2025-01-28", "2025-01-29", "2025-04-02"]; // Danh sách ngày bận

export default function Calendar() {
  const [dayObj, setDayObj] = useState(dayjs().startOf("month"));
  const t = useTranslations();

  const daysInMonth = dayObj.daysInMonth();
  const startDayOfMonth = dayObj.day();

  const prevMonthDays = useMemo(() => {
    return [...Array(startDayOfMonth)].map((_, i) => {
      return dayObj.subtract(startDayOfMonth - i, "day");
    });
  }, [dayObj, startDayOfMonth]);

  const currentMonthDays = useMemo(() => {
    return [...Array(daysInMonth)].map((_, i) => {
      return dayObj.add(i, "day");
    });
  }, [dayObj, daysInMonth]);

  const nextMonthDays = useMemo(() => {
    const remaining = 7 - ((startDayOfMonth + daysInMonth) % 7);
    return remaining < 7
      ? [...Array(remaining)].map((_, i) => dayObj.add(daysInMonth + i, "day"))
      : [];
  }, [dayObj, startDayOfMonth, daysInMonth]);

  const isBusyDay = (date: dayjs.Dayjs) => {
    return busyDays.includes(date.format("YYYY-MM-DD"));
  };

  return (
    <div className="my-10 px-4 py-4 sm:px-6 sm:py-6 xl:px-8 rounded-[24px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)]">
      <div className="flex items-center justify-center gap-2">
        <button onClick={() => setDayObj(dayObj.subtract(1, "month"))}>
          <Image
            src="/images/arrow-left.png"
            alt="arrow-left"
            width="24"
            height="24"
          />
        </button>
        <span className="text-[20px] leading-6 font-medium">
          {dayObj.format("MMMM YYYY")}
        </span>
        <button onClick={() => setDayObj(dayObj.add(1, "month"))}>
          <Image
            src="/images/arrow-right.png"
            alt="arrow-right"
            width="24"
            height="24"
          />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-3 mt-6 sm:mt-5 md:mt-6 xl:mt-8 text-center">
        {weekDays.map((item) => (
          <div
            key={item}
            className="w-auto h-6 flex justify-center items-center text-center text-[18px] font-semibold leading-[24px] tracking-[-0.126px]"
          >
            {item}
          </div>
        ))}

        {prevMonthDays.map((date, i) => (
          <div
            key={`prev-${i}`}
            className="flex flex-col gap-2 justify-center items-center p-2 sm:p-3 xl:py-2 xl:px-4 font-normal w-full text-[14px] rounded-md border border-[#DFDFDF] bg-[#F5F5F5]"
          >
            <span className="text-[14px] sm:text-[18px] lg:text-[20px] leading-5 sm:leading-[18px] md:leading-[18px] xl:leading-6 font-semibold text-[#ccc]">
              {date.date()}
            </span>
            <span className="hidden sm:block text-[16px] sm:text-[18px] sm:leading-6 md:leading-5 xl:leading-6 h-6 text-[#999] w-full"></span>
          </div>
        ))}

        {currentMonthDays.map((date) => (
          <div
            key={date.format("YYYY-MM-DD")}
            className={`flex flex-col gap-2 justify-center items-center p-2 sm:p-3 xl:py-2 xl:px-4 font-normal w-full text-[14px] rounded-md border ${
              !isBusyDay(date)
                ? "text-[#562C2C] font-semibold border-[#F2542D] bg-[#FFF4F1] cursor-pointer"
                : "text-[#999] hover:bg-gray-200"
            }`}
          >
            <span
              className={`text-[14px] sm:text-[18px] lg:text-[20px] leading-5 sm:leading-[18px] md:leading-[18px] xl:leading-6 font-semibold ${
                !isBusyDay(date) ? "text-main" : "text-[#999]"
              }`}
            >
              {date.date()}
            </span>
            <span
              className={`hidden sm:block text-[16px] sm:text-[18px] sm:leading-6 md:leading-5 xl:leading-6 h-6 w-full ${
                !isBusyDay(date) ? "text-acent" : "text-[#AAA]"
              }`}
            >
              {!isBusyDay(date) ? t("Free") : t("Busy")}
            </span>
          </div>
        ))}

        {nextMonthDays.map((date, i) => (
          <div
            key={`next-${i}`}
            className="flex flex-col gap-2 justify-center items-center p-2 sm:p-3 xl:py-2 xl:px-4 font-normal w-full text-[14px] rounded-md border border-[#DFDFDF] bg-[#F5F5F5]"
          >
            <span className="text-[14px] sm:text-[18px] lg:text-[20px] leading-5 sm:leading-[18px] md:leading-[18px] xl:leading-6 font-semibold text-[#ccc]">
              {date.date()}
            </span>
            <span className="hidden sm:block text-[16px] sm:text-[18px] sm:leading-6 md:leading-5 xl:leading-6 h-6 text-[#999] w-full"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
