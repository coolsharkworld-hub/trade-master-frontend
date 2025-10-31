'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { FloatingImage } from '@/app/components'
import { industryExpertsMediaPositions, industryExpertsMedias } from '@/app/constants'
import { IndustryExpertsSectionData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface ImagePosition {
  originX: number
  originY: number
  cornerX: number
  cornerY: number
}

interface Props {
  data: IndustryExpertsSectionData
}

export default function IndustryExperts({ data }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [fixedPositions, setFixedPositions] = useState<Record<number, ImagePosition>>({})

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const positions: Record<number, ImagePosition> = {}

    industryExpertsMediaPositions.forEach(pos => {
      positions[pos.id] = {
        originX: pos.centerPx * rect.width,
        originY: pos.centerPy * rect.height,
        cornerX: pos.cornerPx * rect.width,
        cornerY: pos.cornerPy * rect.height
      }
    })

    setFixedPositions(positions)
  }, [])

  useEffect(() => {
    if (!containerRef.current || Object.keys(fixedPositions).length !== industryExpertsMediaPositions.length) return

    const images = containerRef.current.querySelectorAll('.floating-image')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        end: 'bottom 20%',
        scrub: 0.5
      }
    })

    images.forEach((imgEl, index) => {
      const posData = industryExpertsMediaPositions[index]
      const pos = fixedPositions[posData.id]

      const isAlwaysBlur = index < 4
      const isDisappearAtCenter = index >= 4

      tl.fromTo(
        imgEl,
        {
          x: pos.originX,
          y: pos.originY,
          opacity: isDisappearAtCenter ? 0 : 1,
          filter: isAlwaysBlur ? 'blur(12px)' : 'blur(12px)'
        },
        {
          x: pos.cornerX,
          y: pos.cornerY,
          opacity: 1,
          filter: isAlwaysBlur ? 'blur(12px)' : 'blur(0px)',
          duration: 1,
          ease: 'power3.out'
        },
        index * 0.3
      )

      if (isDisappearAtCenter) {
        tl.to(
          imgEl,
          {
            opacity: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.5
            }
          },
          index * 0.3
        )
      }
    })

    return () => {
      tl.kill()
    }
  }, [fixedPositions])

  const sectionData = data || {
    title: 'Access industry experts with monthly coaching',
    description: 'From when you join any course',
    media: industryExpertsMedias.map((image, index) => ({ _key: `media-${index}`, image }))
  }

  const mediaItems =
    sectionData.media || industryExpertsMedias.map((image, index) => ({ _key: `media-${index}`, image }))

  return (
    <div className='mx-auto px-4 pt-14 pb-30 bg-black relative'>
      <div
        ref={containerRef}
        className='relative w-full min-h-200 flex items-center justify-center overflow-hidden select-none'
      >
        <div className='relative z-10 flex flex-col items-center justify-center pointer-events-none'>
          <h1 className='lg:text-8xl sm:text-6xl text-white leading-tight text-center max-w-5xl'>
            {sectionData.title}
          </h1>
          <span className='lg:text-3xl text-xl text-primary mt-10 -translate-y-4'>{sectionData.description}</span>
        </div>

        <div className='absolute inset-0 pointer-events-none'>
          {Object.keys(fixedPositions).length === industryExpertsMediaPositions.length &&
            industryExpertsMediaPositions.map((pos, index) => {
              const imgSrc = getImageUrl(mediaItems[index]?.image)
              return imgSrc ? (
                <FloatingImage
                  key={pos.id}
                  img={{
                    id: pos.id,
                    src: imgSrc,
                    width: pos.width,
                    height: pos.height
                  }}
                  className='floating-image'
                />
              ) : null
            })}
        </div>
      </div>
    </div>
  )
}
