'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HeroSkeleton from '../../Skeleton/Hero'
import Link from 'next/link'

interface HeroDataType {
  title: string;
  subtitle: string;
  imgSrc: string;
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroDataType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeroData(data.HeroData) 
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
  }

  // If loading is done but no data, don't crash, just show fallback
  const hasData = !loading && heroData.length > 0;
  const activeData = hasData ? heroData[0] : null;

  return (
    <section>
      <div className='overflow-hidden'>
        <div className='container relative z-20 pt-24'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 items-center lg:justify-items-normal justify-items-center gap-20 pb-10'>
            
            {/* LEFT SIDE: TEXT */}
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-12'>
                
                {loading ? (
                   <div className="space-y-4 w-full">
                      <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded"></div>
                   </div>
                ) : (
                  <>
                    <h1 className='lg:text-start text-center max-w-lg text-4xl font-bold leading-tight'>
                      {/* CHANGED: Stronger Developer Title */}
                      {activeData?.title || "Building Scalable, High-Performance Web Applications"}
                    </h1>
                    
                    <p className="text-lg text-gray-600 dark:text-gray-300 lg:text-start text-center max-w-md">
                       {/* CHANGED: Developer Subtitle */}
                       {activeData?.subtitle || "Specializing in the MEAN Stack: MongoDB, Express, Angular, and Node.js."}
                    </p>
                  </>
                )}

                <div className='flex item-center gap-5'>
                  {/* Primary Button: View Work */}
                  <Link href={'/#project'}>
                    <button className='px-10 py-3 font-medium text-white border rounded-lg border-primary bg-primary hover:bg-transparent hover:text-primary hover:cursor-pointer duration-300'>
                      View My Work
                    </button>
                  </Link>
                  
                  {/* Secondary Button: Contact */}
                  <Link href={'/#contact'}>
                    <button className='px-10 py-3 font-medium text-primary border rounded-lg border-primary bg-transparent hover:bg-primary hover:text-white hover:cursor-pointer duration-300'>
                      Contact Me
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: IMAGE SLIDER */}
            <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full'>
              <div>
                {loading ? (
                   <HeroSkeleton /> 
                ) : (
                  <Slider {...settings}>
                    {/* If we have data, map it. If not, show nothing or a placeholder */}
                    {hasData ? heroData.map((item, i) => (
                      <div key={i} className="outline-none focus:outline-none">
                        <div className="relative h-[420px] w-full">
                           <Image
                             src={item.imgSrc}
                             alt={item.title || 'Hero Image'}
                             fill
                             className='rounded-lg object-cover'
                             priority={i === 0}
                           />
                        </div>
                      </div>
                    )) : (
                      // Fallback image if API fails
                      <div className="relative h-[420px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
                         <span className="text-gray-400">Image not available</span>
                      </div>
                    )}
                  </Slider>
                )}
              </div>
            </div>
          </div>

          {/* Floating Patterns */}
          <div className='absolute top-16 -left-10 dark:opacity-10'>
            <Image
              src={'/images/banner/pattern1.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
          <div className='absolute bottom-0 left-[53%] dark:opacity-10 z-10'>
            <Image
              src={'/images/banner/pattern2.svg'}
              alt='ptrn2'
              width={141}
              height={141}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero