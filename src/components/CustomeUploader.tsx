"use client"
import { useUploadThing } from "@/lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
import axios from "axios";
import { useAllFiles } from "@/app/hooks/useAllFiles";
import { Button } from "./ui/button";
interface MultiUploaderprops{
    setIsOpen:(v:boolean)=>void
}
export const MultiUploader:React.FC<MultiUploaderprops> = ({
    setIsOpen
}) => {
    const {fetchData}=useAllFiles()
    const [progress,setProgress]=useState(0)
    const [fileName,setFileName]=useState("")
    const { startUpload, isUploading,permittedFileInfo } = useUploadThing("courseAttachment", {
        onUploadProgress(p) {
            setProgress(p)
            
     },
        onClientUploadComplete(res) {
            axios.post("/api/uploadthing/upload",{
                name:res[0].name,
                url:res[0].url,
                typ:res[0].type,
                size:res[0].size
            }).then((res)=>{
            toast.success("file uploaded successfully",{
                description:res.data.name
            })
            }).catch((err)=>{
                console.log("[src/components/CustomeUploader]",err)
            toast.error("something went wrong!")
            }).finally(()=>{
                
                fetchData()
            })
        },
        onUploadError(err){
            toast.error("error uploading file,please only upload supported files",{
                description:err.message
            })
        },
        onUploadBegin(fileName) {
            setFileName(fileName)
        },
    });

    const handleUpload = async (event:ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files; // Assuming multiple file selection
 
        // Iterate over each file and start the upload process
        if (files) {
            // Iterate over each file and start the upload process
            for (const file of Array.from(files)) {
                await startUpload([file]); // Start the upload for each file
            }
            setIsOpen(false)
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
           <label className="text-center w-full flex
           flex-col
           " htmlFor="fileInput">
                {isUploading?"Uploading":<Button>Choose Files</Button>}
                <Input id="fileInput" type="file" multiple onChange={handleUpload} style={{ display: 'none' }} />
            </label> <div className="flex
             flex-col
             justify-center
             p-2
             items-center
             w-full
             ">
             <Progress  className="absolute w-3/4 " value={progress} />
             <p className="z-10">{fileName}</p></div>
            
        </form>
    );
};
