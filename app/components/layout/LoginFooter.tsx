import { socialIcons } from '../ui'

export default function LoginFooter() {
  return (
    <footer className='w-full bg-white text-center px-4 md:px-12 py-8 text-sm text-gray-600 border-t border-gray-200'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 mb-6'>
          <div className='text-lg text-gray-800'>© {new Date().getFullYear()} AOD</div>

          <div className='flex-shrink-0'>
            <img
              src='https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2153193914/settings_images/ad57f78-ecf8-7fcf-8b74-f5428551f805_Artboard_14.png'
              alt='Logo'
              className='cursor-pointer w-16 h-16 object-contain'
            />
          </div>

          <div className='flex space-x-6'>
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href={icon.href}
                className={icon.className}
                aria-label={icon.ariaLabel}
                target='_blank'
                rel='noopener noreferrer'
              >
                {icon.icon}
              </a>
            ))}
          </div>
        </div>

        <div className='text-center md:text-right mt-4'>
          <p className='text-md text-black cursor-pointer'>Powered by Kajabi</p>
        </div>
      </div>
    </footer>
  )
}
