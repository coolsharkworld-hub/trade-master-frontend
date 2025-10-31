'use client'

interface Props {
  title: string
  description: string
}

export const PricingHeader = ({ title, description }: Props) => (
  <div className='text-center mb-8 md:mb-12'>
    <h2 className='text-3xl md:text-[80px] text-white mx-auto leading-tight mt-10 md:mt-20 mb-4 text-[32px]'>
      {title}
    </h2>
    <p className='text-gray-600 text-lg md:text-[26px]'>{description}</p>
  </div>
)
