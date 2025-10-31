'use client'

interface Props {
  title: string
}

export const SectionHeader = ({ title }: Props) => (
  <h2
    className='text-white text-center leading-tight mt-20 mb-12 text-4xl lg:text-7xl max-w-full'
    dangerouslySetInnerHTML={{ __html: title }}
  />
)
