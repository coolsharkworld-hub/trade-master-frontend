'use client'

import type { EmblaCarouselType } from 'embla-carousel'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { VideoData } from '@/app/types/sanity'

type ProgressBarProps = {
  videos: VideoData[]
  carousel: EmblaCarouselType | null
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ videos, carousel }) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const onScroll = useCallback(() => {
    if (!carousel) return
    setScrollProgress(carousel.scrollProgress())
  }, [carousel])

  useEffect(() => {
    if (!carousel) return
    carousel.on('scroll', onScroll)
    carousel.on('resize', onScroll)
    onScroll()
    return () => {
      carousel?.off('scroll', onScroll)
      carousel?.off('resize', onScroll)
    }
  }, [carousel, onScroll])

  const translatePercent = -scrollProgress * 100 * videos.length

  const repeatedContent = (
    <>
      {videos.map((video, idx) => (
        <React.Fragment key={`${video._key}-${idx}`}>
          <div className='relative text-white text-lg' style={{ minWidth: 30, textAlign: 'center' }}>
            {String(idx + 1).padStart(2, '0')}
          </div>
          {idx !== videos.length - 1 && (
            <div className='flex items-center gap-1'>
              <p className='text-white text-lg pl-1'>.</p>
              <p className='text-white text-lg pl-1'>.</p>
              <p className='text-white text-lg pl-1'>.</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  )

  return (
    <div className='relative w-full max-w-2xs mx-auto select-none overflow-hidden rounded-lg'>
      <div className='relative h-8 flex items-center justify-center'>
        <div className='absolute top-1/2 left-0 right-0 h-1 bg-black' />

        <div className='pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent z-20' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent z-20' />

        <div
          ref={trackRef}
          className='flex absolute left-0 top-0 h-full items-center'
          style={{
            transform: `translateX(${translatePercent % (videos.length * 60)}px)`,
            transition: 'transform 0.05s linear',
            whiteSpace: 'nowrap'
          }}
        >
          {repeatedContent}
          <div className='flex items-center gap-1'>
            <p className='text-white text-lg pl-1'>.</p>
            <p className='text-white text-lg pl-1'>.</p>
            <p className='text-white text-lg pl-1'>.</p>
          </div>
          {repeatedContent}
        </div>

        <svg
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30'
          width={20}
          height={20}
          viewBox='0 0 16 14'
          fill='none'
        >
          <path d='M0 0H16V9.33333L8 14L0 9.33333V0Z' fill='white'></path>
        </svg>
      </div>
    </div>
  )
}
