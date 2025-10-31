'use client'

import { toast } from 'sonner'

import { useEffect, useState } from 'react'

import { getCourseCardsData } from '@/sanity/lib/api'

import CartSection from '../sections/Cart'
import { CourseCardsData } from '../types/sanity'

const CartPage = () => {
  const [data, setData] = useState<CourseCardsData | null>(null)

  const fetchData = async () => {
    try {
      setData(await getCourseCardsData())
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data && <CartSection data={data} />
}

export default CartPage
