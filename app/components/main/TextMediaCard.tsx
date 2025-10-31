'use client'

import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { TextMedia } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface TextMediaCardProps {
  className?: string
  textMedia: TextMedia
  isSlider?: boolean
}

export const TextMediaCard: React.FC<TextMediaCardProps> = ({ textMedia, isSlider = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    if (isSlider) return
    setHovered(true)
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    if (isSlider) return
    setHovered(false)
    videoRef.current?.pause()
    videoRef.current!.currentTime = 0
  }

  useEffect(() => {
    if (isSlider) {
      videoRef.current?.play()
    }
  }, [isSlider])

  // Convert Sanity image object to URL
  const imageUrl = getImageUrl(textMedia.image)

  return (
    <div
      className={clsx(
        'relative cursor-pointer overflow-hidden',
        isSlider ? 'w-full h-[400px] min-w-0' : 'w-[calc(610/var(--gfs)*1rem)] h-[calc(720/var(--gfs)*1rem)]'
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(
          'absolute z-20 left-1/2 -translate-x-1/2 text-center transition-all duration-500 w-full px-10',
          isSlider || hovered ? 'bottom-20' : 'bottom-10'
        )}
      >
        <h3 className='lg:text-4xl text-2xl'>{textMedia.title}</h3>
        <p
          className={clsx(
            'lg:text-2xl text-xl transition-opacity duration-500',
            isSlider || hovered ? 'opacity-100 block' : 'opacity-0 hidden'
          )}
        >
          {textMedia.description}
        </p>
      </div>

      <div className='absolute w-full h-full'>
        <video
          ref={videoRef}
          className={clsx(
            'w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500',
            isSlider || hovered ? 'opacity-100' : 'opacity-0'
          )}
          muted
          loop
          playsInline
          src={textMedia.video}
        />

        <picture
          className={clsx(
            'absolute inset-0 transition-opacity duration-500',
            isSlider || hovered ? 'opacity-0' : 'opacity-100'
          )}
        >
          <img className='w-full h-full object-cover' src={imageUrl} alt='media' />
          <div className='absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,0.8)_72%)]' />
        </picture>
      </div>
    </div>
  )
}
