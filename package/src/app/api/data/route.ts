import { NextResponse } from 'next/server'

import { NavLinkType } from '@/app/types/navlink'
import { ProjectType } from '@/app/types/project'
import { RecordType } from '@/app/types/record'
// import { ReviewType } from '@/app/types/review'
import { SpecializeType } from '@/app/types/specialize'

import { CategoryType } from '@/app/types/category'
import { FooterLinkType } from '@/app/types/footerlinks'
import { HeroType } from '@/app/types/hero'

const HeroData: HeroType[] = [
  {
    imgSrc: '/images/banner/Haris-Pic-1.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-2.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-3.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-4.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-5.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-6.webp',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-7.jpg',
  },
  {
    imgSrc: '/images/banner/Haris-Pic-8.jpg',
  },
]

const NavLinkData: NavLinkType[] = [
  {
    label: 'Projects',
    href: '/#project',
  },
  {
    label: 'Expertise',
    href: '/#expertise',
  },
  {
    label: 'Categories',
    href: '/#categories',
  },
]

const ProjectData: ProjectType[] = [
  {
    coverImg: '/images/project/healaria-1.webp',
    name: 'Helaria Fashions',
    

  },
  {
    coverImg: '/images/project/healaria-1-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healaria-3-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-4.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-5-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-6-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-7-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-8-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-7-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-9-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-10-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-11-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-12-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-13-01.webp',
    name: 'Helaria Fashions',
  },
  {
    coverImg: '/images/project/healria-14-01.webp',
    name: 'Helaria Fashions',
  },
]


//// after 
// const RecordData: RecordType[] = [
//   {
//     imgSrc: '/images/records/star.svg',
//     digit: '4.9 Rating',
//     desc: 'Rated by 3+ clients on Google and Clutch platforms',
//   },
//   {
//     imgSrc: '/images/records/user.svg',
//     digit: '3+ Clients',
//     desc: 'Trusted by global brands for design and digital solutions',
//   },
//   {
//     imgSrc: '/images/records/cart.svg',
//     digit: '45k+ Revenue',
//     desc: 'Generated through websites, apps, and marketing globally',
//   },
//   {
//     imgSrc: '/images/records/star.svg',
//     digit: '5+ Projects',
//     desc: 'Delivered websites, branding, and full digital experiences worldwide',
//   },
// ];



const RecordData: RecordType[] = [
  {
    imgSrc: '/images/records/star.svg', // Keep icon or change to code icon
    digit: 'Clean Code',
    desc: 'Scalable architecture using Domain-Driven Design principles.',
  },
  {
    imgSrc: '/images/records/user.svg', // Change to clock icon if possible
    digit: 'Fast Delivery',
    desc: 'Optimized performance and rapid turnaround times.',
  },
  {
    imgSrc: '/images/records/cart.svg', // Change to shield icon
    digit: 'Secure',
    desc: 'Implementation of JWT and robust data protection standards.',
  },
  {
    imgSrc: '/images/records/star.svg', // Change to chat icon
    digit: 'Responsive',
    desc: 'Clear communication and daily updates on project status.',
  },
];


// const ReviewData: ReviewType[] = [
//   {
//     imgSrc: '/images/review/daniel.webp',
//     name: 'Daniel Reid',
//     rating: 4.2,
//     desc: 'Pixelize nailed our website redesign. Clean layout, fast loading, and mobile-friendly. Highly recommended!',
//   },
//   {
//     imgSrc: '/images/review/sophia.webp',
//     name: 'Sophia Turner',
//     rating: 4.5,
//     desc: 'The UI/UX improvements boosted our user engagement and conversions. Truly a professional team!',
//   },
//   {
//     imgSrc: '/images/review/marcus.webp',
//     name: 'Marcus Lee',
//     rating: 4.8,
//     desc: 'They understood our brand vision perfectly and delivered a logo that stands out in our industry.',
//   },
// ]

const SpecializeData: SpecializeType[] = [
  {
    imgSrc: '/images/specialization/webdesign.svg', // Keep or find an Angular icon
    title: 'Frontend Engineering',
    desc: 'Building responsive, complex SPAs using Angular, RxJS, and Tailwind CSS.',
  },
  {
    imgSrc: '/images/specialization/mobileapp.svg', // Find a Server/Node icon
    title: 'Backend Architecture',
    desc: 'Scalable RESTful APIs and microservices built with Node.js and Express.',
  },
  {
    imgSrc: '/images/specialization/digitalmarketing.svg', // Find a Database icon
    title: 'Database Design',
    desc: 'Optimized MongoDB schemas, aggregation pipelines, and data modeling.',
  },
  {
    imgSrc: '/images/specialization/seooptimize.svg', // Find a Structure/Brick icon
    title: 'Clean Architecture',
    desc: 'Writing maintainable, testable code using Dependency Injection and Repository patterns.',
  },
  {
    imgSrc: '/images/specialization/contentwrite.svg', // Find a Speed/Lightning icon
    title: 'Performance Tuning',
    desc: 'Optimizing load times, lazy loading modules, and efficient backend  queries.',
  },
  {
    imgSrc: '/images/specialization/logodesign.svg', // Find a Shield/Lock icon
    title: 'Authentication & Security',
    desc: ' Secure user management using JWT , OAuth , and role-based access  control. ',
  },
]



const CategoryData: CategoryType[] = [
  {
    imgSrc: '/images/category/webdev.webp', 
    title: 'Enterprise Web Apps', 
  },
  {
    imgSrc: '/images/category/ecommerce.webp', 
    title: 'E-commerce Platforms',
  },
  {
    imgSrc: '/images/category/api.webp', 
    title: 'REST API Ecosystems',
  },
  {
    imgSrc: '/images/category/realtime.webp', 
    title: 'Real-Time Dashboards', 
  },
  {
    imgSrc: '/images/category/mvp.webp', 
    title: 'SaaS MVP Development',
  },
]

const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Company',
    links: [
      {
        label: 'Projects',
        href: '/#project',
      },
      {
        label: 'Expertise',
        href: '/#expertise',
      },
      
      {
        label: 'Categories',
        href: '/#categories',
      },
    ],
  },
  {
    section: 'Services',
    links: [
      { label: 'Web Development', href: '/#expertise' },
      { label: 'API Development', href: '/#expertise' },
      { label: 'SaaS Architecture', href: '/#expertise' },
    ],
  },
]

export const GET = () => {
  return NextResponse.json({
    HeroData,
    NavLinkData,
    ProjectData,
    RecordData,
    // ReviewData,
    SpecializeData,
    
    CategoryData,
    FooterLinkData,
  })
}
