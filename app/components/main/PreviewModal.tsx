'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

interface PreviewModalProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

export const PreviewModal = ({ imageUrl, isOpen, onClose }: PreviewModalProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'>
      <div className='relative max-w-4xl mx-4'>
        <button onClick={onClose} className='absolute -top-10 right-0 text-white hover:text-gray-300 z-10'>
          <X size={24} />
        </button>
        <img src={imageUrl} alt='Course preview' className='max-w-full max-h-screen object-contain' />
      </div>
    </div>
  )
}
