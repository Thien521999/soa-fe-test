import { useTranslations } from "next-intl";
import Calendar from "./calendar";
import FormActivities from "./form-activities";

export default function Activities() {
  const t = useTranslations();
  return (
    <section className="ct-container">
      <div className="flex flex-nowrap items-center justify-center gap-10 w-full max-w-[80%] mx-auto">
        <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
        <h2 className="text-[24px] leading-normal sm:text-[32px] md:text-[40px] xl:text-[52px] font-semibold sm:leading-[60px] uppercase text-acent text-center max-w-full sm:max-w-[70%] whitespace-nowrap">
          {t("Our activities")}
        </h2>
        <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
      </div>
      <Calendar />
      <FormActivities />
    </section>
  );
}
