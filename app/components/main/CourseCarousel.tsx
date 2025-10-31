'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { RegCourseData } from '@/app/types/sanity'

import CourseCard from './RegisterCourseCard'

interface CourseCarouselProps {
  images: string[]
  courses: RegCourseData[]
  selectedCourses: number[]
  onCourseSelect: (index: number) => void
}

const CourseCarousel = ({ images, courses, selectedCourses, onCourseSelect }: CourseCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    duration: 20
  })

  const progressRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5)

  const animateProgress = useCallback((targetProgress: number) => {
    if (!progressRef.current) return
    const startTime = performance.now()
    const duration = 200
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
    if (!emblaApi) return
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    const progressPercentage = progress * 100
    animateProgress(progressPercentage)
  }, [emblaApi, animateProgress])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)
    return () => {
      emblaApi.off('scroll', onScroll)
      emblaApi.off('reInit', onScroll)
      cancelAnimationFrame(animationRef.current!)
    }
  }, [emblaApi, onScroll])

  useEffect(() => {
    if (emblaApi) onScroll()
  }, [emblaApi, onScroll])
  return (
    <>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-4'>
          {images.map((src, index) => (
            <CourseCard
              key={index}
              index={index}
              image={src}
              course={courses[index]}
              isSelected={selectedCourses.includes(index)}
              onSelect={onCourseSelect}
              isMobile={true}
            />
          ))}
        </div>
      </div>
      {/* Progress Bar */}
      <div className='w-2xs mx-auto h-0.5 bg-gray-700 mt-6 rounded-full overflow-hidden relative'>
        <div
          ref={progressRef}
          className='absolute top-0 left-0 h-full bg-white rounded-full'
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  )
}

export default CourseCarousel
