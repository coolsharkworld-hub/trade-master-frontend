'use client'

import { RegCourseData } from '@/app/types/sanity'

import CourseCard from './RegisterCourseCard'

interface CourseGridProps {
  images: string[]
  courses: RegCourseData[]
  selectedCourses: number[]
  onCourseSelect: (index: number) => void
}

const CourseGrid = ({ images, courses, selectedCourses, onCourseSelect }: CourseGridProps) => {
  return (
    <div>
      <div className='lg:block rounded-2xl p-6'>
        <h1 className='text-6xl text-white mb-8'>
          Select Your Courses <br />
          (Limited seats available)
        </h1>
        <div className='grid grid-cols-2 gap-4'>
          {images.map((src, index) => (
            <CourseCard
              key={index}
              index={index}
              image={src}
              course={courses[index]}
              isSelected={selectedCourses.includes(index)}
              onSelect={onCourseSelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseGrid
