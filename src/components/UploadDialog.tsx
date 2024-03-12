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
const UploadDialog=()=>{


const onSubmit=(name:string,url:string,type:string,size:string)=>{
axios.post("",{

}).then((res)=>{

}).catch((err)=>{
    
})
}


 return <Dialog>
  <DialogTrigger><Button
 className='bg-green-600'
 >Upload Files</Button></DialogTrigger>
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
toast.success("file upload successfully",{
    description:res?.[0].name
})
    }}
    />
  </DialogContent>
</Dialog>

  
}  

export default UploadDialog;