'use client'

import LocaleSwicher from '@/components/ui/LocaleSwicher'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useAllPages } from '../../../queries/useHome'
import Menu from './menu'

interface PageData {
  payload: {
    head_menu: string[]
  }[]
}

export default function Header() {
  const lang = useLocale()

  const { data } = useAllPages(lang as 'en' | 'fr') as {
    data: PageData | undefined
    isPending: boolean
  }

  return (
    <div className="w-full">
      <header className="fixed top-0 left-0 w-full shadow-md z-[1000] h-[48px] sm:h-[60px] md:h-[56px] lg:h-[72px] border-b border-[rgba(238,238,238,0.20)] bg-[rgba(86,44,44,0.70)] backdrop-blur-[7.5px]">
        <nav className="max-w-[1304px] mx-auto flex justify-between items-center h-full px-4 sm:px-8 lg:px-8">
          {/* Logo */}
          <div className="pr-3 xl:pr-0 text-[10.5px] sm:text-[15px] md:text-[10.5px] lg:text-[15px] font-bold hover:opacity-80 text-white cursor-pointer">
            Logo 🍀
          </div>

          {/* List Item */}
          <ul className="hidden md:flex gap-6 text-4 font-medium text-white leading-6 opacity-90">
            {data
              ? data?.payload[0]?.head_menu?.map((item: string) => (
                  <li key={item} className="ct-top-menu-item">
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
          {/* List icon */}
          <div>
            <div className="hidden md:flex items-center gap-5">
              <ul className="flex gap-4">
                <li className="cursor-pointer">
                  <Image
                    src="/icons/Mountains.svg"
                    alt="Mountains"
                    width="28"
                    height="28"
                    priority
                  />
                </li>
                <li className="cursor-pointer">
                  <Image src="/icons/Fishing.svg" alt="Mountains" width="28" height="28" priority />
                </li>
                <li className="cursor-pointer">
                  <Image
                    src="/icons/Crosshair.svg"
                    alt="Crosshair"
                    width="28"
                    height="28"
                    priority
                  />
                </li>
              </ul>
              <LocaleSwicher />
            </div>
            {/* icon Menu */}
            <label htmlFor="nav-mobile-input">
              <Image
                src="/icons/menu.svg"
                alt="menu"
                width="24"
                height="24"
                className="block md:hidden"
              />
            </label>
          </div>
        </nav>
      </header>

      {/* Menu Mobile */}
      <Menu menu={data?.payload[0]?.head_menu as string[]} />

      {/* Image Full-width */}
      <section className="w-full min-h-screen relative">
        <Image src="/images/bg_home.jpg" alt="bg_home" fill className="object-cover" priority />

        {/* icons */}
        <ul className="absolute bottom-[60px] sm:bottom-16 xl:bottom-[120px] flex justify-around items-center max-w-[1304px] w-full left-1/2 -translate-x-1/2 px-4 sm:px-8 lg:px-8 pt-6 xl:pt-5  border-t border-[rgba(238,238,238,0.20)]">
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index}>
              <Image
                src="/icons/Mountains_big.svg"
                alt="Mountains"
                width="40"
                height="40"
                priority
                className="hidden sm:block"
              />
              <Image
                src="/icons/Mountains_big.svg"
                alt="Mountains"
                width="24"
                height="24"
                priority
                className="block sm:hidden"
              />
            </li>
          ))}
        </ul>

        <div className="absolute bottom-5 sm:bottom-10 lg:bottom-10 xl:bottom-20 right-4 sm:right-6 lg:right-6 xl:right-[148px] bg-acent rounded-full w-[34px] h-[34px] sm:w-14 sm:h-14 flex items-center justify-center cursor-pointer">
          <Image
            src="/icons/Chats.svg"
            alt="Chats"
            width="32"
            height="32"
            className="hidden sm:block"
          />
          <Image
            src="/icons/Chats.svg"
            alt="Chats"
            width="18"
            height="18"
            className="block sm:hidden"
          />
        </div>
      </section>
    </div>
  )
}
