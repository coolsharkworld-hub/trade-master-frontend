import clsx from 'clsx'

interface Props {
  price: number
  isBestValue: boolean
}

export const MarqueeInlineAnimation = ({ price, isBestValue }: Props) => {
  const repeated = Array(10).fill(`• $${price}`)

  return (
    <div
      className={clsx(
        'relative overflow-hidden border-t border-gray-300 py-3',
        isBestValue ? 'bg-primary' : 'bg-black'
      )}
    >
      <div className='flex whitespace-nowrap animate-[marquee_15s_linear_infinite]'>
        {repeated.map((text, idx) => (
          <span key={idx} className='mx-2 md:mx-4 text-base md:text-2xl text-white'>
            Save {text}
          </span>
        ))}
      </div>
    </div>
  )
}
