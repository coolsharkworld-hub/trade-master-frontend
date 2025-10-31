'use client'

import { X } from 'lucide-react'
import React from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
  imageUrl?: string
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, imageUrl }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'>
      <button onClick={onClose} className='absolute top-5 right-5 text-white hover:text-gray-300'>
        <X size={28} />
      </button>
      {videoUrl ? (
        <video src={videoUrl} controls autoPlay className='max-w-6xl max-h-full rounded-xl shadow-lg' />
      ) : (
        imageUrl && <img src={imageUrl} alt='Course preview' className='max-w-4xl max-h-full rounded-xl shadow-lg' />
      )}
    </div>
  )
}
