'use client'

import { iconTexts } from '@/app/constants'
import { IconTextBlocksData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface Props {
  data?: IconTextBlocksData
}

export default function IconTextBlocks({ data }: Props) {
  // Use Sanity data or fallback to constants
  const sectionData = data || {
    title: `What's included when you join AOD`,
    description: '',
    items: iconTexts.map((item, index) => ({ _key: `item-${index}`, ...item }))
  }

  const items = sectionData.items || iconTexts.map((item, index) => ({ _key: `item-${index}`, ...item }))

  return (
    <section className='px-6 py-28 relative'>
      <h2 className='lg:text-8xl text-5xl text-center mb-20 mx-auto max-w-3xl'>{sectionData.title}</h2>
      <ul className='grid grid-cols-2 sm:grid-cols-3 text-center gap-0 '>
        {items.map((item, index) => {
          const showRightBorderMobile = (index + 1) % 2 !== 0
          const showBottomBorderMobile = index < items.length - 2

          const showRightBorderDesktop = (index + 1) % 3 !== 0
          const showBottomBorderDesktop = index < items.length - 3

          const icon = getImageUrl(item.icon)

          return (
            <li
              key={item._key || index}
              className='relative flex flex-col items-center justify-center py-10 px-8 gap-4'
            >
              {showRightBorderMobile && (
                <span className='absolute right-0 top-[10%] bottom-[10%] w-px lg:text-2xl text-lg bg-young-night sm:hidden' />
              )}
              {showRightBorderDesktop && (
                <span className='absolute right-0 top-[10%] bottom-[10%] w-px lg:text-2xl text-lg bg-young-night max-sm:hidden' />
              )}

              {showBottomBorderMobile && (
                <span className='absolute left-[10%] right-[10%] bottom-0 h-px lg:text-2xl text-lg bg-young-night sm:hidden' />
              )}
              {showBottomBorderDesktop && (
                <span className='absolute left-[10%] right-[10%] bottom-0 h-px lg:text-2xl text-lg bg-young-night max-sm:hidden' />
              )}

              <img src={icon} alt={item.title} className='w-14 h-14' />
              <span className='lg:text-2xl text-lg'>{item.title}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
