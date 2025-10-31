'use client'

import { ArrowRight, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/app/components'

interface Props {
  time: string
}

export const HeroCountDown = ({ time }: Props) => {
  const router = useRouter()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const formatNumber = (num: number) => num.toString().padStart(2, '0')

  useEffect(() => {
    const targetDate = new Date(time).getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [time])

  return (
    <div className='mt-8 py-6 lg:px-6 px-2 mx-3 mb-8 bg-inkwell-inception backdrop-blur-sm rounded-2xl'>
      <div className='text-primary lg:text-3xl text-xl lg:mx-30  mx-5 font-medium mb-4'>Pre-Registration Closes In</div>
      <hr className='text-divider mb-4' />
      <div className='flex items-center justify-between lg:space-x-4 space-x-2 mx-2 lg:mx-4'>
        <div className='text-center'>
          <div className='text-4xl lg:text-6xl text-white lg:px-3 lg:py-2 px-1 py-1 rounded'>
            {formatNumber(timeLeft.days)}
          </div>
          <div className='text-lg lg:text-2xl text-neutral-600 mt-1'>Days</div>
        </div>
        <div className='text-2xl lg:text-4xl text-white'>:</div>
        <div className='text-center'>
          <div className='text-4xl lg:text-6xl text-white lg:px-3 lg:py-2 px-1 py-1 rounded'>
            {formatNumber(timeLeft.hours)}
          </div>
          <div className='text-lg lg:text-2xl text-neutral-600 mt-1'>Hours</div>
        </div>
        <div className='text-2xl lg:text-4xl text-white'>:</div>
        <div className='text-center'>
          <div className='text-4xl lg:text-6xl text-white lg:px-3 lg:py-2 px-1 py-1 rounded'>
            {formatNumber(timeLeft.minutes)}
          </div>
          <div className='text-lg lg:text-2xl text-neutral-600 mt-1'>Minutes</div>
        </div>
        <div className='text-2xl lg:text-4xl text-white'>:</div>
        <div className='text-center'>
          <div className='text-4xl lg:text-6xl text-white lg:px-3 lg:py-2 px-1 py-1 rounded'>
            {formatNumber(timeLeft.seconds)}
          </div>
          <div className='text-lg lg:text-2xl text-neutral-600 mt-1'>Seconds</div>
        </div>
      </div>

      <div className='flex lg:flex-row flex-col items-center justify-center mt-10 gap-5 w-full'>
        <Button
          variant='primary'
          className='lg:w-1/2 text-sm w-full lg:text-xl'
          endIcon={<ArrowRight />}
          onClick={() => router.push('/register')}
        >
          Pre-Register
        </Button>
        <Button
          variant='static'
          className='lg:w-1/2 w-full text-sm lg:text-xl'
          endIcon={<Play />}
          onClick={() => router.push('/register')}
        >
          Watch Trailer
        </Button>
      </div>
    </div>
  )
}
