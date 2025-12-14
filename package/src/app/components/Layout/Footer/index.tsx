'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react'
import { FooterLinkType } from '@/app/types/footerlinks'

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        SetFooterlink(data.FooterLinkData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <footer className="bg-darkblue"> {/* Added bg color just in case */}
      <div className='container py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 xl:gap-8'>
          
          {/* COLUMN-1: Logo & Socials */}
          <div className='lg:col-span-4 sm:col-span-2 flex flex-col gap-5'>
            <div className='w-fit'>
               <Logo />
            </div>
            <p className='text-base text-gray-400 leading-relaxed'>
              Specializing in MEAN stack development, scalable architecture, and clean code.
            </p>
            <div className='flex gap-4 mt-2'>
              <Link href='https://www.linkedin.com/in/abdul-haris-h/' target="_blank">
                <Icon
                  icon='tabler:brand-linkedin'
                  width={40}
                  height={40}
                  className='text-white bg-white/10 rounded-lg p-2 hover:bg-primary hover:text-white transition-all duration-300'
                />
              </Link>
              <Link href='https://github.com/Haris7430' target="_blank">
                <Icon
                  icon='tabler:brand-github'
                  width={40}
                  height={40}
                  className='text-white bg-white/10 rounded-lg p-2 hover:bg-primary hover:text-white transition-all duration-300'
                />
              </Link>
              <Link href='mailto:abdul.haris7085@gmail.com'>
                <Icon
                  icon='tabler:mail'
                  width={40}
                  height={40}
                  className='text-white bg-white/10 rounded-lg p-2 hover:bg-primary hover:text-white transition-all duration-300'
                />
              </Link>
            </div>
          </div>

          {/* COLUMN-2: Links (Make sure route.ts has good links!) */}
          <div className='lg:col-span-4 col-span-1'>
            <div className='flex flex-col sm:flex-row gap-10 sm:gap-20'>
              {footerlink.map((product, i) => (
                <div key={i} className='group relative'>
                  <p className='text-xl font-semibold mb-6 text-white'>
                    {product.section}
                  </p>
                  <ul>
                    {product.links.map((item, i) => (
                      <li key={i} className='mb-3'>
                        <Link
                          href={item.href}
                          className='text-gray-400 hover:text-primary text-base font-normal transition-colors'>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN-3: Contact Info */}
          <div className='lg:col-span-4 col-span-1'>
            <p className='text-xl font-semibold mb-6 text-white'>Contact</p>
            
            <div className='flex gap-3 mb-4'>
              <Icon icon={'tabler:map-pin'} width={24} height={24} className='text-primary shrink-0' />
              <p className='text-base font-normal text-gray-400'>
                Palakkad, Kerala, India
              </p>
            </div>

            <div className='flex gap-3 mb-4'>
              <Icon icon={'tabler:mail'} width={24} height={24} className='text-primary shrink-0' />
              <Link href='mailto:abdul.haris7085@gmail.com'>
                <p className='text-base font-normal text-gray-400 hover:text-primary transition-colors'>
                  abdul.haris7085@gmail.com
                </p>
              </Link>
            </div>

            <div className='flex gap-3'>
              <Icon icon={'tabler:phone'} width={24} height={24} className='text-primary shrink-0' />
              <Link href='tel:+919207045332'>
                 {/* Picked your first number as the primary one */}
                <p className='text-base font-normal text-gray-400 hover:text-primary transition-colors'>
                  +91 9207045332
                </p>
              </Link>
            </div> 
          </div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className='py-6 border-t border-white/10'>
        <p className='text-center text-sm text-gray-500'>
          © {new Date().getFullYear()} <span className="text-white font-medium">Abdul Haris</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer