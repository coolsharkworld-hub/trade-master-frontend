import clsx from 'clsx'

interface Props {
  title: string
  className?: string
}

export const MarqueeAnimation = ({ title, className }: Props) => {
  const repeated = Array(20).fill(title)

  return (
    <div className={clsx('absolute w-full z-10 top-0 overflow-hidden py-1 bg-primary', className)}>
      <div className='flex whitespace-nowrap animate-[marquee_15s_linear_infinite]'>
        {repeated.map((text, idx) => (
          <pre key={idx} className='mx-2 text-black uppercase'>
            {text}
          </pre>
        ))}
      </div>
    </div>
  )
}
