'use client'

import { PlayIcon } from 'lucide-react'
import { ArrowDown } from 'lucide-react'

import { Button } from '@/app/components'

interface CourseQuizData {
  title: string
  preRegisterButtonText: string
  watchTrailerButtonText: string
}

interface Props {
  data?: CourseQuizData
}

export default function Coursequiz({ data }: Props) {
  const courseQuizData = data || {
    title: 'Which course is right for you?',
    preRegisterButtonText: 'Pre-Register',
    watchTrailerButtonText: 'Watch Trailer'
  }

  return (
    <section className='cta-media lg:mt-10 py-22 relative h-screen w-full flex flex-col justify-center items-center px-2'>
      <div className='mb-10 z-10 relative'>
        <h2 className='lg:text-7xl text-3xl mx-auto text-center max-w-6xl font-bold'>{courseQuizData.title}</h2>
        <div className='overflow-hidden mt-15 w-[95vw]'>
          <div className='flex lg:flex-row flex-col items-center justify-center gap-5 w-full lg:max-w-2xl mx-auto'>
            <Button variant='primary' className='lg:w-1/2 text-sm w-full lg:text-xl' endIcon={<ArrowDown />}>
              {courseQuizData.preRegisterButtonText}
            </Button>
            <Button variant='primary' className='lg:w-1/2 w-full text-sm lg:text-xl' endIcon={<PlayIcon />}>
              {courseQuizData.watchTrailerButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
