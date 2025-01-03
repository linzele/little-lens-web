import React from 'react'
import { apple, story, google } from '../assets'
import styles, { layout } from '../style'

const Download = () => {
  return (
    <section id='product' className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          src={story}
          alt='Download'
          className='w-[100%] h-[100%] relative z-[5]'
        />
        <div className='absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient'/>
        <div className='absolute z-[0] -left-1/2 bottom-0 w-[50%] h-[50%] rounded-full pink__gradient'/>
      </div>
      <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>Transform Your Moments into Memories<br className='sm:block hidden'/> In One Click!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Unlock the stories behind your photos with our innovative app! 
      Instantly generate captivating narratives and insights from your images. 
      Join countless users who have turned their captured moments into unforgettable experiences. 
      Download now and start creating your story today!
        </p>
        <div className='flex flex-row flex-wrap sm:mt-10 mt-6'>
        <a
  href="https://expo.dev/accounts/tharvs/projects/LittleLens/builds/b54fcbe5-aa98-4cc7-b05a-d6212221d627"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[240px] h-[50px] bg-[#007bff] hover:bg-[#00e1ff] text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
>
  Download APK for Android
</a>

</div>
      </div>  
    </section>
  )
}

export default Download
