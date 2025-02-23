'use client'

import { locales } from '@/i18n/config'
import { setUserLocale } from '@/lib/services/locale'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState, useTransition } from 'react'

export default function LocaleSwicher() {
  const currentLocale = useLocale()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition()

  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState(currentLocale)

  const dropdownRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const changeLocale = (locale: string) => {
    if (locale) {
      startTransition(() => {
        setSelected(locale)
        setIsActive(!isActive)
        setUserLocale(locale)
      })
    }
  }

  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsActive(!isActive)
        }}
        className="flex items-center gap-2.5 cursor-pointer px-3 py-2 rounded-md bg-[#333] hover:bg-[#444] transition-all duration-200 ease-in-out"
      >
        <span className="text-[14px] uppercase cursor-pointer text-white font-medium">
          {selected === 'en' ? 'English' : 'French'}
        </span>
        <span className="relative w-3 h-3">
          <Image
            src={isActive ? '/icons/arrow_top_dark.svg' : '/icons/arrow_bottom_dark.svg'}
            quality={100}
            fill
            alt="icon_dropdown"
            className="transition-transform duration-200 ease-in-out"
          />
        </span>
      </div>
      {isActive && (
        <ul
          ref={dropdownRef}
          className="absolute top-[110%] right-0 bg-[#2f2f2f] shadow-lg rounded-md p-2 w-28
                     flex flex-col items-center transform scale-95 origin-top-right
                     transition-transform duration-200 ease-in-out animate-fade-in"
        >
          {locales.map((locale: string, index) => (
            <li
              key={index}
              onClick={() => changeLocale(locale)}
              className={`w-full text-center py-2 rounded-md cursor-pointer text-[14px] font-medium transition-all duration-150
                ${
                  locale === selected
                    ? 'bg-[#f2f2f2] text-[#645c59]'
                    : 'text-white hover:bg-[#3f3f3f]'
                }`}
            >
              {locale === 'en' ? 'English' : 'French'}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
