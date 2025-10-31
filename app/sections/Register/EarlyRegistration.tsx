'use client'

import { useState } from 'react'

import Image from 'next/image'

import RegisterModal from '@/app/components/main/Modal/RegisterModal'
import { RegistrationCount } from '@/app/components/main/RegistrationCount'
import { EarlyRegData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface Props {
  data?: EarlyRegData | null
}

export default function EarlyRegistration({ data }: Props) {
  const [isModalOpen, setModalOpen] = useState(true)

  const closeModal = () => {
    setModalOpen(false)
  }

  // Use Sanity data or fallback to defaults
  const earlyRegData = data || {
    title: 'Early Course Registration',
    countdownDate: '2025-12-31T23:59:59',
    image: 'https://cdn.sanity.io/images/0v9eq93x/production/924d2d38b58a7c2294b691b4f6334ebaf78c98b9-2704x1213.png',
    preRegistrationText: 'Pre-Registration Closes In'
  }

  const imageUrl = getImageUrl(earlyRegData.image)

  return (
    <section className='cta-media py-20 lg:mt-50 mt-20 h-screen w-full flex flex-col justify-center items-center px-2'>
      <RegisterModal isOpen={isModalOpen} onClose={closeModal} />

      <div className='mb-10 z-10 w-full max-w-7xl'>
        <h2 className='lg:text-8xl text-3xl text-center'>{earlyRegData.title}</h2>

        <div className='mt-10 lg:max-w-4xl max-w-2xl mx-auto px-5 relative'>
          <div className='absolute inset-0 flex items-center justify-center -z-10'>
            <div className='bg-gradient-to-br from-yellow-800/70 to-amber-600/10 rounded-full lg:h-120 lg:w-120 h-64 w-64 blur-3xl' />
          </div>

          <div className='relative z-10'>
            <Image
              src={imageUrl}
              alt={earlyRegData.title}
              width={1920}
              height={1080}
              className='w-full h-auto object-contain'
              priority
            />
          </div>
        </div>

        <div className='gap-5 items-center justify-center mt-20 lg:mb-50 mb-20 max-w-4xl mx-auto'>
          <div className='text-primary text-center lg:text-5xl text-2xl lg:mx-30 mx-5 font-medium mb-4'>
            {earlyRegData.preRegistrationText}
          </div>
          <RegistrationCount time={earlyRegData.countdownDate} />
        </div>
      </div>
    </section>
  )
}
