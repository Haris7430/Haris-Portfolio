import Link from 'next/link'
import Image from 'next/image'

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/logo/logo.webp'
        alt='logo'
        width={150}
        height={33}
        className='block dark:hidden object-contain'        
      />
      <Image
        src='/images/logo/white-logo.webp'
        alt='logo'
        width={150}
        height={33}
        className='hidden dark:block object-contain'        
      />
    </Link>
  )
}

export default Logo
