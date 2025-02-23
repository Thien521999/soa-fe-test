'use client'

import { useFormContext } from 'react-hook-form'

interface TextInputProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  className?: string
}

export default function TextInput({
  name,
  label,
  type = 'text',
  placeholder,
  className,
}: TextInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[16px] sm:text-[20px] lg:text-[24px] capitalize w-20 sm:w-[100px] md:w-[120px]">
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="flex-1 w-full text-[14px] sm:text-[16px] md:text-[18px] h-10 sm:h-12 md:h-[51px] px-4 py-2 sm:px-4 sm:py-3 font-normal placeholder:text-[#AAA] placeholder:font-normal rounded-[123px] border border-[rgba(86,44,44,0.30)] bg-white shadow-[0px_0px_30px_0px_rgba(242,84,45,0.10)] focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>}
    </div>
  )
}
