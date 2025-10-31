'use client'

import { FC, useMemo, useRef } from 'react'

import clsx from 'clsx'

import { Faq } from '@/app/types/sanity'

interface FaqItemProps {
  item: Faq
  active: number
  index: number
  onToggle: (id: number) => void
}

export const FaqItem: FC<FaqItemProps> = ({ item, active, index, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const isActive = active === index

  const height = useMemo(
    () => (isActive && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0px'),
    [isActive]
  )

  if (!item) return

  return (
    <div>
      <button
        onClick={() => onToggle(index)}
        className={clsx(
          'relative flex w-full items-center py-4 text-left cursor-pointer gap-3',
          'after:content-[""] after:absolute after:inset-y-0 after:left-[calc(-12/var(--gfs)*1rem)] after:right-[calc(-12/var(--gfs)*1rem)] after:bg-young-night after:z-[-1]',
          'after:origin-top after:scale-y-0',
          'after:transition-transform after:duration-500 after:ease-[cubic-bezier(.4,.4,.1,1)]',
          'hover:after:scale-y-100',
          isActive && 'after:scale-y-100'
        )}
      >
        <div className={clsx('md:w-1/4 text-shade-grey transition-all text-nowrap', isActive && 'text-white')}>
          [ {index < 10 ? `0${index}` : index} ]
        </div>
        <h4 className='w-full md:w-2/4 text-xl'>{item.question}</h4>
        <div className='md:w-1/4 flex gap-5 items-center justify-end'>
          <div className={clsx('uppercase transition-all hidden md:block', isActive ? 'opacity-100' : 'opacity-0')}>
            View Less
          </div>
          <span className={clsx('text-nowrap text-right text-shade-grey flex gap-1', isActive && 'text-white')}>
            [
            <svg
              className={clsx('faq-item-icon', isActive && 'text-white active')}
              fill='none'
              height='14'
              viewBox='0 0 8 14'
              width='8'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='currentColor'>
                <path d='m7.5 6v1h-7v-1z'></path>
                <path d='m3.5 3h1v7h-1z'></path>
              </g>
            </svg>
            ]
          </span>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{ height }}
        className={clsx('overflow-hidden [transition:height_.6s_cubic-bezier(.4,.4,.1,1),opacity_.6s_linear] mb-5')}
      >
        <div className='md:ml-[25%]'>
          <div className='py-5 md:w-2/4'>{item.answer}</div>
          <hr className='text-carbon w-full' />
        </div>
      </div>
    </div>
  )
}
