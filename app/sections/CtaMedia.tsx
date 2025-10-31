'use client'

import AutoScroll from 'embla-carousel-auto-scroll'

import useEmblaCarousel from 'embla-carousel-react'

import { ctaMedias } from '@/app/constants'
import { CtaMediaSectionData } from '@/app/types/sanity'
import { getImageUrl } from '@/sanity/lib/utils'

interface Props {
  data?: CtaMediaSectionData
}

export default function CtaMedia({ data }: Props) {
  const [sliderRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      containScroll: 'trimSnaps',
      align: 'start'
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  )

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function ensureMinArrayCount(array: any[], minCount: number) {
    const result = []
    while (result.length < minCount) {
      result.push(...array)
    }
    return result.slice(0, minCount)
  }

  const extendedArray = ensureMinArrayCount(ctaMedias, 20)

  // Use Sanity data or fallback to constants
  const sectionData = data || {
    title: 'A proven step-by-step guide to creating impactful films',
    description: '',
    background:
      'https://cdn.sanity.io/images/0v9eq93x/production/1d93e950e42cb2bd2ec94f684083fbfc6e21d689-5760x3240.jpg',
    media: extendedArray.map((image, index) => ({ _key: `media-${index}`, image }))
  }

  const mediaItems = ensureMinArrayCount(
    sectionData.media || extendedArray.map((image, index) => ({ _key: `media-${index}`, image })),
    20
  )

  return (
    <section className='cta-media py-28 relative h-screen w-full flex flex-col justify-center items-center'>
      <div className='mb-20 z-10 relative'>
        <h2 className='lg:text-8xl sm:text-4xl mx-auto text-center max-w-7xl'>{sectionData.title}</h2>
        <div className='overflow-hidden mt-25 w-[95vw]' ref={sliderRef}>
          <div className='flex'>
            {mediaItems.map((m, i) => (
              <div key={i} className='flex-[0_0_auto] mr-16 w-40'>
                <img
                  src={getImageUrl(m.image)}
                  alt={`media ${i + 1}`}
                  className='w-full h-auto pointer-events-none select-none'
                  draggable={false}
                  loading='lazy'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <picture className="absolute inset-0 opacity-100 after:content-[''] after:absolute after:inset-0 after:bg-black/20 after:z-[1]">
        <img
          alt=''
          loading='lazy'
          decoding='async'
          src={getImageUrl(sectionData.background)}
          className='w-full h-full object-cover'
        />
      </picture>
    </section>
  )
}
