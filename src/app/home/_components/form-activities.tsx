'use client'

import CustomButtom from '@/components/ui/CustomButton'
import EditorInput from '@/components/ui/EditorInput'
import SelectFile from '@/components/ui/SelectFile'
import TextInput from '@/components/ui/TextInput'
import { FormProvider, useForm } from 'react-hook-form'
import { useAllPages } from '@/queries/useHome'
import { useLocale } from 'next-intl'
import { PageData } from '@/lib/types/home'

export default function FormActivities() {
  const lang = useLocale()
  const { data } = useAllPages(lang as 'en' | 'fr') as {
    data: PageData | undefined
    isPending: boolean
  }
  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      content: '',
      file: '',
    },
    mode: 'onChange',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:gap-5 ">
        <TextInput
          name="name"
          label={`${data?.payload[0]?.bloc_2_2.btn_1[0]}:`}
          placeholder={data?.payload[0]?.bloc_2_2.btn_1[1]}
          className="flex items-center justify-center gap-4"
        />
        <TextInput
          name="email"
          type="email"
          label={`${data?.payload[0]?.bloc_2_2.btn_2[0]}:`}
          placeholder={`${data?.payload[0]?.bloc_2_2.btn_2[1]}:`}
          className="flex items-center justify-center gap-4"
        />

        <EditorInput
          name="content"
          label={`${data?.payload[0]?.bloc_2_2.btn_3}:`}
          className="flex items-center justify-center gap-4"
          placeholder="Write something here..."
        />

        <SelectFile
          name="file"
          label={`${data?.payload[0]?.bloc_2_2.btn_4[0]}:`}
          className="flex items-center justify-center gap-4"
          name1={data?.payload[0]?.bloc_2_2.btn_4[1] || 'Pièce jointe'}
          name2={data?.payload[0]?.bloc_2_2.btn_4[2] || 'Fichier PDF uniquement'}
        />

        <div className="flex gap-4 w-full justify-center sm:justify-end mt-6">
          <CustomButtom
            type="outlined"
            name={`${data?.payload[0]?.bloc_2_2.btn_5}`}
            className="w-full sm:w-[160px]"
          />
          <CustomButtom
            type="contained"
            name={`${data?.payload[0]?.bloc_2_2.btn_6}`}
            isIcon
            className="w-full sm:w-[160px]"
            isSubmit
          />
        </div>
      </form>
    </FormProvider>
  )
}
