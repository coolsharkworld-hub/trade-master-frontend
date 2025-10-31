'use client'

import { useEffect, useRef, useState } from 'react'

import { Country } from '@/app/types'

interface CountrySelectorProps {
  countries: Country[]
  loading: boolean
  selectedCountry: Country
  dark?: boolean
  onCountryChange: (country: Country) => void
}

const CountrySelector = ({
  countries,
  loading,
  dark = false,
  selectedCountry,
  onCountryChange
}: CountrySelectorProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const countrySelectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        type='button'
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center justify-center h-10 bg-transparent text-${dark ? 'black' : 'white'}`}
        disabled={loading}
      >
        {loading ? (
          <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
        ) : (
          <>
            <img src={selectedCountry.flag} alt='Country flag' className='w-6 h-6 object-contain mr-2' />
            <span className='text-xl'>{selectedCountry.dialCode}</span>
          </>
        )}
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      {showDropdown && !loading && (
        <div
          ref={countrySelectorRef}
          className='absolute z-10 mt-1 w-64 max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-md shadow-lg'
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}
        >
          {countries.map(country => (
            <div
              key={country.code}
              className='px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center'
              onClick={() => {
                onCountryChange(country)
                setShowDropdown(false)
              }}
            >
              <img src={country.flag} alt={`${country.code} flag`} className='w-6 h-6 object-contain mr-3' />
              <span className='text-white mr-2'>{country.dialCode}</span>
              <span className='text-gray-300 text-sm'>{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountrySelector
