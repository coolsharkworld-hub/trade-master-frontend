'use client'

import React, { useState } from 'react'

import { FaqItem } from '@/app/components'
import { faqs } from '@/app/constants'

import { FaqData } from '../types/sanity'

interface Props {
  data: FaqData
}

export const FaqSection: React.FC<Props> = ({ data }) => {
  const [active, setActive] = useState<number>(0)

  const onToggle = (id: number) => {
    if (id === active) {
      setActive(0)
    } else {
      setActive(id)
    }
  }

  return (
    <section aria-labelledby='faq-heading' className='px-6 py-5'>
      <div className='flex flex-col md:flex-row gap-2 justify-between'>
        <h1 className='text-primary uppercase text-xl mt-3 md:w-1/4'>{data.title || 'FAQ'}</h1>
        <h2 className='text-5xl md:text-7xl md:w-3/4'>{data.description || 'AOD’s Frequently Asked Questions'}</h2>
      </div>

      <div className='mt-20'>
        {(data.faqs || faqs).map((item, index) => (
          <FaqItem key={`faq-${index}`} index={index + 1} item={item} active={active} onToggle={onToggle} />
        ))}
      </div>
    </section>
  )
}
