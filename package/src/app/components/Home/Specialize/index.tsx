'use client'

import { SpecializeType } from '@/app/types/specialize'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import SpecializeSkeleton from '../../Skeleton/Specialize'

const Specialize = () => {
  const [specialization, setSpecialization] = useState<SpecializeType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setSpecialization(data.SpecializeData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='expertise' className='scroll-mt-12'>
      <div className='container'>
        <div className='text-center mb-12'>
          {/* CHANGED: Removed "Our Expertise" */}
          <h2 className='mb-6'>Technical Expertise</h2>
          
          {/* CHANGED: Removed "Creative Strategies" fluff. Added Engineering focus. */}
          <p className='text-lg font-normal max-w-2xl mx-auto text-gray-600 dark:text-gray-300'>
            I build scalable, high-performance web applications. From designing 
            efficient database schemas in MongoDB to creating responsive Angular interfaces.
          </p>
        </div>

        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <SpecializeSkeleton key={i} />
              ))
            : specialization.map((item, i) => (
                <div key={i} className="h-full">
                  {/* Added h-full to make all boxes the same height */}
                  <div className='bg-secondary dark:bg-darklight rounded-lg p-8 h-full transition-transform hover:-translate-y-1 duration-300'>
                    <div className='p-3 rounded-lg bg-primary w-fit mb-8 shadow-lg shadow-primary/30'>
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <h5 className='font-bold mb-2 text-xl'>{item.title}</h5>
                      <p className='text-base font-normal text-gray-600 dark:text-gray-400'>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default Specialize