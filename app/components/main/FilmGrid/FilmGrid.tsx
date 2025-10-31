'use client'

import React from 'react'

import { FilmItem } from '@/app/types/sanity'

import { FilmCard } from './FilmCard'

interface FilmGridProps {
  displayedItems: FilmItem[]
}

export const FilmGrid: React.FC<FilmGridProps> = ({ displayedItems }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {displayedItems.map((item, index) => (
        <FilmCard key={`film-card-${index}`} item={item} />
      ))}
    </div>
  )
}
