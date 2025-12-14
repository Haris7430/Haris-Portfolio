'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import HeroSkeleton from '../../Skeleton/Hero'
import Link from 'next/link'

// 1. Define the Interface based on your API structure
interface HeroDataType {
  title: string;
  subtitle: string;
  imgSrc: string;
}

const Hero = () => {
  // 2. State to hold the full data array
  const [heroData, setHeroData] = useState<HeroDataType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        
        // 3. Ensure we are setting the correct part of the response
        // Assuming your API returns { HeroData: [...] }
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

  // 4. Safety check: If not loading but no data, don't crash
  if (!loading && heroData.length === 0) return null;

  return (
    <section>
      <div className='overflow-hidden'>
        <div className='container relative z-20 pt-24'>
          <div className='relative z-20 grid lg:grid-cols-12 grid-cols-1 items-center lg:justify-items-normal justify-items-center gap-20 pb-10'>
            
            {/* Left Side: Text Content */}
            <div className='lg:col-span-7 col-span-1'>
              <div className='flex flex-col lg:items-start items-center gap-12'>
                {/* 5. Render Dynamic Title from the first item (or map if you want a slider of text too) */}
                {loading ? (
                   <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded"></div>
                ) : (
                  <h1 className='lg:text-start text-center max-w-lg text-4xl font-bold'>
                    {heroData[0]?.title || "Design Portfolio A Journey in Art & Innovation"}
                  </h1>
                )}
                
                {/* Optional: Add subtitle if your data has it */}
                {!loading && heroData[0]?.subtitle && (
                   <p className="text-lg text-gray-600">{heroData[0].subtitle}</p>
                )}

                <div className='flex item-center gap-5'>
                  <Link href={'/#project'}>
                    <button className='px-12 py-3 font-medium text-white border rounded-lg border-primary bg-primary hover:bg-transparent hover:text-primary hover:cursor-pointer duration-300'>
                      Explore
                    </button>
                  </Link>
                  <Link href={'/#categories'}>
                    <button className='px-12 py-3 font-medium text-primary border rounded-lg border-primary bg-transparent hover:bg-primary hover:text-white hover:cursor-pointer duration-300'>
                      Create
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side: Image Slider */}
            <div className='lg:col-span-5 col-span-1 lg:w-full sm:w-[80%] w-full'>
              <div>
                {loading ? (
                   <HeroSkeleton /> 
                ) : (
                  <Slider {...settings}>
                    {heroData.map((item, i) => (
                      <div key={i} className="outline-none focus:outline-none">
                        <div className="relative h-[420px] w-full">
                           <Image
                             src={item.imgSrc}
                             alt={item.title || 'Hero Image'}
                             fill
                             className='rounded-lg object-cover'
                             priority={i === 0} // Load first image faster
                           />
                        </div>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>

          {/* Floating Patterns (Static) */}
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