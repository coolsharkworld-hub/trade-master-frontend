'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface VideoPlayerProps {
  videoUrl: string
  isOpen: boolean
  onClose: () => void
}

export const VideoPlayer = ({ videoUrl, isOpen, onClose }: VideoPlayerProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'>
      <div className='relative w-full max-w-4xl mx-4'>
        <button onClick={onClose} className='absolute -top-10 right-0 text-white hover:text-gray-300 z-10'>
          <X size={24} />
        </button>
        <div className='relative pt-[56.25%]'>
          {' '}
          <video src={videoUrl} controls autoPlay className='absolute inset-0 w-full h-full' />
        </div>
      </div>
    </div>
  )
}
