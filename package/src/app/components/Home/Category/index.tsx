'use client'

import { CategoryType } from '@/app/types/category'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategorySkeleton from '../../Skeleton/Category'

const Category = () => {
  const [category, setCategory] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCategory(data.CategoryData)
      } catch (error) {
        console.error('Error fetching service', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <section id='categories' className='scroll-mt-12'>
      <div className='container'>
        <div className='text-center'>
          {/* CHANGED: Stronger Developer Heading */}
          <h2>Solutions I Deliver</h2>
          
          {/* CHANGED: Text focusing on products, not "services" */}
          <p className='text-lg font-normal max-w-md mx-auto my-6 text-gray-600 dark:text-gray-300'>
            From high-performance SaaS platforms to scalable backend APIs.
          </p>
        </div>
        
        {/* grid layout */}
        <div>
          <div className='grid lg:grid-cols-4 grid-cols-2 gap-6'>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CategorySkeleton key={i} />
                ))
              : category.map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      i === 0
                        ? 'col-span-2 row-span-2'
                        : 'sm:col-span-1 col-span-2 row-span-1'
                    }`}>
                    <div className='relative group overflow-hidden w-full h-full rounded-lg shadow-md'>
                      
                      <Image
                        src={item.imgSrc}
                        alt={item.title}
                        width={570}
                        height={394}
                        // CHANGED: Added 'object-cover' and 'h-full' to prevent stretching
                        className='w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500'
                      />
                      
                      {/* CHANGED: Link now goes to #project section, not a new tab */}
                      <Link href='/#project'> 
                        <div className='absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 lg:translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out rounded-lg flex items-end'>
                          <div className={`${i === 0 ? 'p-8' : 'p-5'} w-full`}>
                            <div className='flex items-center gap-3'>
                              <div className="bg-primary/90 p-1.5 rounded-full">
                                <Image
                                  src={'/images/banner/greentick.svg'}
                                  alt='tick'
                                  width={12}
                                  height={12}
                                />
                              </div>
                              <p className={`font-bold text-white ${i === 0 ? 'text-2xl' : 'text-lg'}`}>
                                {item.title}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Category