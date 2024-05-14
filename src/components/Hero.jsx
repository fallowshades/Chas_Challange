import Image from 'next/image'
const Hero = ({ textContent }) => {
  const { paragraph, header } = textContent || {}
  const unSplashImage =
    'https://plus.unsplash.com/premium_photo-1677675594688-f7bc0a870930?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <div>
      <Image
        src={unSplashImage}
        width={300}
        height={300}
        className='w-48 h-48 rounded shadow-lg mb-4'
        priority
        alt=''
      />
      <p>{paragraph}</p>
    </div>
  )
}
export default Hero
