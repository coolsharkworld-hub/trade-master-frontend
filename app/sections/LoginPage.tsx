'use client'

import React, { useState } from 'react'

import { redirect } from 'next/navigation'

import { LoginPageData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

import { loginUser } from '../services/authService'
import { getCartItems } from '../services/cartService'
import { dispatch, fetchAllCartItems, login, useSelector } from '../store'

interface LoginPageProps {
  data?: LoginPageData
}

const LoginPage = ({ data }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const { isLoggedIn } = useSelector(state => state.auth)
  if (isLoggedIn) redirect('/courses')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let success = false
    try {
      const res = await loginUser({ email, password })
      dispatch(login({ user: res.user, token: res.token }))
      const cartRes = await getCartItems(false)
      dispatch(fetchAllCartItems(cartRes.cart))
      success = true
    } catch (error) {
      setError('' + error)
    }
    if (success) redirect('/courses')
  }

  const loginPageData = data || {
    title: 'Log In',
    backgroundImage:
      'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2153193914/settings_images/d5a1d0d-ef6-f37a-eec7-df45126c707_CKD_BTS_Photo-78.jpg',
    logo: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2153193914/settings_images/44f6c-c37e-eb64-8c4e-7ea4c0301dd_af8cfe01-ae8b-4486-ac73-3442fd6d4cde.png',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    rememberMeText: 'Remember me',
    submitButtonText: 'Submit',
    forgotPasswordText: 'Forgot password?'
  }

  const backgroundImageUrl = getImageUrl(loginPageData.backgroundImage)
  const logoUrl = getImageUrl(loginPageData.logo)

  return (
    <div
      className='min-h-screen flex items-center justify-center p-4 pt-30'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('${backgroundImageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className='flex flex-col items-center w-full max-w-2xl'>
        <div className='w-full px-5 flex justify-center'>
          <img src={logoUrl} alt='Logo' className='w-full object-contain' />
        </div>
        <div className='w-full py-5 px-5 rounded-xl bg-opacity-50'>
          <h1 className='text-4xl mb-2 text-center text-white uppercase'>{loginPageData.title}</h1>
          {error && <p className='mb-8 text-center text-red-500'>{error}</p>}
          <form onSubmit={handleSubmit} className='space-y-8'>
            <div>
              <h3 className='text-xl my-1 text-gray-300'>{loginPageData.emailLabel}</h3>
              <input
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full px-4 py-2 border bg-white text-gray-700 border-white rounded-sm focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg'
                required
              />
            </div>

            <div>
              <h3 className='text-xl my-1 text-gray-300'>{loginPageData.passwordLabel}</h3>
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full px-4 py-2 border bg-white text-gray-700 border-white rounded-sm focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg'
                required
              />
            </div>

            <div className='flex items-center mb-8'>
              <input
                type='checkbox'
                id='rememberMe'
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='rememberMe' className='ml-3 block text-lg text-white'>
                {loginPageData.rememberMeText}
              </label>
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-blue-600 text-white px-8 py-2 hover:bg-blue-700 transition text-xl shadow-md rounded-sm'
              >
                {loginPageData.submitButtonText}
              </button>
            </div>
          </form>
          <div className='mt-4 text-center'>
            <a href='#' className='text-lg text-white hover:text-blue-300 font-medium transition'>
              {loginPageData.forgotPasswordText}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
