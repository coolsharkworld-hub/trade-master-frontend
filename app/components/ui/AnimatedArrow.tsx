export const AnimatedArrow = () => (
  <span className='relative flex gap-5 select-none font-mono text-nowrap'>
    {`[ `}
    <span className='arrow absolute left-1/2 transform-[translateX(-50%)]'>{' ↗ '}</span>
    {' ]'}
  </span>
)
