'use client'

import clsx from 'clsx'

import { getImageUrl } from '@/sanity/lib/utils'

interface VisionCardData {
  id: number
  title: string
  description: string
  image:
    | string
    | {
        asset?: {
          _ref: string
          _type: 'reference'
          _weak?: boolean
        }
        media?: unknown
        hotspot?: {
          x: number
          y: number
          height: number
          width: number
        }
        crop?: {
          top: number
          bottom: number
          left: number
          right: number
        }
        alt?: string
        _type: 'image'
      }
}

interface VisionCardProps {
  card: VisionCardData
  className?: string
}

export const VisionCard = ({ card, className }: VisionCardProps) => {
  // Convert Sanity image object to URL
  const imageUrl = getImageUrl(card.image)

  return (
    <div className={clsx('relative group h-full flex flex-col cursor-pointer', className)}>
      <div className='relative border shadow-md overflow-hidden transition-shadow flex flex-col h-full pt-6 md:pt-8 border-black'>
        <div className='px-4 md:px-6 lg:px-8 mt-4 md:mt-6 flex-grow'>
          <h3 className='text-black text-2xl lg:text-4xl font-bold mb-4 leading-tight'>{card.title}</h3>
          <p className='text-gray-600 text-base lg:text-lg leading-relaxed'>{card.description}</p>
        </div>

        <div className='relative w-full flex-shrink-0'>
          <img
            src={imageUrl}
            alt={card.title}
            className='w-full object-cover pb-6 md:pb-10 transition-all mt-6 md:mt-10 h-52 md:h-72'
          />

          <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/100 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
      </div>
    </div>
  )
}
