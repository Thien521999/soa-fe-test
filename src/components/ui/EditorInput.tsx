'use client'

import dynamic from 'next/dynamic'
import { Controller, useFormContext } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'

// Load ReactQuill động để tránh lỗi SSR (Next.js)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditorInputProps {
  name: string
  label?: string
  placeholder?: string
  className?: string
}

export default function EditorInput({ name, label, placeholder, className }: EditorInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-[16px] sm:text-[20px] lg:text-[24px] capitalize w-20 sm:w-[100px] md:w-[120px]">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            {...field}
            theme="snow"
            placeholder={placeholder}
            className="border border-gray-300 rounded-md flex-1"
          />
        )}
      />

      {errors[name] && <p className="text-red-500 text-sm mt-1">{String(errors[name]?.message)}</p>}
    </div>
  )
}
