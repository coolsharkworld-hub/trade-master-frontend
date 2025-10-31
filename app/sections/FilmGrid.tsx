'use client'

import React, { useEffect, useState } from 'react'

import { Button, FilmGrid } from '@/app/components'
import { videoItems } from '@/app/constants'
import { useWindowSize } from '@/app/hooks'
import { FilmGridData } from '@/app/types/sanity'

interface Props {
  data: FilmGridData
}

const FilmGridSection: React.FC<Props> = ({ data }) => {
  const [showAll, setShowAll] = useState(false)
  const { width } = useWindowSize()
  const isLargeScreen = width >= 1024

  useEffect(() => {
    if (isLargeScreen) setShowAll(true)
  }, [isLargeScreen])

  const sectionData = data || {
    title: `Our students' films are winning awards and securing broadcast deals`,
    description: '',
    videos: videoItems.map((video, index) => ({ _key: `video-${index}`, ...video }))
  }

  const videos = sectionData.videos || []
  const displayedItems = showAll || isLargeScreen ? videos : videos.slice(0, 3)

  return (
    <div className='min-h-screen bg-black py-20 px-4'>
      <div className='mx-auto px-4 lg:py-8 sm:py-4 bg-black'>
        <h2 className='max-w-7xl mb-8 mx-auto lg:text-7xl text-5xl text-center text-white'>{sectionData.title}</h2>

        <FilmGrid displayedItems={displayedItems} />

        {!showAll && videos.length > 3 && (
          <div className='mt-8 lg:hidden'>
            <Button variant='outlined' onClick={() => setShowAll(true)} className='w-full'>
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilmGridSection
