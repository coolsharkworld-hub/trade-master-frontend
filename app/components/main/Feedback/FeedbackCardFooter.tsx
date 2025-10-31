'use client'

import Image from 'next/image'

import Arrow from '@/app/assets/arrow.svg'
import Comment from '@/app/assets/comment.svg'
import Thumb from '@/app/assets/thumb.svg'

export const FeedbackCardFooter = () => (
  <div className='flex flex-row justify-between mt-8 px-4'>
    <Image src={Thumb} alt='Thumb' width={30} height={30} priority />
    <Image src={Comment} alt='Comment' width={30} height={30} priority />
    <Image src={Arrow} alt='Arrow' width={30} height={30} priority />
  </div>
)
