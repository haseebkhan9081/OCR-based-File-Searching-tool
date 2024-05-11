import { auth } from "@clerk/nextjs"; 
import { createUploadthing, type FileRouter} from "uploadthing/next";
 
const f = createUploadthing();
  

 const handleAuth=()=>{
    const {userId}=auth();
    if(!userId){
        throw new Error("Unauthorized");
       
    }
    return {userId}; 
}
  
export const ourFileRouter = {
    
courseAttachment:f(["pdf","image","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.wordprocessingml.document"])
.middleware(()=>handleAuth())
.onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;