'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { NavLinkType } from '@/app/types/navlink'
import { Icon } from '@iconify/react'
import { useTheme } from 'next-themes'

const Header: React.FC = () => {
  const [navlink, setNavlink] = useState<NavLinkType[]>([])
  const { theme, setTheme } = useTheme()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setNavlink(data.NavLinkData)
      } catch (error) {
        console.error('Error fetching service', error)
      }
    }
    fetchData()
  }, [])

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 py-1 z-50 w-full bg-transparent transition-all ${
        sticky ? 'shadow-lg dark:shadow-neutral-50/5 bg-white dark:bg-darklight' : 'shadow-none'
      }`}>
      <div
        className={`container flex items-center justify-between gap-10 duration-300 ${
          sticky ? 'py-3' : 'py-4'
        }`}>
        <Logo />
        <nav>
          <ul className='hidden xl:flex flex-grow items-center justify-start gap-10 '>
            {navlink.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </ul>
        </nav>
        <div className='flex items-center gap-4'>
          
          {/* THEME TOGGLE */}
          <button
            aria-label='Toggle theme'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='flex items-center justify-center text-body-color duration-300 hover:cursor-pointer hover:text-primary dark:text-white bg-neutral-50 rounded-full dark:bg-darklight p-2 outline-none'>
            <Icon
              icon='solar:sun-2-bold'
              width='24'
              height='24'
              className='hidden dark:block'
            />
            <Icon
              icon='solar:moon-bold'
              width='24'
              height='24'
              className='dark:hidden block'
            />
          </button>
          
          {/* --- NEW: DOWNLOAD CV BUTTON (Desktop) --- */}
          <a
            href='/images/banner/Haris_Resume.pdf'
            target='_blank'
            rel="noopener noreferrer"
            className='hidden xl:flex items-center gap-2 px-5 py-2 bg-transparent text-primary rounded-lg border border-primary hover:bg-primary hover:text-white duration-500 text-base font-semibold transition-colors'>
            <Icon icon="solar:file-download-linear" width="20" height="20" />
            <span>CV</span>
          </a>

          {/* CONTACT BUTTON (Desktop) */}
          <Link
            href='/#contact'
            className='hidden xl:block px-6 py-2 bg-primary text-white rounded-lg outline-none hover:bg-transparent hover:text-primary border border-primary duration-500 text-base font-semibold'>
            Let's Talk
          </Link>
          
          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className='block xl:hidden p-2 rounded-lg hover:cursor-pointer'
            aria-label='Toggle mobile menu'>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white'></span>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white mt-1.5'></span>
            <span className='block w-6 h-0.5 bg-darkblue dark:bg-white mt-1.5'></span>
          </button>
        </div>
      </div>
      
      {/* MOBILE OVERLAY */}
      {navbarOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
      )}
      
      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className={`xl:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darklight shadow-lg transform transition-transform duration-300 max-w-xs ${
          navbarOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}>
        <div className='flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800'>
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            aria-label='Close mobile menu'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              className='dark:text-white dark:hover:text-primary hover:text-primary hover:cursor-pointer'>
              <path
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        
        <nav className='flex flex-col items-start p-6 gap-4'>
          {navlink.map((item, index) => (
            <div key={index} onClick={() => setNavbarOpen(false)} className="w-full">
                <MobileHeaderLink item={item} />
            </div>
          ))}
          
          <div className='mt-6 flex flex-col gap-4 w-full'>
            {/* --- NEW: DOWNLOAD CV BUTTON (Mobile) --- */}
            <a
              href='/images/banner/Haris_Resume.pdf'
              target='_blank'
              rel="noopener noreferrer"
              onClick={() => setNavbarOpen(false)}
              className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-primary rounded-lg border border-primary hover:bg-primary hover:text-white duration-500 text-base font-semibold'>
              <Icon icon="solar:file-download-linear" width="20" height="20" />
              Download CV
            </a>

            {/* CONTACT BUTTON (Mobile) */}
            <Link
              href='/#contact'
              className='w-full text-center px-6 py-3 bg-primary text-white rounded-lg outline-none hover:bg-transparent hover:text-primary border border-primary duration-500 text-base font-semibold'
              onClick={() => {
                setNavbarOpen(false)
              }}>
              Let's Talk
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header