'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { ProjectType } from '@/app/types/project'
import ProjectSkeleton from '../../Skeleton/Project'

const Project = () => {
  const [project, setProject] = useState<ProjectType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProject(data.ProjectData)
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
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div id='project' className='scroll-mt-12'>
      <section className='bg-secondary dark:bg-darklight overflow-hidden'>
        <div className='container relative'>
          
          {/* --- CONTENT (Heading & Text) --- */}
          {/* Added 'relative z-10' to ensure text sits ON TOP of the patterns */}
          <div className='relative z-10'>
            <div className='mb-4'>
              <h2 className='text-center'>Popular Projects</h2>
            </div>
            <div className='md:max-w-45 mx-auto mb-8'>
              <p className='text-xl font-normal text-center leading-8'>
                Scalable web applications demonstrating Clean Architecture,
                robust backend logic, and responsive UI.
              </p>
            </div>
          </div>

          {/* slider */}
          <div className='relative z-20'>
            <Slider {...settings}>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ProjectSkeleton key={i} />
                  ))
                : project.map((item, i) => (
                    <div key={i}>
                      <div className='p-5 bg-white dark:bg-lightdarkblue m-3 rounded-lg'>
                        <div className='w-full mb-4'>
                          <Image
                            src={item.coverImg}
                            alt={item.coverImg}
                            width={234}
                            height={236}
                            className='w-full rounded-lg object-cover h-[236px]' // Added object-cover to fix stretching
                          />
                        </div>
                        <div className='flex items-center gap-2'>
                           {/* NOTE: You should probably make this logo dynamic from API too later */}
                          <Image
                            src={'/images/project/Healaria Fashions Logo illustate-01.png'}
                            alt={'logo'}
                            width={40} // Reduced size (71 was too big for a small card)
                            height={40}
                            className='rounded-full'
                          />
                          <p className='text-base font-medium text-darkblue dark:text-white truncate'>
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </Slider>
          </div>

          {/* --- FLOATING PATTERNS --- */}
          {/* Removed 'z-10' from the bottom pattern so it doesn't cover text */}
          <div className='absolute top-28 -left-9 dark:opacity-5 z-0'>
            <Image
              src={'/images/banner/pattern1.svg'}
              alt='ptrn1'
              width={141}
              height={141}
            />
          </div>
          <div className='absolute -bottom-7 -right-7 dark:opacity-5 z-0'>
            <Image
              src={'/images/banner/pattern2.svg'}
              alt='ptrn2'
              width={141}
              height={141}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Project