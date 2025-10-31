import { toast } from 'sonner'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { FormEvent, useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import PaymentAnimation from '@/app/assets/payment-animation.gif'
import { clearAllFromCart } from '@/app/services/cartService'
import { clearCart, dispatch } from '@/app/store'

import { ArrowIcon, Button } from '../../ui'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const PaymentModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  const handlePaymentSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setProcessing(true)

    try {
      if (!stripe || !elements) throw new Error()

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://trade-master-frontend-2chs.onrender.com/courses`
        },
        redirect: 'if_required'
      })

      if (error) {
        console.log('Error Occured')
        toast.error(error.message ?? 'An unknown error occurred')
      } else if (paymentIntent && paymentIntent.status == 'succeeded') {
        await clearAllFromCart(true)
        dispatch(clearCart())
        onClose()
        toast.success('Payment successful!')
        redirect('/courses')
      } else {
        throw new Error()
      }
    } catch (error) {
      if ((error as Error).message.indexOf('REDIRECT') < 0) toast.error('Payment failed. Please try again.')
    }
    setProcessing(false)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-[100]'>
      <div className='w-full'>
        <div className='flex flex-col space-y-4 items-center'>
          <Button variant='static' className='lg:py-3 py-1' onClick={onClose}>
            Close
          </Button>
          <div className='bg-white bg-opacity-50 p-6 shadow-lg w-full sm:w-[40%]'>
            <form id='payment' className='flex flex-col gap-10' onSubmit={handlePaymentSubmit}>
              <div className='flex justify-between gap-2'>
                <h2 className='text-black text-3xl'>Payment</h2>
                <div className='flex gap-3 items-center'>
                  <img src={PaymentAnimation.src} className='h-[35px]' />
                </div>
              </div>
              <PaymentElement />
              <Button 
                variant='blue' 
                className='py-2 text-xl flex items-center justify-center gap-2' 
                endIcon={processing ? <Spinner /> : ArrowIcon} 
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Checkout'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const Spinner = () => (
  <svg 
    className="animate-spin h-5 w-5 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

export default PaymentModal