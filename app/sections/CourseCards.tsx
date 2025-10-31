'use client'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'

import { CourseCard } from '@/app/components'
import { CourseCardsData } from '@/app/types/sanity'

import { getStateOfCourse } from '../helpers/course'
import { getCartItems } from '../services/cartService'
import { useSelector } from '../store'
import { CartItem } from '../types/cart'

interface Props {
  data?: CourseCardsData
}

export default function CourseCards({ data }: Props) {
  const { items: cartItems } = useSelector(state => state.cart)
  const [boughtCourses, setBoughtCourses] = useState<CartItem[]>([])
  const { isLoggedIn } = useSelector(state => state.auth)

  const fetchData = async () => {
    try {
      const res = await getCartItems(true)
      setBoughtCourses(res.cart)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Use Sanity data or fallback to constants
  const sectionData = data || {
    title: 'Unlock new career possibilities with <span style="color: rgb(255, 162, 0);">our courses</span> today',
    description: '',
    courses: []
  }

  return (
    <section className='flex justify-center flex-col my-20 w-full'>
      <div className='flex items-center flex-col text-center mb-28'>
        <h2
          className='text-white text-5xl lg:text-8xl mx-2 max-w-7xl'
          dangerouslySetInnerHTML={{ __html: sectionData.title }}
        />
        <p className='text-white text-xl lg:text-2xl mt-4'>{sectionData.description}</p>
      </div>
      <div className='px-5 flex justify-center flex-wrap'>
        {sectionData.courses.map(course => (
          <CourseCard
            key={`course${course.id}`}
            state={getStateOfCourse(course.id, boughtCourses, cartItems)}
            isLoggedIn={isLoggedIn}
            course={course}
          />
        ))}
      </div>
    </section>
  )
}
