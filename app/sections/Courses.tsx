'use client'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { CourseCard, CourseCardFull, CoursesToggle } from '@/app/components'
import { CourseCardsData } from '@/app/types/sanity'

import { getStateOfCourse } from '../helpers/course'
import { getCartItems } from '../services/cartService'
import { useSelector } from '../store'
import { CartItem } from '../types/cart'

interface Props {
  data?: CourseCardsData
}

export const CoursesSection = ({ data }: Props) => {
  const [tab, setTab] = useState(0)
  const [isBought, setBought] = useState(false)
  const [boughtCourses, setBoughtCourses] = useState<CartItem[]>([])
  const { items: cartItems } = useSelector(state => state.cart)
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

  return (
    <div className='courses-page'>
      <div className='flex flex-col xl:flex-row justify-between w-full mt-20 mb-10 lg:mt-50 lg:mb-20 px-6'>
        <h1 className='text-primary uppercase text-xl mt-3'>Courses</h1>
        <div>
          <h2 className='text-6xl lg:text-8xl'>The AOD Courses</h2>
          <pre className='text-xl'>{`The most comprehensive online\n filmmaking academy.`}</pre>
        </div>
        <div className='mt-3 flex items-center'>
          <CoursesToggle className='w-full' defaultValue={tab} onChange={index => setTab(index)} />
        </div>
      </div>

      <div className={clsx('px-6', tab ? 'block' : 'hidden')}>
        {data?.courses.map((course, index) => {
          const state = getStateOfCourse(course.id, boughtCourses, cartItems)
          if (!isBought || (isBought && state === 2))
            return <CourseCard key={`course${index}`} state={state} isLoggedIn={isLoggedIn} course={course} />
          return <div key={`course${index}`}></div>
        })}
      </div>

      <div className={clsx('px-0 overflow-clip', tab ? 'hidden' : 'block')}>
        {data?.courses.map((course, index) => {
          const state = getStateOfCourse(course.id, boughtCourses, cartItems)
          if (!isBought || (isBought && state === 2))
            return <CourseCardFull key={`courseFull${index}`} state={state} isLoggedIn={isLoggedIn} course={course} />
          return <div key={`course${index}`}></div>
        })}
      </div>
    </div>
  )
}
