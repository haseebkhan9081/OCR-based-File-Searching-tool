import React from 'react'
import Image from 'next/image'
 
export default function layout({
    children}:{
        children:React.ReactNode
    }) {
 
return (
    <div
    className='
    mt-10
    flex
    h-full
     flex-col gap-2 
     items-center
      justify-center'>
        <div
        className='
        gap-2
        flex flex-col
        items-center
        justify-center'>
            
            <h1
            className='text-xl font-bold
            md:text-3xl'>Welcome to OCR BASE File Management Tool</h1>
      <p
      className='text-slate-800 p-3 text-center
       '> its necessary that you have an acount so that we can make track of your files!</p>
        </div>
        <div>{children}</div>
        
    </div>
)

    }