'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { redirect } from 'next/navigation'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { Button } from '@/app/components'
import CourseCarousel from '@/app/components/main/CourseCarousel'
import CourseGrid from '@/app/components/main/CourseGrid'
import FormFieldComponent from '@/app/components/main/FormFiled'
import PhoneField from '@/app/components/main/PhoneField'
import { registrationFormTestData } from '@/app/constants/registrationFormData'
import { useCountries } from '@/app/hooks/useCountries'
import { useSelector } from '@/app/store'
import { Country, FormData, FormField } from '@/app/types'
import { RegistrationFormData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface RegistrationFormProps {
  data?: RegistrationFormData
}

const RegistrationForm = ({ data }: RegistrationFormProps) => {
  const { isLoggedIn } = useSelector(state => state.auth)
  if (isLoggedIn) redirect('/courses')

  const registrationFormData = data || registrationFormTestData

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    course: ''
  })
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'US',
    dialCode: '+1',
    flag: 'https://flagcdn.com/w40/us.png',
    name: 'United States'
  })
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])

  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const animationCreated = useRef(false)

  const { countries, loading: loadingCountries } = useCountries()

  const formFields: FormField[] = [
    { id: 'firstName', name: 'firstName', type: 'text', label: 'First Name', required: true },
    { id: 'lastName', name: 'lastName', type: 'text', label: 'Last Name', required: true },
    { id: 'email', name: 'email', type: 'email', label: 'Email Address', required: true },
    { id: 'phone', name: 'phone', type: 'tel', label: 'Phone Number', required: true },
    { id: 'course', name: 'course', type: 'text', label: 'Select Course(s)', required: true }
  ]

  // Get image URLs for all courses
  const images = registrationFormData.courses.map(course => getImageUrl(course.image))

  useEffect(() => {
    const checkScreenSize = () => window.innerWidth >= 1024

    const setupAnimation = () => {
      const formEl = formRef.current

      if (!formEl || animationCreated.current) return

      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      if (checkScreenSize()) {
        gsap.timeline({
          scrollTrigger: {
            scrub: 1,
            pin: true,
            trigger: formEl,
            start: '19% 60%',
            endTrigger: '#pin-wrap',
            end: 'bottom 60%',
            markers: false
          }
        })

        animationCreated.current = true
        console.log('ScrollTrigger animation created')
      }
    }

    // Initialize animation immediately
    setupAnimation()

    // Refresh ScrollTrigger after a short delay to ensure DOM is ready
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
      console.log('ScrollTrigger refreshed')
    }, 100)

    const handleResize = () => {
      if (checkScreenSize() && !animationCreated.current) {
        setupAnimation()
      } else if (!checkScreenSize() && animationCreated.current) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        animationCreated.current = false
      }

      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      clearTimeout(refreshTimer)
      animationCreated.current = false
    }
  }, [])

  // Add this useEffect to handle route changes
  useEffect(() => {
    // Reinitialize animation when component mounts (on route change)
    const timer = setTimeout(() => {
      if (formRef.current && !animationCreated.current) {
        const checkScreenSize = () => window.innerWidth >= 1024

        if (checkScreenSize()) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill())

          gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              pin: true,
              trigger: formRef.current,
              start: '18% 50%',
              endTrigger: '#pin-wrap',
              end: 'bottom 50%',
              markers: false
            }
          })

          animationCreated.current = true
          ScrollTrigger.refresh()
          console.log('ScrollTrigger reinitialized on route change')
        }
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    setFormData(prev => ({ ...prev, phone: value }))
  }

  const handleCourseSelect = (index: number) => {
    const course = registrationFormData.courses[index]
    // Only allow selection if course is available
    if (course.isAvailable) {
      if (selectedCourses.includes(index)) {
        setSelectedCourses(selectedCourses.filter(i => i !== index))
      } else {
        setSelectedCourses([...selectedCourses, index])
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedCourseNames = selectedCourses.map(i => registrationFormData.courses[i].name)
    const fullPhone = selectedCountry.dialCode + formData.phone
    alert(`Registration submitted for: ${selectedCourseNames.join(', ')}\nPhone: ${fullPhone}`)
    console.log({ ...formData, phone: fullPhone, courses: selectedCourseNames })
  }

  return (
    <div ref={sectionRef} className='bg-black py-12 px-4 sm:px-6 lg:px-8'>
      <div className='mx-5 flex flex-col lg:flex-row gap-8'>
        <div ref={leftRef} className='lg:w-1/2 hidden lg:block'>
          <CourseGrid
            images={images}
            courses={registrationFormData.courses}
            selectedCourses={selectedCourses}
            onCourseSelect={handleCourseSelect}
          />
        </div>

        <div className='lg:hidden w-full'>
          <CourseCarousel
            images={images}
            courses={registrationFormData.courses}
            selectedCourses={selectedCourses}
            onCourseSelect={handleCourseSelect}
          />
        </div>

        <div className='lg:w-1/2 flex justify-center' id='pin-wrap'>
          <div ref={formRef} className='rounded-2xl shadow-xl p-8 w-full max-w-xl'>
            <h2 className='text-4xl text-left text-primary mb-8'>{registrationFormData.title}</h2>
            <form onSubmit={handleSubmit} className='space-y-8'>
              {formFields.map(field =>
                field.id === 'phone' ? (
                  <PhoneField
                    key={field.id}
                    countries={countries}
                    loadingCountries={loadingCountries}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    phoneValue={formData.phone}
                    onPhoneChange={handlePhoneChange}
                  />
                ) : (
                  <FormFieldComponent
                    key={field.id}
                    field={field}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                  />
                )
              )}

              <Button variant='primary' className='text-lg w-full lg:text-2xl' endIcon={<ArrowRight />}>
                {registrationFormData.buttonText}
              </Button>

              <p className='text-2xl text-gray-500 text-center mt-6'>{registrationFormData.footerText}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
