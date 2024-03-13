import { auth } from "@clerk/nextjs"; 
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
  

 const handleAuth=()=>{
    const {userId}=auth();
    if(!userId){
        throw new Error("Unauthorized");
       
    }
    return {userId}; 
}
  
export const ourFileRouter = {
    
courseAttachment:f(["text","pdf","image"])
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;