'use client'

import { VideoSlider } from '@/app/components'
import { videoData } from '@/app/constants'
import { SuccessRateData } from '@/app/types/sanity'

interface Props {
  data?: SuccessRateData
}

export default function SuccessRate({ data }: Props) {
  const sectionData = data || {
    title: `Our students' success rate is unmatched`,
    description: '',
    videos: videoData.map((card, index) => ({ _key: `card-${index}`, ...card }))
  }

  const videos = sectionData.videos || videoData.map((card, index) => ({ _key: `card-${index}`, ...card }))

  return (
    <section className='bg-black py-10 md:py-20 px-4'>
      <h2 className='text-3xl lg:text-8xl sm:text-5xl text-white max-w-7xl text-center mx-auto leading-tight mt-10 md:mt-20 mb-10 md:mb-20'>
        Our students&apos; success rate is unmatched
      </h2>
      <VideoSlider videos={videos} />
    </section>
  )
}
