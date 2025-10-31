'use client'

import Autoplay from 'embla-carousel-autoplay'

import useCarousel from 'embla-carousel-react'
import React from 'react'

import { Button, ReviewCard } from '@/app/components'
import { reviews } from '@/app/constants'
import { ReviewsData } from '@/app/types/sanity'

interface Props {
  data?: ReviewsData
}

export default function Reviews({ data }: Props) {
  const [carouselRef] = useCarousel(
    {
      loop: true
    },
    [Autoplay({ playOnInit: true, delay: 3000 })]
  )

  const sectionData = data || {
    title: 'AOD Reviews',
    description: 'What our students say about AOD',
    reviews: reviews.map((review, index) => ({ _key: `review-${index}`, ...review }))
  }

  const reviewItems = sectionData.reviews || reviews.map((review, index) => ({ _key: `review-${index}`, ...review }))

  return (
    <section className='flex flex-col py-20 items-center gap-10'>
      <h2 className='text-center lg:text-6xl text-4xl'>{sectionData.title}</h2>
      <div className='overflow-hidden w-full' ref={carouselRef}>
        <div className='flex'>
          {reviewItems.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
      <Button variant='primary'>View All Reviews</Button>
    </section>
  )
}
