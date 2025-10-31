'use client'

import clsx from 'clsx'

import { MarqueeInlineAnimation } from '@/app/components'
import { PriceOption } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface PricingCardProps {
  card: PriceOption
  className?: string
}

export const PricingCard = ({ card, className }: PricingCardProps) => {
  const isBestValue = card.badge === 'Best Value'

  // Convert Sanity image object to URL
  const imageUrl = getImageUrl(card.image)

  return (
    <div className={clsx('relative group h-full flex flex-col cursor-pointer', className)}>
      <span
        className={clsx(
          'absolute -top-5 md:-top-7 left-4 md:left-10 text-lg lg:text-2xl px-3 md:px-4 py-1 md:py-2 rounded-full z-10 border-white border-10',
          isBestValue ? 'bg-primary' : 'bg-black',
          isBestValue ? 'text-black' : 'text-white'
        )}
      >
        {card.badge}
      </span>

      <div
        className={clsx(
          'relative border shadow-md overflow-hidden transition-shadow flex flex-col h-full pt-6 md:pt-8',
          isBestValue ? 'border-primary' : 'border-black'
        )}
      >
        <div className='px-4 md:px-6 lg:px-8 mt-4 md:mt-6 flex-grow'>
          <p className='text-gray-500 text-sm md:text-base lg:text-lg leading-tight'>{card.payments}</p>
          <p className='text-black tracking-[-0.05em] lg:text-8xl sm:text-5xl leading-none'>${card.price}</p>
          <p className='text-black text-2xl lg:text-5xl max-w-100 leading-tight'>{card.accessRole}</p>
        </div>

        {card.savedPrice && <MarqueeInlineAnimation price={card.savedPrice} isBestValue={isBestValue} />}

        <div className='relative w-full flex-shrink-0'>
          <img
            src={imageUrl}
            alt={card.badge}
            className={clsx(
              'w-full object-contain pb-6 md:pb-10 transition-all mt-6 md:mt-10',
              card.savedPrice ? 'h-60 md:h-72' : 'h-60 md:h-96'
            )}
          />

          <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/100 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
        </div>
      </div>
    </div>
  )
}
