'use client'

import { useEffect, useRef, useState } from 'react'

import { TestimonialCard } from '@/app/components'
import { testimonials } from '@/app/constants'
import { TestimonialCardsData } from '@/app/types/sanity'

interface Props {
  data?: TestimonialCardsData
}

export default function TestimonialCards({ data }: Props) {
  const testimonialsData = testimonials.map((testimonial, index) => ({ _key: `testimonial-${index}`, ...testimonial }))
  const sectionData = data || {
    title: 'A community & academy to advance your career',
    description: '',
    testimonials: testimonialsData
  }

  const testimonialItems = sectionData.testimonials || testimonialsData
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1440)
    }

    requestAnimationFrame(checkScreenSize)
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    if (!isLargeScreen) {
      setScrollProgress(0)
      return
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const section = sectionRef.current
        const scrollTop = window.scrollY
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const windowHeight = window.innerHeight

        const progress = Math.max(
          0,
          Math.min(1, (scrollTop - sectionTop + windowHeight) / (sectionHeight + windowHeight))
        )
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLargeScreen])

  const calculateTranslateY = (index: number, total: number) => {
    if (!isLargeScreen) return 0

    if (index === 0) {
      return scrollProgress * 100
    } else if (index === total - 1) {
      return -scrollProgress * 100
    }
    return 0
  }

  return (
    <section ref={sectionRef} className='flex justify-center flex-col my-20 w-full'>
      <div className='max-w-7xl mx-auto flex items-center flex-col text-center mb-28'>
        <h2 className='text-white text-5xl lg:text-8xl mx-2'>{sectionData.title}</h2>
      </div>
      <div className='mx-5 flex justify-center gap-5 flex-wrap'>
        {testimonialItems.map((testimonial, index) => (
          <div
            key={testimonial._key}
            style={{
              transform: isLargeScreen
                ? `translateY(${calculateTranslateY(index, testimonialItems.length)}px)`
                : 'none',
              transition: isLargeScreen ? 'transform 0.1s ease-out' : 'none',
              zIndex: testimonialItems.length - index
            }}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  )
}
