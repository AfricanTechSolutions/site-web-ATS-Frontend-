import React from 'react'
import{
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt
} from "react-icons/fa" ;

const IconList =[
    {id: 1,
     name: <FaFacebook className='text-3xl hover:scale-125 duration-200'/>,
     link: '/'
    },
    {id: 2,
     name: <FaInstagram className='text-3xl hover:scale-125 duration-200'/>,
     link: '/'
    },
    {id: 3,
     name: <FaLinkedin className='text-3xl hover:scale-125 duration-200'/>,
     link: '/'
    },
]

const Footer = () => {
  return (
    <div className='h-[300px] bg-gray-200 mt-15 p-6'>
    <div >
        <div className='flex gap-8 justify-center m-4 flex-wrap '>
            {
                IconList.map((data) => (
                    <div className=''>
                      <a href={data.link}>  {data.name}</a>
                    </div>
                ))
            }
        </div>
        </div>
        <div className='flex justify-center gap-6 m-4 flex-wrap'>
            <a href="/">Accueil</a>
            <a href="#">A propos</a>
            <a href="/">Mentions legales</a>
        </div>
        <div className='flex justify-center gap-1 m-4'>
           <FaMobileAlt/><p> 6XXXXXXXX</p>
        </div>
        <div className='flex justify-center gap-2'>
            <FaLocationArrow/> <p><u>Douala, Cameroun</u></p>
        </div>
        <div className='flex justify-center gap-2 m-3'><p> &copy; copyright</p></div>
    </div>
  )
}

export default Footer