'use client'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { CourseCard, CourseCardFull, CoursesToggle } from '@/app/components'
import { CourseCardsData } from '@/app/types/sanity'
import { getCourseCardsData } from '@/sanity/lib/api'

import { getStateOfCourse } from '../helpers/course'
import { getCartItems } from '../services/cartService'
import { useSelector } from '../store'
import { CartItem } from '../types/cart'

export default function MyCoursesPage() {
  const [tab, setTab] = useState(0)
  const [boughtCourses, setBoughtCourses] = useState<CartItem[]>([])
  const [coursesData, setCoursesData] = useState<CourseCardsData>()
  const [isLoading, setIsLoading] = useState(true)

  const { items: cartItems } = useSelector(state => state.cart)
  const { isLoggedIn } = useSelector(state => state.auth)

  const fetchData = async () => {
    if (!isLoggedIn) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)

      const [cartResponse, sanityData] = await Promise.allSettled([getCartItems(true), getCourseCardsData()])

      if (cartResponse.status === 'fulfilled') {
        setBoughtCourses(cartResponse.value.cart)
      } else {
        toast.error('Failed to load purchased courses')
        console.error('Cart fetch error:', cartResponse.reason)
      }

      if (sanityData.status === 'fulfilled') {
        setCoursesData(sanityData.value)
      } else {
        toast.error('Failed to load courses data')
        console.error('Sanity fetch error:', sanityData.reason)
      }
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <div className='min-h-screen pt-20 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-white text-xl mb-4'>Please log in to view your courses</p>
          <a href='/login' className='px-6 py-2 bg-primary text-black rounded hover:bg-opacity-90 transition-colors'>
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='min-h-screen pt-20 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-white text-xl'>Loading your courses...</p>
        </div>
      </div>
    )
  }

  const purchasedCourses =
    coursesData?.courses.filter(course => {
      const state = getStateOfCourse(course.id, boughtCourses, cartItems)
      return state === 2
    }) || []

  if (purchasedCourses.length === 0) {
    return (
      <div className='min-h-screen pt-20 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-white text-3xl mb-4'>No Courses Purchased Yet</h2>
          <p className='text-white text-xl'>
            You haven {"'"} t purchased any courses yet. Explore our courses to start learning!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pt-20 courses-page'>
      <div className='flex flex-col xl:flex-row justify-between w-full mt-20 mb-10 lg:mt-50 lg:mb-20 px-6'>
        <h1 className='text-primary uppercase text-xl mt-3'>My Courses</h1>
        <div>
          <h2 className='text-6xl lg:text-8xl'>My Learning Journey</h2>
          <pre className='text-xl'>{`${purchasedCourses.length} course${
            purchasedCourses.length !== 1 ? 's' : ''
          } in your collection`}</pre>
        </div>
        <div className='mt-3 flex items-center'>
          <div className='courses-toggle'>
            {isLoggedIn && (
              <div className='text-tangle-web p-3 flex items-center gap-1 cursor-pointer text-white courses-active'>
                <svg
                  className='w-5 h-3.5'
                  fill='none'
                  height='14'
                  viewBox='0 0 19 14'
                  width='19'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g fill='currentColor'>
                    <path d='m4 11.5h-2.81651v-10h2.81651v-1h-4v12h4z' />
                    <circle cx='9.5' cy='6.5' r='2' className='hidden' />
                    <path d='m15 11.5h2.8165v-10h-2.8165v-1h4v12h-4z' />
                  </g>
                </svg>
                <span>Purchased Courses</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={clsx('px-6', tab ? 'block' : 'hidden')}>
        {purchasedCourses.map((course, index) => {
          const state = getStateOfCourse(course.id, boughtCourses, cartItems)
          return <CourseCard key={`course${index}`} state={state} isLoggedIn={isLoggedIn} course={course} />
        })}
      </div>
      <div className={clsx('px-0 overflow-clip', tab ? 'hidden' : 'block')}>
        {purchasedCourses.map((course, index) => {
          const state = getStateOfCourse(course.id, boughtCourses, cartItems)
          return <CourseCardFull key={`courseFull${index}`} state={state} isLoggedIn={isLoggedIn} course={course} />
        })}
      </div>
    </div>
  )
}
