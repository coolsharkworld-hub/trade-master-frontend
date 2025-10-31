import { PricingCard } from '@/app/components'
import { pricingItems } from '@/app/constants'
import { PricingData } from '@/app/types/sanity'

interface Props {
  data?: PricingData
}

export default function VisionSelection({ data }: Props) {
  // Use Sanity data or fallback to pricing items
  const sectionData = data || {
    title: `Whether you &apos;re a first-time filmmaker or have decades of experience, <span style="color: rgb(255, 162, 0);">AOD is for you</span>`,
    description: 'Turn your vision & passion into a reality',
    options: pricingItems.map((item, index) => ({ _key: `item-${index}`, ...item }))
  }

  // Check if we have vision options from Sanity
  const options = sectionData.options || pricingItems.map((item, index) => ({ _key: `item-${index}`, ...item }))

  return (
    <div className='px-4 md:px-6 pt-8 md:pt-14 pb-16 md:pb-30 bg-white'>
      <h2
        className='max-w-7xl mx-auto mt-10 md:mt-20 mb-6 md:mb-8 font-medium text-3xl lg:text-8xl sm:text-5xl text-black text-center'
        dangerouslySetInnerHTML={{ __html: sectionData.title }}
      />
      <p className='lg:text-2xl text-lg mx-auto text-center text-black leading-tight mb-8 md:mb-30'>
        {sectionData.description}
      </p>

      <div className='grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3 items-stretch'>
        {options.map((card, index) => (
          <PricingCard key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
