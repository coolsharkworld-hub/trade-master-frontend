'use client'

import { FC } from 'react'

import { TestimonialData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface Props {
  testimonial: TestimonialData
}

export const TestimonialCard: FC<Props> = ({ testimonial }) => {
  return (
    <div className='max-w-2xl p-5 lg:p-15 border border-carbon'>
      <img
        src={getImageUrl(testimonial.avatar)}
        alt={testimonial.name}
        className='overflow-hidden rounded-full mb-2 w-30 h-30 object-cover'
      />
      <h5 className='lg:text-5xl  sm:text-3xl  mb-6'>{testimonial.name}&apos; success:</h5>
      <div className='md:text-2xl text-2xl gap-4 mb-16 mt-5 flex flex-col leading-8'>
        <p className='my-4'>{testimonial.quote}</p>
        <a
          className='text-sonic-silver hover:text-white transition-colors mb-10'
          target='_blank'
          href={testimonial.instagram}
        >
          -{testimonial.name}
        </a>
      </div>
      <ul>
        {testimonial?.list?.map((item, index) => (
          <li className='border-divider border-t py-5 flex items-center gap-35' key={`testimonial-list-${index}`}>
            <div className='text-nowrap lg:text-2xl text-lg text-sonic-silver'>
              [ {index + 1 < 10 ? `0${index + 1}` : index + 1} ]
            </div>
            <div className='lg:text-3xl text-2xl' dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  )
}
