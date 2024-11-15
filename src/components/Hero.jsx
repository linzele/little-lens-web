import styles from '../style'
import { discount } from '../assets'
import GetStarted from './GetStarted'

const Hero = () => {
  const videoSource = 'https://www.youtube.com/embed/bcxYEeJP-7U';

  return (
    <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
            The Next <br className='sm:block hidden'/> {" "}
            <span className='text-gradient'>Learning Enhancement</span> {" "}
          </h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
          </div>
        </div>
        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full'>
         App.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Unlimited Scans, Unlimited Opportunites.
        <br />
        Anywhere, Anytime. 
        <br />
        Recommended for Age 6 and above.
        </p>
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <iframe
          src={videoSource}
          title="YouTube video player"
          className='w-[100%] h-[100%] relative z-[5]'
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient"/>
      </div>
      <div className={`ss:hidden ${styles.flexCenter}`}>
      </div>
    </section>
  )
}

export default Hero