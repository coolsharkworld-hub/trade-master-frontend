'use client'

import { FeedBackData } from '@/app/types/sanity'

import { FeedbackCardFooter } from './FeedbackCardFooter'
import { FeedbackCardHeader } from './FeedbackCardHeader'

export const FeedbackCard = ({
  title,
  isVideo,
  videoLink,
  name = '',
  createdDate = '',
  content = '',
  imageLink
}: FeedBackData) => {
  return (
    <div className='flex flex-col h-full w-full'>
      <h3 className='text-white text-center text-2xl sm:text-xl lg:text-5xl'>{title}</h3>
      <div className='relative group h-full flex flex-col cursor-pointer border border-gray-800 shadow-md overflow-hidden transition-shadow hover:shadow-lg bg-black rounded-md mt-4'>
        {isVideo ? (
          <div className='w-full h-full aspect-video min-h-52 sm:min-h-80'>
            <video src={videoLink} autoPlay muted loop playsInline className='w-full h-full object-cover rounded-md' />
          </div>
        ) : (
          <div className='pt-6 pb-4 px-4 flex flex-col h-full w-full'>
            <FeedbackCardHeader name={name} createdDate={createdDate} />
            <p className='text-white mb-4 leading-tight lg:text-2xl md:text-lg sm:text-base'>{content}</p>

            {imageLink && (
              <div className='mt-auto w-full flex-1 relative sm:-mx-6 sm:mb-[-1.5rem] min-h-52 sm:min-h-80'>
                <img src={imageLink} alt='Content visual' className='w-full h-full object-cover rounded-b-md' />
              </div>
            )}

            <FeedbackCardFooter />
          </div>
        )}
      </div>
    </div>
  )
}
