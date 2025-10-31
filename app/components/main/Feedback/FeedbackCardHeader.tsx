import Image from 'next/image'

import Social from '@/app/assets/social.svg'

interface FeedbackCardHeaderProps {
  name: string
  createdDate: string
  logo?: string
}

export const FeedbackCardHeader = ({ logo, name, createdDate }: FeedbackCardHeaderProps) => {
  const formattedDate = new Date(createdDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className='flex items-center gap-4 mb-4'>
      <div className='rounded-full border border-gray-800 p-1 flex w-14 h-14'>
        <Image src='/logo.svg' alt='Logo' width={50} height={50} priority />
      </div>
      <div className='flex flex-col'>
        <h4 className='text-white font-semibold text-lg sm:text-sm md:text-base lg:text-lg'>{name}</h4>
        <div className='flex items-center gap-2'>
          <p className='text-gray-400 sm:text-xs md:text-sm'>{formattedDate}</p>
          <span className='text-gray-400 text-sm'>•</span>
          <Image src={Social} alt='Social' width={16} height={16} priority />
        </div>
      </div>
    </div>
  )
}
