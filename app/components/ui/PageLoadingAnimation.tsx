'use client'

import { useEffect, useState } from 'react'

import { PageLoadingAnimationData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface PageLoadingAnimationProps {
  data?: PageLoadingAnimationData
}

export function PageLoadingAnimation({ data }: PageLoadingAnimationProps) {
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0)
  const [imagesVisible, setImagesVisible] = useState(false)
  const [textSplit, setTextSplit] = useState(false)

  const loadingAnimationData = data || {
    title: 'the art of documentary',
    images: [
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fc6610c4b5f450b96dee446fa48b5744acfc2af94-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Ffdb1ba4eab241a0c1a91618438dcaaa5a9b92a1d-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F72f56a74796f726fee4ab828a7af4067ebb86af-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F9b2c4a382cfc458f05b6b5bd48f99c255f7ae893-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fb8f1ba00148bafdb5b682ef65db0557033fb0b99-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fd94ef1928fd89ca2eb55dba9cd9275c4ee6d1372-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Feb747926ce6b6f419a3efb20456da1eebe4cefdf-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fc6610c4b5f450b96dee446fa48b5744acfc2af94-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Ffdb1ba4eab241a0c1a91618438dcaaa5a9b92a1d-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F72f56a74796f726fee4ab828a7af4067ebb86af-1320x1840.jpg&w=480&q=80',
      'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F9b2c4a382cfc458f05b6b5bd48f99c255f7ae893-1320x1840.jpg&w=480&q=80'
    ],
    animationDuration: 3000,
    percentageIncrement: 35,
    minIncrement: 2,
    maxIncrement: 6
  }

  const imageUrls = loadingAnimationData.images.map(image => getImageUrl(image))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const isInitialLoadOrRefresh = navigation?.type === 'navigate' || navigation?.type === 'reload'

      if (isInitialLoadOrRefresh) {
        const interval = setInterval(() => {
          setPercentage(prev => {
            if (prev >= 100) {
              clearInterval(interval)
              setImagesVisible(true)
              setTimeout(() => setTextSplit(true), 200)
              setTimeout(() => {
                setLoading(false)
                document.body.classList.add('content-visible')
              }, loadingAnimationData.animationDuration)
              return 100
            }
            const newValue = Math.min(
              prev +
                (Math.random() * (loadingAnimationData.maxIncrement - loadingAnimationData.minIncrement) +
                  loadingAnimationData.minIncrement),
              100
            )
            return Math.floor(newValue)
          })
        }, loadingAnimationData.percentageIncrement)

        return () => clearInterval(interval)
      } else {
        setLoading(false)
        document.body.classList.add('content-visible')
      }
    }
  }, [
    loadingAnimationData.animationDuration,
    loadingAnimationData.percentageIncrement,
    loadingAnimationData.minIncrement,
    loadingAnimationData.maxIncrement
  ])

  if (!loading) return null

  return (
    <div className='fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden'>
      <div className='text-center z-10'>
        <div className='lg:text-2xl text-sm font-light text-white font-mono flex space-x-4'>
          <span
            className={`inline-block transition-all duration-2000 ease-out ${textSplit ? '-translate-x-1000 opacity-0' : 'translate-x-0 opacity-100'}`}
          >
            <span className='mr-3'>[</span>
            <span className='tracking-wider'>{loadingAnimationData.title}</span>
            <span className='ml-3'>]</span>
          </span>
          <span
            className={`inline-block transition-all duration-2000 ease-out ${textSplit ? 'translate-x-1000 opacity-0' : 'translate-x-0 opacity-100'}`}
          >
            <span className='mr-1'>[</span>
            {percentage}%<span className='ml-1'>]</span>
          </span>
        </div>
      </div>

      {imagesVisible && (
        <div className='absolute inset-0 flex justify-center pointer-events-none'>
          <div
            className='flex flex-col gap-3'
            style={{
              animation: 'flowBar 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
            }}
          >
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt=''
                className='lg:w-120 lg:h-70 w-50 h-30 object-cover rounded-md shadow-lg'
                onError={e => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
