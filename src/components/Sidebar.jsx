import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex-[2] flex flex-col items-center  p-4 gap-8 border-r'>
        <div className='border p-5 w-[90%]'>
            <div>Votre recherche : </div>
            <input className='border p-1 outline-none w-[90%]' type="text" />
        </div>
        <div className='border p-5 w-[90%]'>
            <div>Choix de la langue : </div>
            <input className='p-1 outline-none w-[90%] border' type="text" />
        </div>
        <div className='w-[90%]'>
        <button className='bg-black rounded-xl p-1 w-[100px] text-white'>
            Recherche
        </button>
        </div>
    </div>
  )
}

export default Sidebar