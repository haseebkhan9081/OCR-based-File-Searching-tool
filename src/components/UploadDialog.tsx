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
  
import { UploadButton} from "@/lib/uploadthing"
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useAllFiles } from "@/app/hooks/useAllFiles";
import { useScanProgressBar } from "@/app/hooks/useProgress";
const UploadDialog=()=>{
const [isOpen,setIsOpen]=useState(false)
const {fetchData}=useAllFiles()
const onSubmit=(name:string,url:string,typ:string,size:number)=>{
axios.post("/api/uploadthing/upload",{
    name,
    url,
    typ,
    size
}).then((res)=>{
toast.success("file uploaded successfully",{
    description:res.data.name
})
}).catch((err)=>{
    console.log("[src/components/UploadDialog.tsx]",err)
toast.error("something went wrong!")
}).finally(()=>{
    setIsOpen(false)
    fetchData()
})
}

const {isLoading}=useAllFiles();
const {progress}=useScanProgressBar()
 return <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger><Button
  disabled={isLoading||((progress==100)?false:true)}
  onClick={()=>setIsOpen(true)}
 className='bg-green-600'
 >Upload Files</Button>
 </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ready to Dive In?</DialogTitle>
      <DialogDescription>
      Choose your files to kickstart the magic! You can upload images
            (PNG, JPG, JPEG) or PDF.
      </DialogDescription>
    </DialogHeader>
    <UploadButton
    endpoint="courseAttachment"
    onClientUploadComplete={(res)=>{
        onSubmit(res?.[0].name,res?.[0].url,res?.[0].type,res?.[0].size)
 
    }}
    />
  </DialogContent>
</Dialog>

  
}  

export default UploadDialog;