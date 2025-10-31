import Link from 'next/link'

export default function LoginHeader() {
  const navItems = [
    { href: '/contact', label: 'Contact' },
    { href: '/store', label: 'Store' },
    { href: '/login', label: 'Log In' }
  ]

  return (
    <header className='fixed top-0 left-0 w-full bg-black shadow-md p-6 z-50'>
      <div className='max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center'>
        <Link href='/' className='shrink-0'>
          <img
            src='https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/themes/2153193914/settings_images/043dea2-7151-06d8-f3cd-846bef5ab42a_Artboard_13.png'
            alt='Logo'
            width={50}
            height={15}
            className='cursor-pointer lg:w-15 lg:h-10 w-12 h-12 object-contain'
          />
        </Link>
        <nav className='flex items-center space-x-6 md:space-x-8'>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='text-white hover:text-blue-400 transition-colors lg:text-xl text-sm'
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
