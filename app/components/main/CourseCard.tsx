'use client'

import { ArrowRight, Play, ShoppingCart } from 'lucide-react'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { Button } from '@/app/components'
import { addToCart, removeFromCart } from '@/app/services/cartService'
import { addItemToCart, dispatch, removeItemFromCart } from '@/app/store'
import { CourseData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface MarqueeAnimationProps {
  title: string
  className?: string
}

const MarqueeAnimation = ({ title, className }: MarqueeAnimationProps) => {
  return (
    <div className={clsx('absolute left-0 right-0 overflow-hidden z-10 bg-primary py-2', className)}>
      <div className='animate-marquee whitespace-nowrap text-black text-sm font-medium tracking-wider flex'>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <span key={i} className='mx-4'>
              {title}
            </span>
          ))}
      </div>
    </div>
  )
}

interface VideoPlayerProps {
  videoUrl: string
  isOpen: boolean
  onClose: () => void
}

const VideoPlayer = ({ videoUrl, isOpen, onClose }: VideoPlayerProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'>
      <div className='relative w-full max-w-4xl mx-4'>
        <button onClick={onClose} className='absolute -top-10 right-0 text-white hover:text-gray-300 z-10'>
          <X size={24} />
        </button>
        <div className='relative pt-[56.25%]'>
          {' '}
          {/* 16:9 aspect ratio */}
          <video src={videoUrl} controls autoPlay className='absolute inset-0 w-full h-full' />
        </div>
      </div>
    </div>
  )
}

interface PreviewModalProps {
  imageUrl: string
  isOpen: boolean
  onClose: () => void
}

const PreviewModal = ({ imageUrl, isOpen, onClose }: PreviewModalProps) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-90'>
      <div className='relative max-w-4xl mx-4'>
        <button onClick={onClose} className='absolute -top-10 right-0 text-white hover:text-gray-300 z-10'>
          <X size={24} />
        </button>
        <img src={imageUrl} alt='Course preview' className='max-w-full max-h-screen object-contain' />
      </div>
    </div>
  )
}

interface CourseCardProps {
  course: CourseData
  state: number
  isLoggedIn: boolean
  className?: string
}

export const CourseCard = ({ course, state, isLoggedIn, className }: CourseCardProps) => {
  const [isClient, setIsClient] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(course.id)
      dispatch(addItemToCart(res.item))
    } catch {}
  }

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(course.id)
      dispatch(removeItemFromCart(course.id))
    } catch {}
  }

  useEffect(() => {
    setIsClient(true)
  }, [course])

  return (
    <div className={clsx('flex flex-col-reverse lg:flex-row gap-3 py-10 border-y border-young-night', className)}>
      {/* Video Player */}
      <VideoPlayer videoUrl={course.videoLink || ''} isOpen={showVideo} onClose={() => setShowVideo(false)} />

      {/* Preview Modal */}
      <PreviewModal
        imageUrl={course.previewImage || getImageUrl(course.image)}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      <div className='flex flex-col justify-between w-full lg:w-1/2 mr-10'>
        <p className='mb-5'>Course {course.id}</p>
        <div>
          <img className='mb-5 h-14' src={getImageUrl(course.logo)} alt={`Logo ${course.id}`} />
          <div className='flex flex-col xl:flex-row justify-between mb-5 gap-2'>
            <p className='w-full xl:w-[260px] text-base'>{course.description}</p>
            <div className='xl:w-[350px]'>
              <div className='text-tangle-web text-base uppercase tracking-tighter'>What&apos;s Included</div>
              <ul className='list-disc pl-5 mt-3 text-base tracking-wider'>
                {course.included.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row justify-between xl:items-center gap-1 '>
            <p className='w-auto xl:w-[260px] text-3xl'>${course.price}</p>
            <div className='w-auto xl:w-[350px] flex gap-2'>
              {isLoggedIn ? (
                state == 1 ? (
                  <Button
                    variant='primary'
                    className='text-base'
                    endIcon={<ShoppingCart className='w-3 h-3' />}
                    onClick={handleRemoveFromCart}
                  >
                    Remove
                  </Button>
                ) : state == 0 ? (
                  <Button
                    variant='primary'
                    className='text-base'
                    endIcon={<ShoppingCart className='w-3 h-3' />}
                    onClick={handleAddToCart}
                  >
                    Add
                  </Button>
                ) : state == 2 ? (
                  <Button
                    variant='primary'
                    className='text-base'
                    endIcon={<Play className='w-3 h-3' />}
                    onClick={() => setShowVideo(true)}
                  >
                    Start Course
                  </Button>
                ) : (
                  <></>
                )
              ) : (
                <Link href='/register'>
                  <Button variant='primary' endIcon={<ArrowRight className='w-2 h-2' />}>
                    Pre-register
                  </Button>
                </Link>
              )}
              <Button
                variant='outlined'
                className='text-base'
                endIcon={<ArrowRight className='w-3 h-3' />}
                onClick={() => {
                  if (state === 2 && course.videoLink) {
                    setShowVideo(true)
                  } else {
                    setShowPreview(true)
                  }
                }}
              >
                {state === 2 ? 'Continue' : 'Explore'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full lg:w-1/2 overflow-hidden'>
        <div className='relative w-full'>
          {isClient && course.isNew && <MarqueeAnimation title='• NEW COURSE •' className='top-0' />}
          <img src={getImageUrl(course.image)} alt={course.description} className='w-full h-auto' />
          {isClient && course.isNew && <MarqueeAnimation title='• NEW COURSE •' className='bottom-0' />}
        </div>
      </div>
    </div>
  )
}
