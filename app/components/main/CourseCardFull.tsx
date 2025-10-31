'use client'

import { toast } from 'sonner'

import { ArrowRight, Play, ShoppingCart, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Button, MarqueeAnimation } from '@/app/components'
import { addToCart, removeFromCart } from '@/app/services/cartService'
import { addItemToCart, dispatch, removeItemFromCart } from '@/app/store'
import { CourseData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

gsap.registerPlugin(ScrollTrigger)

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

interface CourseCardFullProps {
  course: CourseData
  state: number
  isLoggedIn: boolean
  className?: string
}

export const CourseCardFull: React.FC<CourseCardFullProps> = ({ course, state, isLoggedIn, className }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(course.id)
      dispatch(addItemToCart(res.item))
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(course.id)
      dispatch(removeItemFromCart(course.id))
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  // Convert Sanity image object to URL
  useEffect(() => {
    if (!cardRef.current || !imgRef.current) return

    const card = cardRef.current
    const img = imgRef.current

    gsap.fromTo(
      card,
      {
        scale: 1,
        filter: 'brightness(100%)'
      },
      {
        scale: 0.8,
        filter: 'brightness(30%)',
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          scrub: 2
        }
      }
    )

    gsap.fromTo(
      img,
      {
        height: '120%',
        y: '-20%'
      },
      {
        y: '0%',
        height: '100%',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div
      className={clsx(
        'w-full h-screen flex items-end sticky overflow-clip',
        "after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:content-[''] after:bg-[linear-gradient(180deg,transparent_25%,rgba(0,0,0,0.9)_90%)]",
        className
      )}
      ref={cardRef}
    >
      {/* Video Player */}
      <VideoPlayer videoUrl={course.videoLink || ''} isOpen={showVideo} onClose={() => setShowVideo(false)} />

      {/* Preview Modal */}
      <PreviewModal
        imageUrl={course.previewImage || getImageUrl(course.image)}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      <div className='flex flex-col md:flex-row gap-5 items-end justify-end md:justify-between z-10 w-full h-full px-6 pb-40'>
        <p className='w-full md:w-[30%] md:pb-40'>Course {course.id}</p>
        <div className='w-full md:w-[70%]'>
          <picture>
            <img className='mb-5 h-16' src={getImageUrl(course.logo)} alt={`Logo ${course.id}`} />
          </picture>
          <div className='flex flex-col md:flex-row justify-between gap-5 w-full'>
            <div>
              <p className='uppercase'>Overview</p>
              <p className='md:w-[calc(212/var(--gfs)*1rem)] text-xl mt-3'>{course.description}</p>
            </div>
            <div className='md:w-[calc(330/var(--gfs)*1rem)]'>
              <div className='uppercase'>What&apos;s Included</div>
              <ul className='list-disc pl-5 mt-3 gap-2 flex flex-col'>
                {course.included.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr className='text-divider2 my-9' />
          <div className='flex flex-col md:flex-row justify-between md:items-center gap-2'>
            <div className='text-xl'>${course.price}</div>
            <div className='flex gap-2 md:w-[calc(330/var(--gfs)*1rem)]'>
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
                endIcon={<ArrowRight className='w-2 h-2' />}
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
      <picture className='w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0'>
        {course.isNew && <MarqueeAnimation title='•        new course' />}
        <img
          ref={imgRef}
          src={getImageUrl(course.image)}
          alt={course.description}
          className='w-full h-full object-cover'
        />
      </picture>
    </div>
  )
}
