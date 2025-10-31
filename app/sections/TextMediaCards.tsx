'use client'

import useCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { TextMediaCard, TextSliderLoop } from '@/app/components'
import { defaultSliderItems, textMedias } from '@/app/constants'
import { TextMediaCardsData } from '@/app/types/sanity'

interface Props {
  data?: TextMediaCardsData
}

export default function TextMediaCards({ data }: Props) {
  const [carouselRef, carouselApi] = useCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': {
        slidesToScroll: 2,
        containScroll: 'trimSnaps'
      }
    }
  })

  const [scrollProgress, setScrollProgress] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)

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

    const rawProgress = carouselApi.scrollProgress()
    const normalizedProgress = Math.min(1, Math.max(0, rawProgress)) * 100
    setScrollProgress(normalizedProgress)
    animateProgress(normalizedProgress)
  }, [carouselApi, animateProgress])

  useEffect(() => {
    if (!carouselApi) return
    carouselApi.on('scroll', onScroll)
    return () => {
      carouselApi.off('scroll', onScroll)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [carouselApi, onScroll])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use Sanity data or fallback to constants
  const sectionData = data || {
    heading: 'Transform Your',
    subheading: '',
    sliderItems: defaultSliderItems,
    cards: textMedias
  }

  const items = sectionData.sliderItems || defaultSliderItems
  const cards = sectionData.cards || textMedias

  return (
    <section className='flex justify-center flex-col my-20 w-full'>
      <div className='flex items-center flex-col text-center mb-28'>
        <h2 className='text-white text-5xl lg:text-8xl mx-2'>{sectionData.heading}</h2>
        <div className='flex items-center justify-center'>
          <TextSliderLoop items={items} interval={3000} className='lg:text-7xl text-4xl text-primary' />
        </div>
      </div>

      {isMobile ? (
        <div className='w-full'>
          <div className='embla overflow-hidden  mx-5'>
            <div className='embla__viewport' ref={carouselRef}>
              <div className='embla__container flex'>
                {cards.map(item => (
                  <div key={item.title} className='embla__slide flex-[0_0_100%] min-w-0 px-4'>
                    <TextMediaCard textMedia={item} isSlider />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='w-2xs mx-auto h-0.25 bg-gray-700 mt-20 rounded-full overflow-hidden relative'>
            <div className='absolute top-0 left-0 w-full h-full bg-gray-700 rounded-full' />
            <div
              ref={progressRef}
              className='absolute top-0 left-0 h-full bg-white rounded-full'
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className='mx-5 flex justify-center gap-5'>
          {cards.map(item => (
            <TextMediaCard key={item.title} textMedia={item} />
          ))}
        </div>
      )}
    </section>
  )
}
