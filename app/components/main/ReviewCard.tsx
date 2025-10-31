'use client'

import moment from 'moment'

import { StarIcon } from 'lucide-react'
import { FC, useState } from 'react'

import { ReviewData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

export const ReviewCard: FC<{ review: ReviewData }> = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='flex-[0_0_auto] mr-5 lg:w-[calc(420/var(--gfs)*1rem)] sm:w-[calc(320/var(--gfs)*1rem)] w-[calc(300/var(--gfs)*1rem)]'>
      <div className='flex flex-col items-start bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex items-center mb-4'>
          <img
            src={getImageUrl(review.user.avatar)}
            alt={`${review.user.name}'s avatar`}
            className='w-12 h-12 rounded-full mr-4'
          />
          <div>
            <h3 className='text-black text-lg font-semibold'>{review.user.name}</h3>
            <p className='text-gray-500 text-sm'>{moment(review.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className='text-gray-700 mb-4'>
          <p className={`overflow-hidden ${isExpanded ? '' : 'line-clamp-3'}`}>{review.text}</p>
          <button onClick={toggleReadMore} className='text-blue-500 mt-2 cursor-pointer'>
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex'>
            {Array.from({ length: review.rating }, (_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          <img src='/google.svg' alt='Google Logo' className='w-6 h-6' />
        </div>
      </div>
    </div>
  )
}
