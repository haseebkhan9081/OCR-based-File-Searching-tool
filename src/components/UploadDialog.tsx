"use client"
 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button";
  
 
import { useState } from "react";
import { useAllFiles } from "@/app/hooks/useAllFiles";
import { useScanProgressBar } from "@/app/hooks/useProgress";
import { MultiUploader } from "./CustomeUploader";
const UploadDialog=()=>{
const [isOpen,setIsOpen]=useState(false)
 
 

const {isLoading}=useAllFiles();
const {progress}=useScanProgressBar()
 return <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger  disabled={isLoading||((progress==100)?false:true)}>
    <Button
  disabled={isLoading||((progress==100)?false:true)}
  onClick={()=>{
     
      setIsOpen(true)
     
  }}
 className='bg-green-600'
 >Upload Files</Button>
 </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ready to Dive In?</DialogTitle>
      <DialogDescription className="flex
      items-center
      text-center
      w-full
      justify-center">
      Choose your files to kickstart the magic!
      <br/> You can upload images, PDFs and DocX.
      </DialogDescription>
    </DialogHeader>
     <MultiUploader setIsOpen={setIsOpen}/>
  </DialogContent>
</Dialog>

  
}  

export default UploadDialog;