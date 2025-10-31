'use client'

import React, { useRef, useState } from 'react'

import clsx from 'clsx'

import { FilmItem } from '@/app/types/sanity'

interface FilmCardProps {
  item: FilmItem
}

export const FilmCard: React.FC<FilmCardProps> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    videoRef.current?.pause()
    videoRef.current!.currentTime = 0
  }

  return (
    <div className='relative group' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='relative pt-[56.25%] bg-black overflow-hidden'>
        {!loaded && (
          <div className='absolute inset-0 bg-black flex items-center justify-center'>
            <div className='text-white'>Loading...</div>
          </div>
        )}

        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
          <div
            key={corner}
            className={clsx(
              'absolute border-white transition-all duration-500 opacity-0 group-hover:opacity-100 z-10 w-4 h-4',
              corner === 'top-left' && 'top-0 left-0 border-t-2 border-l-2',
              corner === 'top-right' && 'top-0 right-0 border-t-2 border-r-2',
              corner === 'bottom-left' && 'bottom-0 left-0 border-b-2 border-l-2',
              corner === 'bottom-right' && 'bottom-0 right-0 border-b-2 border-r-2'
            )}
          />
        ))}

        <video
          ref={videoRef}
          src={item.videoLink}
          className={clsx(
            'absolute inset-0 w-full h-full object-cover transition-all duration-500',
            hovered ? 'scale-[0.94]' : 'scale-100'
          )}
          muted
          loop
          playsInline
          preload='auto'
          onLoadedData={() => setLoaded(true)}
        />

        <div
          className={clsx(
            'absolute inset-0 border border-black/20 transition-all duration-500',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div className='mt-4 flex items-start'>
        <span className='text-lg text-white mr-4 gap-2'>
          <span>[</span>
          <span className='mx-1'>{item.itemId}</span>
          <span>]</span>
        </span>
        <h3 className='text-base text-white uppercase line-clamp-2'>{item.title}</h3>
      </div>
    </div>
  )
}
