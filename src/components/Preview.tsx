"use client"
import React from 'react'
import { Progress } from "@/components/ui/progress"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import UploadDialog from './UploadDialog'
import { Separator } from './ui/separator'
import PreviewFiles from './PreviewFiles'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Scan from './Scan'
import { useAllFiles } from '@/app/hooks/useAllFiles'
import  TextPreview  from './TextPreview'
import { useScanProgressBar } from '@/app/hooks/useProgress'

function Preview() {
  const {TextMap}=useAllFiles();
   console.log(TextMap.size)

   const {progress}=useScanProgressBar() 
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
 <Scan/>
 </div>
       
       </div>

   <Separator/>    
   {/* from here the file showing sectiona and result sections starts */}
   <Progress  value={progress} />
   

        
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

{TextMap.size==0&&(
  <div
  className='text-slate-700 text-center'>
    Press the Start Scan button to see the Text Extracted from each document in real time
  </div>
)}
{TextMap.size>0&&(<div className='p-6 ring-1
 
 ring-custom-pale-blue 
 overflow-y-auto  space-y-2  items-center justify-center flex-col w-[600px] h-[400px] rounded-md hidden md:flex'>
  
  <Carousel className='w-full max-w-xs'>
   <CarouselContent
   
   className='items-center
   '>
   {TextMap.size>0&&Array.from(TextMap).map(([key, value]) => (
             <CarouselItem key={key}>
             <div className="p-2">
               <Card>
               <CardHeader>
     <CardTitle className='text-lg text-center'>{value.documentName}</CardTitle>
      
   </CardHeader>
                 <CardContent className="flex aspect-square items-center justify-center p-6">
                 <span className="text-xs font-md text-slate-700">{value?.text.substring(0, 550)}</span>
 
                 </CardContent>
                 <CardFooter
                  className='text-center items-center justify-center'>
   <p className='text-center text-muted-foreground'>{value.pageNumber}</p>
   </CardFooter>
               </Card>
             </div>
           </CarouselItem>
           ))}
     
   </CarouselContent>
   <CarouselPrevious />
   <CarouselNext />
 </Carousel>
 
  
   
   </div> )}
       </div>

        </div>   

    </div>
  )
}

export default Preview