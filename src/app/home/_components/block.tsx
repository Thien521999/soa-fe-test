'use client'
import { PageData } from '@/lib/types/home'
import { useAllPages } from '@/queries/useHome'
import { useLocale } from 'next-intl'
import Image from 'next/image'

export default function Block() {
  const lang = useLocale()
  const { data } = useAllPages(lang as 'en' | 'fr') as {
    data: PageData | undefined
    isPending: boolean
  }
  return (
    <section className="pt-20 ct-container">
      <div className="flex flex-nowrap items-center justify-center gap-10 w-full">
        <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
        <h2 className="text-[24px] leading-normal sm:text-[32px] md:text-[40px] xl:text-[52px] font-semibold sm:leading-[60px] uppercase text-acent text-center break-words max-w-full sm:max-w-[70%]">
          {data?.payload[0]?.bloc_1?.title}
        </h2>
        <div className="hidden sm:block w-full h-[1px] bg-[#BBB]"></div>
      </div>
      <div className="mt-4 mb-20 text-[24px] leading-[30px] text-center w-full">
        {data?.payload[0]?.bloc_1?.subtitle}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 xl:gap-6">
        {data?.payload[0]?.bloc_1?.cases?.map((item, index: number) => (
          <li
            key={item.category}
            // className="flex flex-col"
            className={`flex flex-col ${
              index === 1 ? 'sm:-translate-y-8 md:-translate-y-[45px]' : ''
            }`}
          >
            <div className="relative w-full aspect-square flex">
              <Image
                src="/images/fruit.jpg"
                alt="fruit"
                fill
                className="object-cover rounded-lg h-full"
                priority
              />
            </div>
            <div className="mt-4 text-left">
              <h4 className="text-[12px] sm:text-[16px] md:text-[18px] xl:text-[20px] xl:mt-6 xl:mb-1 text-acent font-medium">
                {item.tagline}
              </h4>
              <h3 className="text-[16px] sm:text-[20px] md:text-[24px] xl:text-[28px] leading-8 font-medium">
                {item.category}
              </h3>
              <h5 className="mt-2 xl:mt-4 text-[14px] sm:text-[16px] md:text-[18px] text-[rgba(86,44,44,0.80)] leading-6">
                {item.description}
              </h5>
            </div>
            <button className="inline-flex items-center justify-center max-w-max gap-2 px-3 py-2 sm:px-4 sm:py-2.5 xl:px-4 xl:py-2.5 mt-[35px] sm:mt-4 xl:mt-6 rounded-[100px] border border-[rgba(86,44,44,0.30)]  text-[16px] xl:text-[18px] font-medium leading-5 capitalize w-auto">
              {item.cta}
              <Image src="/icons/ArrowUpRight.svg" alt="ArrowUpRight" width="20" height="20" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
