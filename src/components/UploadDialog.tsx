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


 return <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger><Button
  onClick={()=>setIsOpen(true)}
 className='bg-green-600'
 >Upload Files</Button>
 </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Ready to Dive In?</DialogTitle>
      <DialogDescription>
      Choose your files to kickstart the magic! You can upload images
            (PNG, JPG, JPEG, GIF, BMP) or text files (TXT, PDF).
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