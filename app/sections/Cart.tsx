import { Elements } from '@stripe/react-stripe-js'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'

// app/cart/page.tsx
import { Button, CourseCard } from '../components'
import PaymentModal from '../components/main/Modal/PaymentModal'
import { STRIPE_PUBLIC_KEY } from '../configs'
import { createPayment } from '../services/paymentService'
import { useSelector } from '../store'
import { CourseCardsData, CourseData } from '../types/sanity'

interface Props {
  data: CourseCardsData
}

export default function CartSection({ data }: Props) {
  const [isOpen, setOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [cartItems, setCartItems] = useState<CourseData[]>([])
  const cartItemIds = useSelector(state => state.cart.items)
  console.log('PUBLIC: ', STRIPE_PUBLIC_KEY)
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
  const { isLoggedIn } = useSelector(state => state.auth)
  const courseCount = cartItems.length
  if (!isLoggedIn) redirect('/login')

  useEffect(() => {
    const courses = cartItemIds.map(itemId => data.courses.filter(course => course.id == itemId.courseId)[0])
    setCartItems(courses)
  }, [cartItemIds, data.courses])

  const handleBuy = () => {
    setOpen(true)
  }

  const getClientSecret = async () => {
    const amount = cartItems.reduce((acc, cur) => parseInt(acc.toString()) + parseInt(cur.price.toString()), 0) * 100
    if (amount > 0) {
      const res = await createPayment(amount, 'usd')
      setClientSecret(res.intent.client_secret)
    }
  }

  useEffect(() => {
    getClientSecret()
  }, [cartItems])

  const options: StripeElementsOptions = {
    clientSecret
  }

  return (
    <div className='container'>
      <div className='flex flex-col sm:flex-row justify-between items-end mb-4 gap-2'>
        <h1 className='text-3xl sm:text-6xl lg:text-8xl'>Course Cart</h1>
        <p className='text-lg sm:text-xl text-gray-300'>
          You have <b className='text-blue-500'>{courseCount} courses</b> in your cart
        </p>
      </div>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-6'>
        <p className='text-xl sm:text-2xl'>
          Total Price:{' '}
          <b className='text-green-500 text-3xl sm:text-4xl'>
            {cartItems.reduce((acc: number, cur) => parseInt(acc.toString()) + parseInt(cur.price.toString()), 0)}
          </b>
          $
        </p>
        <Button
          variant='primary'
          className='text-base'
          endIcon={<ArrowRight className='w-3 h-3' />}
          onClick={handleBuy}
          disabled={cartItems.length == 0}
        >
          Checkout
        </Button>
      </div>
      {cartItems.length == 0 ? (
        <p className='text-center my-10 sm:my-30 text-2xl sm:text-6xl text-gray-500'>No Course Selected</p>
      ) : (
        cartItems.map((course, index) => (
          <CourseCard key={`course${index}`} isLoggedIn={true} state={1} course={course} />
        ))
      )}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentModal isOpen={isOpen} onClose={() => setOpen(false)} />
        </Elements>
      )}
    </div>
  )
}
