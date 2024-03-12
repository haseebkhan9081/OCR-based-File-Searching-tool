import React from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import UploadDialog from './UploadDialog'
import { Separator } from './ui/separator'
import PreviewFiles from './PreviewFiles'

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
       mb-4
       w-full
       flex
       flex-row
       justify-between
       items-center

       '> 
       <div
       className='
       w-full
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
 <UploadDialog/>
 <Button
 >Start Scanning</Button>
 </div>
       
       </div>

   <Separator/>    
   {/* from here the file showing sectiona and result sections starts */}
        
        
        <div
        className='flex
        mt-2
        flex-row
        w-full
        justify-between

        items-center'>
{/* this is for showing all files */}
<div
className='p-6 ring-1 ring-custom-pale-blue
overflow-y-auto
rounded-md'>
    <h3 className='text-2xl font-semibold mb-1'>Files that will be searched...</h3>
    <PreviewFiles/>
</div> 
{/* this is for the results */}
<div
className='p-6 ring-1 ring-custom-pale-blue rounded-md hidden md:flex' >Results</div>
        </div>

        </div>   

    </div>
  )
}

export default Preview