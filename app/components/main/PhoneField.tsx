'use client'

import { Country } from '@/app/types'

import CountrySelector from './CountrySelector'

interface PhoneFieldProps {
  countries: Country[]
  loadingCountries: boolean
  selectedCountry: Country
  onCountryChange: (country: Country) => void
  phoneValue: string
  dark?: boolean
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PhoneField = ({
  countries,
  loadingCountries,
  selectedCountry,
  onCountryChange,
  phoneValue,
  dark = false,
  onPhoneChange
}: PhoneFieldProps) => {
  return (
    <div className='relative w-full'>
      <label htmlFor='phone' className={`text-${dark ? 'black' : 'white'} text-xl mb-2 block`}>
        Phone Number
      </label>
      <div className='flex items-center border-b border-gray-400 focus-within:border-blue-500 pb-3'>
        <CountrySelector
          countries={countries}
          loading={loadingCountries}
          dark={dark}
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />

        <input
          type='tel'
          id='phone'
          name='phone'
          value={phoneValue}
          onChange={onPhoneChange}
          placeholder='555-1234'
          required
          className={`flex-1 block w-full focus:ring-0 outline-none py-1 text-${dark ? 'black' : 'white'} text-xl bg-transparent ml-2`}
          disabled={loadingCountries}
        />
      </div>
      {loadingCountries && <p className='text-sm text-gray-400 mt-1'>Loading country codes...</p>}
    </div>
  )
}

export default PhoneField
