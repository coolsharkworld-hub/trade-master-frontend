import { useEffect, useState } from 'react'

import { ApiCountry, Country } from '@/app/types'

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name,idd,flags')
        const data: ApiCountry[] = await response.json()

        const formattedCountries = data
          .filter(country => country.idd.root && country.idd.suffixes)
          .map(country => {
            const dialCode = country.idd.root + (country.idd.suffixes[0] || '')
            return {
              code: country.cca2,
              name: country.name.common,
              dialCode: dialCode,
              flag: country.flags.png
            } as Country
          })
          .sort((a, b) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)
      } catch (error) {
        console.error('Failed to fetch countries:', error)
        setCountries([
          { code: 'US', name: 'United States', dialCode: '+1', flag: 'https://flagcdn.com/w40/us.png' },
          { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: 'https://flagcdn.com/w40/gb.png' },
          { code: 'CN', name: 'China', dialCode: '+86', flag: 'https://flagcdn.com/w40/cn.png' },
          { code: 'CA', name: 'Canada', dialCode: '+1', flag: 'https://flagcdn.com/w40/ca.png' },
          { code: 'AU', name: 'Australia', dialCode: '+61', flag: 'https://flagcdn.com/w40/au.png' },
          { code: 'DE', name: 'Germany', dialCode: '+49', flag: 'https://flagcdn.com/w40/de.png' },
          { code: 'FR', name: 'France', dialCode: '+33', flag: 'https://flagcdn.com/w40/fr.png' },
          { code: 'GM', name: 'Gambia', dialCode: '+220', flag: 'https://flagcdn.com/w40/gm.png' }
        ] as Country[])
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return { countries, loading }
}
