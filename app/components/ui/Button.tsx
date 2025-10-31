'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'

type ButtonVariant = 'primary' | 'outlined' | 'static' | 'ordinary' | 'blue'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  endIcon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, variant = 'ordinary', endIcon, className, ...props }: ButtonProps) => {
  const baseStyles = clsx(
    'relative flex items-center justify-center',
    'gap-2',
    'lg:px-8 px-3 py-2',
    'rounded-full cursor-pointer uppercase overflow-clip outline transition-colors duration-[350ms] ease-linear',
    className
  )

  const variantStyles = {
    outlined: clsx(
      'text-white ',
      'outline-divider2',
      "before:content-[''] before:absolute before:top-[-1%] before:bottom-[-1%]",
      'before:left-[calc(-1/var(--gfs)*1rem)] before:right-[calc(-1/var(--gfs)*1rem)] before:h-[102%] before:bg-primary',
      'before:scale-y-0 before:origin-top before:transition-transform before:duration-[500ms]',
      'before:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]',
      'hover:text-black hover:before:scale-y-[1.02] hover:before:origin-bottom'
    ),
    primary: clsx(
      'text-black',
      'outline-divider2',
      "before:content-[''] before:absolute before:top-[-1%] before:bottom-[-1%] bg-primary",
      'before:left-[calc(-1/var(--gfs)*1rem)] before:right-[calc(-1/var(--gfs)*1rem)] before:h-[102%] before:bg-white',
      'before:scale-y-0 before:origin-top before:transition-transform before:duration-[500ms]',
      'before:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]',
      'hover:text-black hover:before:scale-y-[1.02] hover:before:origin-bottom'
    ),
    static: clsx(
      'text-black ',
      'outline-divider2',
      "before:content-[''] before:absolute before:top-[-1%] before:bottom-[-1%] bg-white",
      'before:left-[calc(-1/var(--gfs)*1rem)] before:right-[calc(-1/var(--gfs)*1rem)] before:h-[102%] before:bg-primary',
      'before:scale-y-0 before:origin-top before:transition-transform before:duration-[500ms]',
      'before:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]',
      'hover:text-black hover:before:scale-y-[1.02] hover:before:origin-bottom'
    ),
    ordinary: clsx('text-black', 'bg-white', 'hover:bg-gray-100', 'outline-none before:hidden'),
    blue: clsx(
      'text-black ',
      'outline-divider2',
      "before:content-[''] before:absolute before:top-[-1%] before:bottom-[-1%] bg-primary",
      'before:left-[calc(-1/var(--gfs)*1rem)] before:right-[calc(-1/var(--gfs)*1rem)] before:h-[102%] before:bg-black',
      'before:scale-y-0 before:origin-top before:transition-transform before:duration-[500ms]',
      'before:[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]',
      'hover:text-white hover:before:scale-y-[1.02] hover:before:origin-bottom'
    )
  }

  return (
    <button className={clsx(baseStyles, variantStyles[variant])} {...props}>
      <span className='z-[1] flex items-center gap-2 tracking-wide font-Founders Grotesk Mono'>
        {children}
        {endIcon && <span className='flex-shrink-0'>{endIcon}</span>}
      </span>
    </button>
  )
}
