'use client'

import { CloseIcon, TickIcon } from '@/app/components'
import { FeatureData, PlanData } from '@/app/types/sanity'

interface FeatureRowProps {
  feature: FeatureData
  plans: PlanData[]
}

export const FeatureRow = ({ feature, plans }: FeatureRowProps) => {
  return (
    <>
      <div className='pt-4 pr-2 border-t border-gray-700'>
        <p className='text-white text-[26px] leading-snug'>{feature.name}</p>
      </div>

      {plans.map((plan, index) => (
        <div key={`feature-${index}`} className='pt-4 px-2 border-t border-gray-700 flex items-center'>
          <div className='flex flex-col'>
            {feature[plan.type as keyof typeof feature] ? <TickIcon /> : <CloseIcon />}
          </div>
        </div>
      ))}
    </>
  )
}
