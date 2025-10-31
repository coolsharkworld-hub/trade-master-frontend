'use client'

import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import clsx from 'clsx'

import { ArrowIconWhite, Button } from '@/app/components'
import { getCartItems } from '@/app/services/cartService'
import { dispatch, fetchAllCartItems, logout, store, useSelector } from '@/app/store'

import { Sidebar } from './Sidebar'

interface Props {
  logo: string
}

const ButtonGroup = () => {
  const { isLoggedIn, user } = useSelector(state => state.auth)
  const { count } = useSelector(state => state.cart)
  const [mounted, setMounted] = useState(false)

  const getAllItems = async () => {
    if (isLoggedIn) {
      try {
        const res = await getCartItems(false)
        dispatch(fetchAllCartItems(res.cart))
      } catch {}
    }
  }

  useEffect(() => {
    setMounted(true)
    getAllItems()
  }, [])

  useEffect(() => {
    getAllItems()
  }, [isLoggedIn])

  const handleLogout = () => {
    dispatch(logout())
    redirect('/')
  }

  return (
    <>
      <li>
        <Button
          variant='outlined'
          className='lg:py-3 py-1'
          endIcon={ArrowIconWhite}
          onClick={isLoggedIn ? handleLogout : () => redirect('/register')}
        >
          {mounted && (isLoggedIn ? user?.firstName : 'pre-register')}
        </Button>
      </li>
      {isLoggedIn && (
        <li>
          <Button variant='outlined' className='lg:py-3 py-1' onClick={() => redirect('/cart')}>
            <ShoppingCart />
            <p>{count}</p>
          </Button>
        </li>
      )}
    </>
  )
}

export const Header = ({ logo }: Props) => {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  return (
    <Provider store={store}>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 h-24 z-66 transition-transform flex items-center px-6 lg:px-10 py-6 justify-between duration-300',
          showHeader || isSidebarOpen ? 'translate-y-0' : '-translate-y-full',
          isSidebarOpen ? 'bg-black' : 'bg-black/80 backdrop-blur-sm'
        )}
      >
        <Link href='/' className='shrink-0'>
          <Image
            src={logo}
            alt='Logo'
            width={120}
            height={45}
            priority
            className='cursor-pointer lg:w-24 lg:h-24 w-16 h-16'
          />
        </Link>

        <nav>
          <ul className='flex items-center gap-1 md:gap-2 leading-5 text-xs sm:text-base tracking-tight font-mono'>
            <li>
              <Button variant='outlined' className='lg:py-3 py-1' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {isSidebarOpen ? 'close' : 'menu'}
              </Button>
            </li>

            <ButtonGroup />
          </ul>
        </nav>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </Provider>
  )
}
