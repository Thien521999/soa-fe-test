'use client'

import Image from 'next/image'

interface CustomButtonProps {
  type?: 'contained' | 'outlined'
  onClick?: () => void
  disabled?: boolean
  name: string
  className?: string
  isIcon?: boolean
  isSubmit?: boolean
}

export default function CustomButton({
  type = 'contained',
  onClick,
  disabled = false,
  name,
  className,
  isIcon,
  isSubmit,
}: CustomButtonProps) {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-full py-2 sm:py-2.5 px-4 xl:py-3 rounded-[33px] text-[16px] sm:text-[18px] leading-6 md:leading-5 xl:leading-6 h-10 md:h-[44px] xl:h-12 capitalize font-medium transition-all duration-300
        ${type === 'contained' ? 'bg-acent text-white hover:opacity-80 outline-none' : ''}
        ${type === 'outlined' ? 'border border-acent text-main hover:opacity-80' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {name}
      {isIcon && (
        <Image src="/icons/send.svg" alt="Paperclip" width="24" height="24" className="pl-2" />
      )}
    </button>
  )
}
