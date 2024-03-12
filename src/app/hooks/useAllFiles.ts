import { File } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import {create} from 'zustand'; 

type useAllFilesState = {
  files:File[],
  fetchData:()=>void,
  isLoading:boolean,
  setIsLoading:(v:boolean)=>void,
};

export const useAllFiles = create<useAllFilesState>((set) => ({
 files:[],
 isLoading:false,
 setIsLoading(v) {
     set({isLoading:v})
 },
 fetchData:()=>{
    set({isLoading:true})
    axios.get("/api/file/fetch").then((res)=>{
        set({files:res?.data})
    }).catch((err)=>{
        toast.error("something went wrong!")
        console.log("[src/components/PreviewFiles.tsx]",err)
    }).finally(()=>{
        set({isLoading:false})
    })    
    }
}));