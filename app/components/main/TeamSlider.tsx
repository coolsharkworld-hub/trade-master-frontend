'use client'

import useCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { TeamMemberData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface TeamSliderProps {
  teamMembers?: TeamMemberData[]
}

export const TeamSlider: React.FC<TeamSliderProps> = ({ teamMembers }) => {
  const [carouselRef, carouselApi] = useCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: 2,
        containScroll: 'trimSnaps'
      },
      '(min-width: 1024px)': {
        slidesToScroll: 3,
        containScroll: 'trimSnaps'
      }
    }
  })

  const progressRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

  const animateProgress = useCallback((targetProgress: number) => {
    if (!progressRef.current) return

    const startTime = performance.now()
    const duration = 300
    const startWidth = parseFloat(progressRef.current.style.width || '0')

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuint(progress)
      const currentWidth = startWidth + (targetProgress - startWidth) * easedProgress

      progressRef.current!.style.width = `${currentWidth}%`
      setScrollProgress(currentWidth)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    cancelAnimationFrame(animationRef.current!)
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  const onScroll = useCallback(() => {
    if (!carouselApi) return

    const progress = Math.max(0, Math.min(1, carouselApi.scrollProgress()))
    const progressPercentage = progress * 100
    animateProgress(progressPercentage)
  }, [carouselApi, animateProgress])

  useEffect(() => {
    if (!carouselApi) return

    carouselApi.on('scroll', onScroll)
    carouselApi.on('reInit', onScroll)

    return () => {
      carouselApi.off('scroll', onScroll)
      carouselApi.off('reInit', onScroll)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [carouselApi, onScroll])

  useEffect(() => {
    if (carouselApi) {
      onScroll()
    }
  }, [carouselApi, onScroll])

  return (
    <div className='w-full mx-4 px-4 py-12'>
      <div className='embla overflow-hidden'>
        <div className='embla__viewport' ref={carouselRef}>
          <div className='embla__container'>
            {teamMembers?.map((member, index) => {
              const imageUrl = getImageUrl(member.imageUrl)

              return (
                <div key={index} className='embla__slide'>
                  <div className='flex flex-col items-center'>
                    <div className='relative w-full aspect-square mb-4 overflow-hidden rounded-lg'>
                      <img
                        src={imageUrl}
                        alt={member.name}
                        width={400}
                        height={400}
                        className='w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-105'
                        loading='lazy'
                      />
                    </div>

                    <div className='w-full'>
                      <h3 className='text-xl lg:text-lg text-white mb-1'>{member.name}</h3>
                      <p className='text-gray-300 uppercase text-base'>[{member.role}]</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className='w-2xs mx-auto h-0.5 bg-gray-700 mt-20 rounded-full overflow-hidden relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full' />
        <div
          ref={progressRef}
          className='absolute top-0 left-0 h-full bg-white rounded-full'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  )
}
