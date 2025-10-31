'use client'

import { Play, X } from 'lucide-react'
import { useState } from 'react'

import { HeroCountDown } from '@/app/components'
import { HeroData } from '@/app/types/sanity'

interface Props {
  data?: HeroData
}

export default function Hero({ data }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const heroData = data || {
    title: 'Create Powerful & Profitable Films',
    subtitle: 'The Art of Documentary',
    description: 'The most comprehensive online filmmaking academy',
    countdownDate: '2025-12-31T23:59:59',
    videoUrl: 'https://theartofdocumentary.com/aod-home-hero-preview-1080p.mp4'
  }

  const openFullscreen = () => {
    setIsFullscreen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    document.body.style.overflow = 'unset'
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isFullscreen) {
        closeFullscreen()
      }
    })
  }

  return (
    <>
      <section className='flex justify-center mb-40 mt-25 px-5'>
        <div className='flex items-center flex-col max-w-7xl text-center'>
          <h5 className='text-white lg:text-3xl text-lg uppercase'>{heroData.subtitle}</h5>
          <h1 className='text-white lg:text-9xl text-4xl'>{heroData.title}</h1>
          <div className='mt-8'>
            <p className='lg:text-3xl text-lg'>{heroData.description}</p>
          </div>
          <HeroCountDown time={heroData.countdownDate} />
          <div className='relative max-w-6xl max-h-4xl global-corners p-2 mt-10 mx-2'>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload='auto'
              src={heroData.videoUrl}
              className='w-full h-full inline-block object-cover align-baseline'
            />
            <div
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 z-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all'
              onClick={openFullscreen}
            >
              <Play className='text-white/80' size={24} />
            </div>
          </div>
        </div>
      </section>

      {isFullscreen && (
        <div className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4' onClick={closeFullscreen}>
          <div className='relative w-full max-w-7xl' onClick={e => e.stopPropagation()}>
            <video autoPlay controls src={heroData.videoUrl} className='w-full h-full' />
            <button
              className='absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full transition-all'
              onClick={closeFullscreen}
            >
              <X size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
