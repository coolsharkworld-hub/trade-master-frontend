'use client'

import Image from 'next/image'

import { CloseIcon, TickIcon } from '@/app/components'
import { FeatureData, PlanData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

import { FeatureRow } from './FeatureRow'

interface PricingComparisonTableProps {
  plans: PlanData[]
  features: FeatureData[]
}

export const PricingComparisonTable = ({ plans, features }: PricingComparisonTableProps) => {
  return (
    <div className='mx-auto px-4 py-8'>
      <div className='hidden md:grid md:grid-cols-[2fr_1fr_1fr] bg-black rounded-lg overflow-hidden gap-6 mx-4 md:mx-10'>
        <div className='border-b border-gray-700 h-[80px]' />

        {plans.map((plan, index) => (
          <div key={`${index}`} className='border-b border-gray-700 h-[80px] flex items-center justify-start'>
            {plan.image ? (
              <Image src={getImageUrl(plan.image)} alt='Logo' width={120} height={45} className='h-8 w-auto' />
            ) : (
              <p className='text-white text-5xl'>{plan.name}</p>
            )}
          </div>
        ))}

        <div className='pt-4 pr-2'>
          <p className='text-white text-6xl'>Price</p>
        </div>
        {plans.map((plan, index) => (
          <div key={`plan-${index}`} className='py-2'>
            {plan.name && <p className='text-gray-400 text-sm'>{plan.name}</p>}
            <p className='text-white text-6xl'>{plan.price}</p>
          </div>
        ))}

        {features.map((feature, index) => (
          <FeatureRow key={`feature-${index}`} feature={feature} plans={plans} />
        ))}
      </div>

      <div className='md:hidden space-y-8 mx-4'>
        {plans.map((plan, index) => (
          <div key={`mobile-${index}`} className='bg-black pt-6 border border-gray-700 rounded-lg'>
            <div className='flex items-center justify-center mb-6 mx-8'>
              {plan.image ? (
                <Image src={getImageUrl(plan.image)} alt='Logo' width={120} height={45} className='h-8 w-auto' />
              ) : (
                <p className='text-white text-4xl'>{plan.name}</p>
              )}
            </div>

            <div className='text-center mb-6 mx-8'>
              <p className='text-gray-400 text-sm'>{plan.priceLabel}</p>
              <p className='text-white text-4xl'>{plan.price}</p>
            </div>

            <hr className='h-px border-t-0 bg-gray-700' />

            <div className='divide-y divide-gray-700'>
              {features.map((feature, index) => (
                <div key={`mobile-feature-${plan.type}-${index}`} className='p-4 flex justify-between items-center'>
                  <p className='text-white text-base'>{feature.name}</p>
                  <div className='flex items-center gap-2'>
                    {feature[plan.type as keyof typeof feature] ? <TickIcon /> : <CloseIcon />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
