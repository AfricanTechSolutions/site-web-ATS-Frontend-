import React from 'react'
import{
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaMobileAlt
} from "react-icons/fa" ;
import { FaLocationDot } from "react-icons/fa6";

const IconList =[
    {id: 1,
     name: <FaFacebook className='text-3xl hover:scale-125 duration-200'/>,
     text: "Facebook",
     link: '/'
    },
    {id: 2,
     name: <FaInstagram className='text-3xl hover:scale-125 duration-200'/>,
     text: "Instagram",
     link: '/'
    },
    {id: 3,
     name: <FaLinkedin className='text-3xl hover:scale-125 duration-200'/>,
     text: "LinkedIn",
     link: '/'
    },
    {id: 4,
     name: <FaTwitter className='text-3xl hover:scale-125 duration-200'/>,
     text: "Twitter / X",
     link: '/'
    },
]

const Footer = () => {
  return (
    <div className='h-max bg-gray-200 mt-15 py-6 sm:px-10 mb-0 w-full'>
    <div className=' flex gap-50  justify-center'>
        <div>
        <p className='font-semibold'>Liens important</p>
        <div className='flex flex-col justify-center gap-6 m-4 flex-wrap'>
            <a href="/">Accueil</a>
            <a href="#">A propos</a>
            <a href="/">Mentions legales</a>
        </div>
        </div>
      <div >
      <p className='font-semibold'>Reseaux sociaux</p>
        <div className='flex flex-col gap-4 justify-center m-4 flex-wrap '>
            {
                IconList.map((data) => (
                    <div className=''>
                      <a href={data.link}>  {data.name}</a>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
    <div>
      <div>
          <div className='flex justify-center gap-1 m-4'>
           <FaMobileAlt/><p> 6XXXXXXXX</p>
        </div>
        <div className='flex justify-center gap-2'>
            <FaLocationDot className="text-red-600"/> <p><u>Douala, Cameroun</u></p>
        </div>
      </div>
    <div className='flex justify-center gap-2 mt-4'><p> &copy; copyright</p></div>
    </div>
    </div>
  )
}

export default Footer