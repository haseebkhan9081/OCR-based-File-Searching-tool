"use client"
import React, { useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { toast } from 'sonner';
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
import { useTargetText } from '@/app/hooks/useTargetText'
import { FoundDialogue } from './FoundDialogue';
import { Scan as S} from 'lucide-react';


function Preview() {
  const {TextMap}=useAllFiles();
  
    const {targetText,setTargetText}=useTargetText();
const {isLoading}=useAllFiles()
   const {progress}=useScanProgressBar() 
  
   let timeoutId: NodeJS.Timeout | undefined; // Define the type of timeoutId

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout
    }
    timeoutId = setTimeout(() => {
      setTargetText(event.target.value); // Set the target text after 2 seconds
    }, 1000); // 2000 milliseconds = 2 seconds
  };
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
       disabled={isLoading||((progress==100)?false:true)}
       onChange={handleChange}
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
{TextMap.size > 0 && (
  <div className='p-6 ring-1 ring-custom-pale-blue overflow-y-auto space-y-2 items-center justify-center flex-col w-[600px] h-[400px] rounded-md hidden md:flex'>
    {Array.from(TextMap).some(([key, value]) => {
      const cleanedText = value.text.replace(/\n/g, ' '); // Replace '\n' with space
      let tct = targetText.replace(/\n/g, ' ');
      const words = tct.toLowerCase().split(' ');
      const isMatch = words.some(word => cleanedText.toLowerCase().includes(word.toLowerCase()));
      return isMatch;
    }) ? (
      <Carousel className='w-full max-w-xs'>
        <CarouselContent className='items-center'>
          {/* Mapping through TextMap to display matching items */}
          {Array.from(TextMap).map(([key, value]) => {
            const cleanedText = value.text.replace(/\n/g, ' '); // Replace '\n' with space
            let tct = targetText.replace(/\n/g, ' ');
            const words = tct.toLowerCase().split(' ');
            const textParts = cleanedText.split(new RegExp(`(${words.join('|')})`, 'gi')); // Split text into parts based on each word in targetText
            let charCount = 0;
            const isMatch = words.some(word => textParts.some(part => part.toLowerCase() === word.toLowerCase()));
            if (isMatch) {
              return (
                <CarouselItem key={key}>
                 
                  <div className="p-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className='text-lg text-center'>{value.documentName}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <p key={key}>
                        
                          {/* Mapping through textParts to highlight matching parts */}
                          {textParts.map((part, index) => {
                            if (charCount >= 300) {
                              return null; // Return null to stop further iteration
                            }
                            const isHighlighted = words.some(word => word.length > 0 && part.toLowerCase() === word.toLowerCase());
                            if (isHighlighted) {
                              // If the part matches any word from targetText, highlight it
                              const partLength = part.length;
                              if (charCount + partLength <= 300) {
                                charCount += partLength;
                                return <span className='bg-yellow-400' key={index}>{part}</span>; // Matching part
                              } else {
                                const remainingChars = 300 - charCount;
                                charCount += remainingChars;
                                return part.slice(0, remainingChars); // Matching part with remaining characters
                              }
                            } else {
                              // If the part doesn't match, display it as is
                              const partLength = part.length;
                              if (charCount + partLength <= 300) {
                                charCount += partLength;
                                return part; // Non-matching part
                              } else {
                                const remainingChars = 300 - charCount;
                                charCount += remainingChars;
                                return part.slice(0, remainingChars); // Non-matching part with remaining characters
                              }
                            }
                          })}
                          {value.text.length > 550 && <span>...</span>}
                        </p>
                        {/* Display ellipsis if text length exceeds 550 characters */}
                      </CardContent>
                      <CardFooter className='text-center items-center justify-center'>
                        <div
                        className='flex
                        flex-row
                        justify-between
                        w-full
                        items-center'>
                        <p className='text-center text-xs text-muted-foreground'>{value.pageNumber}</p>
                        <FoundDialogue
                        targetText={targetText}
                        value={value}
                        key={key}
                        ><S size={24} color='red'/></FoundDialogue>
                     
                        </div>
                         </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              );
            }
            return null;
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ) : (
      <div className='text-slate-700 text-center'>Not Found</div>
    )}
  </div>
)}
       </div>

        </div>   

    </div>
  )
}

export default Preview