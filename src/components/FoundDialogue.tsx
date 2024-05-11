import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';

interface OcrResult {
    documentName: string;
    pageNumber: number;
    text: string;
    url:string
  }
interface FoundDialogueProps {
    children: React.ReactNode;
    value:OcrResult;
    targetText:string
  }
  
  export const FoundDialogue = ({ children,targetText,value }: FoundDialogueProps) => {
    // Your component implementation remains the same
    let [isOpen, setIsOpen] = useState(false)
    let tct = targetText.replace(/\n/g, ' ');
    console.log("target words",tct)
    const words = tct.toLowerCase().split(' ');
    const textParts = value.text.split(new RegExp(`(${words.join('|')})`, 'gi')); // Split text into parts based on each word in targetText
    console.log(textParts)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>{children}</button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 flex w-screen items-center justify-center p-6">
            <DialogPanel className="max-w-screen-sm max-h-full space-y-4 overflow-auto    ">
            <Card className='w-full h-full'>
                      <CardHeader>
                        <CardTitle className='text-lg m-0 text-center'><Link
                        target="_blank" rel="noopener noreferrer"
                        href={value?.url}>{value?.documentName}</Link></CardTitle>
                     
                      </CardHeader>
                      <CardContent className="flex pt-0 mt-0 aspect-square max-h-fit items-center justify-center      ">
                        <p className='pt-0 mt-0' >
                        
                          {/* Mapping through textParts to highlight matching parts */}
                          {textParts.map((part, index) => {
                             
                            const isHighlighted = words.some(word => word.length > 0 && part.toLowerCase() === word.toLowerCase());
                            if (isHighlighted) {
                              // If the part matches any word from targetText, highlight it
                            
                                return <span className='bg-yellow-400' key={index}>{part}</span>; // Matching part
                              
                            } else {
                             
                              return part.split('\n').map((text, i) => (
                                <React.Fragment key={i}>
                                  {i > 0 && <br />} {/* Render <br> tag for each newline character */}
                                  {text}
                                </React.Fragment>
                              )); // Non-matching part
                              
                            }
                          })}
                       
                        </p>
                        {/* Display ellipsis if text length exceeds 550 characters */}
                      </CardContent>
                      <CardFooter className='text-center items-center justify-center'>
                        <div
                        className='flex
                        flex-row
                        justify-center
                        w-full
                        items-center'>
                        <p className='text-center text-xs text-muted-foreground'>{value.pageNumber}</p>
                        
                        </div>
                         </CardFooter>
                    </Card>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
  }


 