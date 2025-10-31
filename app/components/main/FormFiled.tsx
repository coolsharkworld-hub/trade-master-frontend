'use client'

import { FormData, FormField as FormFieldType } from '@/app/types'

interface FormFieldProps {
  field: FormFieldType
  value: string
  error?: string
  dark?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormField = ({ field, value, error, dark = false, onChange }: FormFieldProps) => {
  return (
    <div className='relative w-full'>
      <input
        type={field.type}
        id={field.id}
        name={field.name}
        value={value}
        onChange={onChange}
        placeholder=' '
        required={field.required}
        className={`peer block w-full border-b border-gray-400 focus:border-blue-500 focus:ring-0 outline-none py-3 text-${dark ? 'black' : 'white'} text-xl bg-transparent`}
      />
      <label
        htmlFor={field.id}
        className={
          value
            ? `absolute left-0 top-2 text-${dark ? 'black' : 'white'} top-[-0.8rem] text-lg text-gray-500`
            : `absolute left-0 top-2 text-${dark ? 'black' : 'white'} text-xl transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-xl peer-focus:top-[-0.8rem] peer-focus:text-lg peer-focus:text-gray-500`
        }
      >
        {field.label}
      </label>
      {error && <label>{error}</label>}
    </div>
  )
}

export default FormField
