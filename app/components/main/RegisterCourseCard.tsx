'use client'

import { motion } from 'framer-motion'

import { Check } from 'lucide-react'

import { RegCourseData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface CourseCardProps {
  index: number
  image: string
  course: RegCourseData
  isSelected: boolean
  onSelect: (index: number) => void
  isMobile?: boolean
}

const CourseCard = ({ index, image, course, isSelected, onSelect, isMobile = false }: CourseCardProps) => {
  const logoUrl = course.logo ? getImageUrl(course.logo) : null

  return (
    <motion.div
      whileHover={{ scale: isMobile ? 1.03 : 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
        bounce: 0
      }}
      className={`rounded-xl overflow-hidden shadow-lg cursor-pointer relative ${
        isMobile ? 'flex-[0_0_80%] sm:flex-[0_0_60%]' : ''
      } ${!course.isAvailable ? 'opacity-60 cursor-not-allowed' : ''}`}
      onClick={() => course.isAvailable && onSelect(index)}
    >
      <img
        src={image}
        alt={`Course ${index + 1}`}
        className={`w-full ${isMobile ? 'h-64' : 'lg:h-140 h-72'} object-cover ${isMobile ? 'rounded-xl' : ''}`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 to-black/20 ${isMobile ? 'rounded-xl' : ''}`}
      ></div>

      <div className='absolute inset-0 flex flex-col items-center justify-center px-2'>
        {logoUrl && (
          <img src={logoUrl} alt={`${course.name} logo`} className='h-16 w-auto object-contain opacity-90 mb-4' />
        )}
        <h2 className='text-gray-200 text-lg text-center px-4'>{course.title}</h2>
      </div>

      {course.isAvailable && (
        <div
          className='absolute top-3 left-3 h-5 w-5 rounded border-2 border-white bg-transparent flex items-center justify-center cursor-pointer transition-colors duration-200'
          onClick={e => {
            e.stopPropagation()
            onSelect(index)
          }}
        >
          {isSelected && <Check className='h-4 w-4 text-white' strokeWidth={3} />}
        </div>
      )}

      <div className='absolute bottom-3 left-3'>
        <span
          className={`px-2 py-1 rounded text-sm font-medium ${course.isAvailable ? 'text-green-200' : 'text-red-800'}`}
        >
          {course.statusText}
        </span>
      </div>
    </motion.div>
  )
}

export default CourseCard
