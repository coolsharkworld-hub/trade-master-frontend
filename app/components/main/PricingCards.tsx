'use client'

import { PricingCard } from '@/app/components'
import { PriceOption } from '@/app/types/sanity'

interface PricingCardsProps {
  pricingItems: PriceOption[]
  className?: string
}

export const PricingCards = ({ pricingItems, className }: PricingCardsProps) => {
  return (
    <div className={`grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3 items-stretch ${className || ''}`}>
      {pricingItems.map(card => (
        <PricingCard key={card.id} card={card} />
      ))}
    </div>
  )
}
