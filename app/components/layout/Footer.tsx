'use client'

import Image from 'next/image'
import Link from 'next/link'

import clsx from 'clsx'

import { AnimatedArrow, ArrowIcon, Button } from '@/app/components'
import { bottomFooterNav, footerNav } from '@/app/constants/nav'

interface Props {
  logo: string
}

export const Footer = ({ logo }: Props) => {
  const linkBaseClasses =
    'relative no-underline uppercase text-white transition-colors hover:text-white mr-5 flex items-center gap-1 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-[width] after:duration-300 hover:after:w-full gap-2'

  return (
    <footer className='bg-black text-gray-700 mt-20'>
      <div className='flex flex-col lg:flex-row justify-between px-4 lg:px-6 py-12 gap-5'>
        <div className='flex flex-col gap-4 max-w-xs mb-15'>
          <Link href='/' className='shrink-0'>
            <Image src={logo} alt='Logo' width={120} height={45} priority className='cursor-pointer' />
          </Link>
          <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-normal mt-3 whitespace-nowrap mb-5'>
            Join the AOD community row
          </p>

          <Button variant='primary' className='py-2 text-xl ' endIcon={ArrowIcon}>
            Join our email list
          </Button>
        </div>

        <div className='flex gap-3 lg:gap-18 mb-20 justify-between'>
          <div>
            <h3 className='text-primary lg:text-lg tracking-wider sm:text-sm uppercase mb-8 lg:mb-4'>
              {footerNav[0].header}
            </h3>
            <ul className='flex flex-col gap-5 lg:gap-3 lg:text-lg sm:text-sm uppercase text-white'>
              {footerNav[0].children.map(({ title, link }, i) => (
                <li key={i} className='flex items-center lg:gap-1 sm:gap-3 tracking-wider'>
                  <Link
                    href={link}
                    className={clsx(
                      linkBaseClasses,
                      footerNav[0].header.toLowerCase() === 'socials' && 'social-link-animation'
                    )}
                  >
                    {title}
                    {footerNav[0].header.toLowerCase() === 'socials' && <AnimatedArrow />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col gap-8'>
            {footerNav.slice(1, 3).map(({ header, children }, idx) => (
              <div key={idx}>
                <h3 className='text-primary lg:text-lg sm:text-sm uppercase mb-8 lg:mb-4 tracking-wider'>{header}</h3>
                <ul className='flex flex-col gap-5 lg:gap-3 lg:text-lg sm:text-sm uppercase tracking-wider text-white'>
                  {children.map(({ title, link }, i) => (
                    <li key={i} className='flex items-center'>
                      <Link
                        href={link}
                        className={clsx(linkBaseClasses, header.toLowerCase() === 'socials' && 'social-link-animation')}
                        target={header.toLowerCase() === 'socials' ? '_blank' : undefined}
                        rel={header.toLowerCase() === 'socials' ? 'noopener noreferrer' : undefined}
                      >
                        {title}
                        {header.toLowerCase() === 'socials' && <AnimatedArrow />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mx-auto px-6 py-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-4'>
        <p className='text-sm text-center lg:text-lg sm:text-sm lg:text-left text-white uppercase tracking-wide'>
          © 2020-2024 the art of documentary & aod
        </p>

        {bottomFooterNav.map(({ title, link }, idx) => (
          <p key={idx} className='lg:text-lg sm:text-sm mr-0 lg:mr-20 sm:no-underline'>
            <Link href={link} className={linkBaseClasses}>
              {title}
            </Link>
          </p>
        ))}
      </div>
    </footer>
  )
}
