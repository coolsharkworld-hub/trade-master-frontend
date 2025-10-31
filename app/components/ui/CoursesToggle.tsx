'use client'

import { ReactNode, useState } from 'react'

import clsx from 'clsx'

interface ToggleOption {
  label: string
  value: number
}

interface CoursesToggleProps {
  options?: ToggleOption[]
  defaultValue?: number
  onChange?: (value: number) => void
  className?: string
  activeClassName?: string
  icon?: ReactNode
  showIcon?: boolean
}

export const CoursesToggle = ({
  options = [
    { label: 'Editorial', value: 0 },
    { label: 'Grid', value: 1 }
  ],
  defaultValue = 0,
  onChange,
  className = '',
  activeClassName = 'courses-active',
  icon = (
    <svg
      className='w-5 h-3.5'
      fill='none'
      height='14'
      viewBox='0 0 19 14'
      width='19'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='currentColor'>
        <path d='m4 11.5h-2.81651v-10h2.81651v-1h-4v12h4z' />
        <circle cx='9.5' cy='6.5' r='2' className='hidden' />
        <path d='m15 11.5h2.8165v-10h-2.8165v-1h4v12h-4z' />
      </g>
    </svg>
  ),
  showIcon = true
}: CoursesToggleProps) => {
  const [activeToggle, setActiveToggle] = useState(defaultValue)

  const handleToggle = (value: number) => {
    setActiveToggle(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={`courses-toggle flex ${className}`}>
      {options.map((option, index) => (
        <div
          key={index}
          className={clsx('text-tangle-web p-3 flex items-center gap-1 cursor-pointer', {
            [activeClassName]: activeToggle === option.value
          })}
          onClick={() => handleToggle(option.value)}
        >
          {showIcon && icon}
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  )
}
