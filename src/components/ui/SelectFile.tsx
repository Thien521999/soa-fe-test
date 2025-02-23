'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface SelectFileProps {
  name: string
  label?: string
  className?: string
  name1?: string
  name2?: string
}

export default function SelectFile({ name, label, className, name1, name2 }: SelectFileProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed.')
        return
      }
      setValue(name, file)
      setFileName(file.name)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[16px] sm:text-[20px] lg:text-[24px] capitalize w-20 sm:w-[100px] md:w-[120px]">
          {label}
        </label>
      )}

      <div className="flex-1">
        <input
          type="file"
          accept="application/pdf"
          {...register(name, { required: 'PDF file is required' })}
          onChange={handleFileChange}
          className="hidden"
          id={name}
        />

        <div className="flex flex-col sm:flex-row gap-[2px] sm:gap-0">
          <label htmlFor={name} className="flex items-center gap-[2px] cursor-pointer">
            <Image src="/icons/Paperclip.svg" alt="Paperclip" width="32" height="32" />
            <span className="text-5 font-medium text-[#1E88F9] tracking-[-0.14px]">{name1}</span>
          </label>
          <span className="text-[18px] text-[#999] sm:pl-3 tracking-[-0.126px]">
            {`(*${name2})`}
          </span>
        </div>

        {fileName && <p className="mt-2 text-gray-600 text-sm">Selected: {fileName}</p>}
        {errors[name] && (
          <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>
        )}
      </div>
    </div>
  )
}
