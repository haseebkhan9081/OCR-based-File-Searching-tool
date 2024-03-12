import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

function Preview() {
  return (
    <div
    className='
    w-full
    h-full
    
    mt-2
    sm:p-3
    md:p-10
     '
    >
     <div
     className='ring-1
     w-full
     h-full
ring-custom-pale-blue
p-3
     rounded-md
     
     
     
     '>

       <div
       className='
       w-full
       flex
       flex-row
       justify-between
       items-center

       '> 
       <div
       className='
       sm:w-[300px]
       md:w-[500px]
       flex
       flex-row
       items-center
       justify-between
       '>
       <Textarea
       
       placeholder='Search for Text Within Your Files'
       className='
       focus-within:ring-0
       focus-visible:ring-0'
       />
       
       </div>
       <div
       className='md:flex hidden
       items-center
flex-row gap-x-4
       '>
 <Button
 className='bg-green-600'
 >Upload Files</Button>
 <Button
 >Start Scanning</Button>
 </div>
       
       </div>
        </div>   

    </div>
  )
}

export default Preview