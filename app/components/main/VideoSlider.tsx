// VideoSlider.tsx
'use client'

import useCarousel from 'embla-carousel-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import clsx from 'clsx'

import PlayIcon from '@/app/assets/play.svg'
import { ProgressBar } from '@/app/components'
import { VideoData } from '@/app/types/sanity'

// VideoSlider.tsx

// VideoSlider.tsx

// VideoSlider.tsx

// VideoSlider.tsx

interface Props {
  videos: VideoData[]
}

export const VideoSlider: React.FC<Props> = ({ videos }) => {
  const [carouselRef, carousel] = useCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    slidesToScroll: 1
  })

  const [windowWidth, setWindowWidth] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [displayName, setDisplayName] = useState(videos[0].name)
  const [animating, setAnimating] = useState<'fadeIn' | 'fadeOut' | null>(null)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const prevIndex = useRef(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const isMobile = windowWidth < 768

  const handleSelect = useCallback(() => {
    if (!carousel) return
    const idx = carousel.selectedScrollSnap()
    setSelectedIndex(idx)

    if (idx !== prevIndex.current) {
      setAnimating('fadeOut')
      prevIndex.current = idx
    }
  }, [carousel])

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      video.muted = true
      video.playsInline = true
      video.play().catch(err => {
        console.warn('Play failed:', err)
      })
    } else {
      video.pause()
    }
  }

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index)
    setTimeout(() => {
      const mv = modalVideoRef.current
      if (!mv) return
      mv.muted = false
      mv.currentTime = 0
      mv.play().catch(err => {
        console.warn('Fullscreen play failed:', err)
      })
    }, 50)
  }

  const closeFullscreen = () => {
    const mv = modalVideoRef.current
    if (mv) {
      try {
        mv.pause()
        mv.currentTime = 0
      } catch {}
    }
    setFullscreenIndex(null)
  }

  // Auto-play the centered video
  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video, index) => {
      if (video && index !== selectedIndex) {
        video.pause()
        video.currentTime = 0
      }
    })

    // Play the centered video
    const centeredVideo = videoRefs.current[selectedIndex]
    if (centeredVideo) {
      centeredVideo.muted = true
      centeredVideo.playsInline = true
      centeredVideo.play().catch(err => {
        console.warn('Auto-play failed:', err)
      })
    }
  }, [selectedIndex])

  useEffect(() => {
    if (animating === 'fadeOut') {
      const timeout = setTimeout(() => {
        setDisplayName(videos[selectedIndex].name)
        setAnimating('fadeIn')
      }, 400)
      return () => clearTimeout(timeout)
    }
    if (animating === 'fadeIn') {
      const timeout = setTimeout(() => {
        setAnimating(null)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [animating, selectedIndex, videos])

  useEffect(() => {
    if (!carousel || !sliderRef.current) return

    carousel.on('select', handleSelect)

    return () => {
      carousel.off('select', handleSelect)
    }
  }, [carousel, handleSelect, isMobile])

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className='relative w-full flex flex-col items-center justify-center mb-5 overflow-hidden uppercase'>
        <span
          key={`${displayName}-name`}
          className={clsx(
            'font-normal text-white text-center',
            `${isMobile ? 'text-base' : 'text-lg'}`,
            `${animating === 'fadeOut' ? 'animate-fadeOutUp' : animating === 'fadeIn' ? 'animate-fadeInUp' : ''}`
          )}
        >
          {displayName}
        </span>
      </div>

      <div
        className='embla-peek overflow-x-hidden pt-10 relative'
        ref={el => {
          carouselRef(el)
          sliderRef.current = el
        }}
      >
        <div className='embla-peek__container flex gap-4'>
          {videos.map((video, i) => (
            <div
              key={video._key}
              className={clsx(
                'embla-peek__slide flex-shrink-0 relative group',
                `${isMobile ? 'w-[90%] mx-[5%]' : 'w-[60%] mx-0'}`,
                `${selectedIndex === i && 'centered-slide'}`
              )}
            >
              <div className={selectedIndex === i ? 'global-corners' : ''}>
                <video
                  ref={el => {
                    videoRefs.current[i] = el
                  }}
                  src={video.videoUrl}
                  className={clsx('w-full aspect-video object-cover cursor-pointer', selectedIndex === i && 'scale-95')}
                  preload='metadata'
                  playsInline
                  muted
                  onClick={() => togglePlay(i)}
                />
              </div>
              <button
                onClick={() => openFullscreen(i)}
                className='absolute inset-0 flex items-center justify-center m-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-500/40 backdrop-blur-sm transition-opacity group-hover:opacity-100'
              >
                <Image
                  src={PlayIcon}
                  alt='Play'
                  width={isMobile ? 24 : 40}
                  height={isMobile ? 24 : 40}
                  priority
                  className='cursor-pointer'
                />
              </button>
            </div>
          ))}

          <div className='flex-shrink-0 w-[1%] bg-transparent pointer-events-none' />
        </div>
      </div>

      {carousel && <ProgressBar videos={videos} carousel={carousel} />}

      {fullscreenIndex !== null && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4'>
          <button
            onClick={closeFullscreen}
            className='absolute top-4 right-4 text-white text-2xl p-2 cursor-pointer z-50'
            aria-label='Close'
          >
            Close [ ✕ ]
          </button>
          <div className='global-corners relative w-full max-w-5xl'>
            <video
              ref={modalVideoRef}
              src={videos[fullscreenIndex].videoUrl}
              className='w-full max-h-[90vh] md:max-h-[150vh] bg-black'
              controls
              autoPlay
            />
            <div className='text-white mt-4 text-center'>
              <h3 className='text-xl font-medium'>{videos[fullscreenIndex].name}</h3>
              <p className='text-gray-300'>{videos[fullscreenIndex].role}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
