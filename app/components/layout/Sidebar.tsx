'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'

import clsx from 'clsx'

import { AnimatedArrow, ArrowIcon, Button } from '@/app/components'
import { footerNav, sidebarNav } from '@/app/constants/nav'
import { dispatch, logout, useSelector } from '@/app/store'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [hovered, setHovered] = useState<{ section: number; item: number } | null>(null)
  const [animateIn, setAnimateIn] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isLoggedIn } = useSelector(state => state.auth)
  const pathname = usePathname()

  const footerItems = [...footerNav[0].children]
  const coursesIndex = footerItems.findIndex(item => item.title.toLowerCase() === 'courses')

  if (coursesIndex !== -1 && isLoggedIn) {
    footerItems.splice(coursesIndex + 1, 0, {
      title: 'my courses',
      link: '/my-courses'
    })
  }

  const pagesWithMyCourses = footerItems

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      const timeout = setTimeout(() => setAnimateIn(true), 20)
      return () => clearTimeout(timeout)
    } else {
      setAnimateIn(false)
      const timeout = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!visible) return null

  const hoveredCourse = hovered?.section === 1 ? footerNav[1].children[hovered.item] : null
  const hoveredImage = hoveredCourse?.imageURL ?? null
  const isNewCourse = hoveredCourse?.new ?? false

  const linkBaseClasses =
    'relative no-underline uppercase text-white transition-colors hover:text-white flex items-center gap-1'

  const isLinkActive = (link: string) => {
    if (link === '/') return pathname === '/'
    return pathname.startsWith(link)
  }

  const RedDotIndicator = () => (
    <span className='relative mr-2'>
      <span className='w-1.5 h-1.5 bg-red-500 rounded-full animate-custom-pulse block' />
    </span>
  )

  return (
    <div
      data-lenis-prevent
      className={clsx(
        'fixed inset-0 lg:mt-22 mt-10 bg-black bg-opacity-95 z-50 flex flex-col text-white hide-scrollbar p-4 md:p-10 transition-opacity duration-500 overflow-y-auto sidebar-scroll',
        animateIn ? 'opacity-100' : 'opacity-0'
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          'flex-1 flex flex-col lg:flex-row gap-10 lg:gap-20 relative w-full transition-all duration-700 ease-out',
          animateIn ? 'translate-y-0' : '-translate-y-10'
        )}
      >
        <div className='order-1 lg:order-2 min-w-0 lg:mt-0 mt-15 lg:min-w-40 transition-all duration-500 ease-out delay-200'>
          <h3 className='text-primary text-xl md:text-2xl mb-3 md:mb-4 uppercase'>{footerNav[1].header}</h3>

          <ul className='flex flex-col lg:mt-5 mt-3 gap-3 md:gap-4 text-3xl xl:text-6xl capitalize text-white mb-10 md:mb-15'>
            {footerNav[1].children.map(({ title, link, new: isNew }, i) => {
              const isActive = isLinkActive(link)
              return (
                <li
                  key={i}
                  className={clsx(
                    'flex items-center gap-2 transition-all duration-300 ease-out',
                    animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  )}
                  onMouseEnter={() => setHovered({ section: 1, item: i })}
                  onMouseLeave={() => setHovered(null)}
                  onClick={e => isMobile && e.stopPropagation()}
                >
                  <div
                    className={clsx(
                      'group flex items-center gap-2 transition-transform duration-300 ease-in-out',
                      'hover:translate-x-2 lg:hover:translate-x-4'
                    )}
                  >
                    {isActive && <RedDotIndicator />}
                    <Link
                      href={link}
                      className='relative no-underline capitalize text-white'
                      target={footerNav[1].header.toLowerCase() === 'socials' ? '_blank' : undefined}
                      rel={footerNav[1].header.toLowerCase() === 'socials' ? 'noopener noreferrer' : undefined}
                    >
                      {title}
                    </Link>
                    {isNew && (
                      <span className='text-xs text-primary px-2 py-1 md:px-3 border border-primary rounded-full uppercase select-none cursor-default'>
                        new
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          <Button
            variant='primary'
            className={clsx(
              'w-full lg:w-auto flex items-center justify-center lg:justify-start text-lg gap-2 transition-all duration-500 ease-out delay-300',
              animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
            endIcon={ArrowIcon}
            onClick={e => {
              e.stopPropagation()
              onClose()
              if (isLoggedIn) {
                dispatch(logout())
                redirect('/')
              } else {
                redirect('/login')
              }
            }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </div>
        <div className='order-2 lg:order-1 lg:mr-10 mr-0 flex flex-col gap-8 md:gap-12'>
          <div
            className={clsx(
              'transition-all duration-500 ease-out delay-100',
              animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <h3 className='text-primary text-xl xl:text-3xl lg:text-2xl uppercase mb-3 md:mb-4'>Pages</h3>
            <ul className='flex flex-col lg:mt-5 mt-3 gap-2 md:gap-3 text-xl xl:text-3xl capitalize text-white'>
              {pagesWithMyCourses.map(({ title, link }, itemIdx) => {
                const isActive = isLinkActive(link)
                return (
                  <li
                    key={itemIdx}
                    className={clsx(
                      'flex items-center gap-1 transition-all duration-300 ease-out',
                      animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                    )}
                  >
                    {isActive && <RedDotIndicator />}
                    <Link
                      href={link}
                      className='relative no-underline capitalize text-white transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-primary'
                      onClick={e => isMobile && e.stopPropagation()}
                    >
                      {title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div
            className={clsx(
              'transition-all duration-500 ease-out delay-100',
              animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <h3 className='text-primary text-xl xl:text-3xl lg:text-2xl uppercase mb-3 md:mb-4'>Socials</h3>
            <ul className='flex flex-col lg:mt-5 mt-3 gap-2 md:gap-3 text-xl xl:text-3xl capitalize text-white'>
              {footerNav[2].children.map(({ title, link }, itemIdx) => {
                const isActive = isLinkActive(link)
                return (
                  <li
                    key={itemIdx}
                    className={clsx(
                      'flex items-center gap-1 transition-all duration-300 ease-out',
                      animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
                      'social-link-animation'
                    )}
                  >
                    {isActive && <RedDotIndicator />}
                    <Link
                      href={link}
                      className='relative no-underline capitalize text-white transition-transform duration-300 ease-in-out hover:translate-x-2 hover:text-primary'
                      target='_blank'
                      rel='noopener noreferrer'
                      onMouseEnter={() => setHovered({ section: 2, item: itemIdx })}
                      onMouseLeave={() => setHovered(null)}
                      onClick={e => isMobile && e.stopPropagation()}
                    >
                      {title}
                    </Link>
                    <span className='ml-3 select-none'>
                      <AnimatedArrow />
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {!isMobile && hoveredImage && (
          <div
            className={clsx(
              'hidden lg:flex absolute right-0 top-0 h-full flex-col items-center justify-center w-2xl overflow-hidden pointer-events-none transition-all duration-500 ease-out delay-300',
              animateIn ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className='relative xl:max-w-2xl max-w-2xs align-center max-h-4/5 overflow-hidden z-[-40] animate-sidebarSlideUpFade'>
              <img key={hoveredImage} src={hoveredImage} alt='preview' className='w-full h-full object-contain' />
              {isNewCourse && (
                <div className='absolute bottom-0 left-[-60] w-32 h-32 animate-sidebarSlideUpFade'>
                  <div className='absolute left-[10] bottom-[30] clip-path w-48 h-10 bg-primary transform rotate-45 flex items-center justify-center'>
                    <span className='text-xs text-black uppercase tracking-wider'>New Course</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        className={clsx(
          'border-b border-gray-700 transition-all mt-10 duration-500 ease-out delay-400',
          animateIn ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        className={clsx(
          'px-0 py-2 mt-3 mb-3 flex flex-col lg:flex-row justify-between items-center gap-4 transition-all duration-500 ease-out delay-500',
          animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        )}
      >
        <div className='flex flex-col lg:flex-row flex-wrap gap-3 lg:gap-0'>
          {sidebarNav.map(({ title, link }, idx) => {
            const isActive = isLinkActive(link)
            return (
              <p
                key={idx}
                className={clsx(
                  'text-base md:text-lg mr-0 lg:mr-20 transition-all duration-300 ease-out flex items-center',
                  animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                )}
              >
                {isActive && <RedDotIndicator />}
                <Link href={link} className={linkBaseClasses}>
                  {title}
                </Link>
              </p>
            )
          })}
        </div>

        <p
          className={clsx(
            'text-xs md:text-sm text-center lg:text-left text-white uppercase transition-all duration-500 ease-out delay-600',
            animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          )}
        >
          the most comprehensive online filmmaking academy
        </p>
      </div>
    </div>
  )
}
