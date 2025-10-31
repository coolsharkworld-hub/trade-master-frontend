'use client'

import { PricingComparisonTable, PricingHeader } from '@/app/components'
import { pricingData } from '@/app/constants'
import { PricingTablesData } from '@/app/types/sanity'

interface Props {
  data?: PricingTablesData
}

const PricingTable = ({ data }: Props) => {
  const sectionData = data || {
    title: `"I learnt more in the first 5 videos of AOD than 2 years of film school"`,
    description: `- Jordan S`,
    plans: pricingData.plans.map((plan, index) => ({ _key: `plan-${index}`, ...plan })),
    features: pricingData.features.map((feature, index) => ({ _key: `feature-${index}`, ...feature }))
  }

  const plans = sectionData.plans || pricingData.plans.map((plan, index) => ({ _key: `plan-${index}`, ...plan }))
  const features =
    sectionData.features || pricingData.features.map((feature, index) => ({ _key: `feature-${index}`, ...feature }))

  return (
    <div className='max-w-[1440px] mx-auto px-4 py-8'>
      <PricingHeader title={sectionData.title} description={sectionData.description} />
      <PricingComparisonTable plans={plans} features={features} />
    </div>
  )
}

export default PricingTable
