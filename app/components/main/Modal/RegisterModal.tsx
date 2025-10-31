import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import FormFieldComponent from '@/app/components/main/FormFiled'
import { useWindowSize } from '@/app/hooks'
import { useCountries } from '@/app/hooks/useCountries'
import { registerUser } from '@/app/services/authService'
import { Country } from '@/app/types'
import { RegisterData, RegisterError } from '@/app/types/auth'

import { Button } from '../../ui'
import PhoneField from '../PhoneField'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const RegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [errors, setError] = useState<Partial<RegisterError>>({})
  const { countries, loading: loadingCountries } = useCountries()
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'US',
    dialCode: '+1',
    flag: 'https://flagcdn.com/w40/us.png',
    name: 'United States'
  })
  const { width } = useWindowSize()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    let success = false
    try {
      await registerUser(formData)
      onClose()
      success = true
    } catch (error) {
      setError({ ...errors, message: '' + error })
    }
    if (success) redirect('/login')
  }

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

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-[100]'>
      <div className='w-full'>
        <div className='flex flex-col space-y-4 items-center'>
          <Button variant='static' className='lg:py-3 py-1' onClick={onClose}>
            Close
          </Button>
          <div className='w-full sm:w-[67%] bg-white bg-opacity-50 p-2 shadow-lg'>
            <div className='flex gap-[15%] flex-col-reverse sm:flex-row'>
              <div className='text-black p-6 mb-[10px] flex-grow-[1] font-["Founders Grotesk, sans-serif"]'>
                <p className='text-[12px] mb-[10px]'>Join the AOD community now</p>
                <h2 className='font-[600] text-[30px] mb-[17px]'>Be the sharpest filmmaker on set.</h2>
                <p className='text-[17px] mb-[30px]'>
                  Expert tips, Insider workshops, Latest news, sent directly to your inbox bi-weekly.
                </p>
                {errors.message && <p className='mb-2 text-red-500'>{errors.message}</p>}
                <div className='flex flex-col gap-4'>
                  <div className='flex gap-2'>
                    <div className='grow'>
                      <FormFieldComponent
                        field={{
                          id: 'firstName',
                          name: 'firstName',
                          type: 'text',
                          label: 'First Name',
                          required: true
                        }}
                        value={formData.firstName}
                        error={errors.firstName}
                        dark={true}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className='grow'>
                      <FormFieldComponent
                        field={{ id: 'lastName', name: 'lastName', type: 'text', label: 'Last Name', required: true }}
                        value={formData.lastName}
                        error={errors.lastName}
                        dark={true}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <FormFieldComponent
                      field={{ id: 'email', name: 'email', type: 'text', label: 'Email', required: true }}
                      value={formData.email}
                      error={errors.email}
                      dark={true}
                      onChange={handleInputChange}
                    />
                    <FormFieldComponent
                      field={{ id: 'password', name: 'password', type: 'password', label: 'Password', required: true }}
                      value={formData.password}
                      error={errors.lastName}
                      dark={true}
                      onChange={handleInputChange}
                    />
                  </div>
                  <PhoneField
                    countries={countries}
                    loadingCountries={loadingCountries}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    phoneValue={formData.phone}
                    dark={true}
                    onPhoneChange={handlePhoneChange}
                  />
                  <Button
                    variant='primary'
                    className='lg:py-3 py-1 self-start'
                    onClick={handleSubmit}
                    endIcon={<ArrowRight />}
                  >
                    SUBSCRIBE
                  </Button>
                </div>
              </div>
              <img
                className='w-full sm:w-[33%]'
                src={
                  width < 640
                    ? 'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F890bfac7d85dcfd84f9ba81c557fdc8eb01280c2-1404x872.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=768&q=80'
                    : 'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F361c22725f2dd0d09b8d2b7fb146c3f2d76a0f9f-1288x1848.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=3072&q=80'
                }
                alt='Stripe Payment'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
