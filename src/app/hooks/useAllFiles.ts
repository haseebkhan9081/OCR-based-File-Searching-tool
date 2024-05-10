import { File } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import {create} from 'zustand'; 
interface OcrResult {
    documentName: string;
    pageNumber: number;
    text: string;
    url:string;
  }
type useAllFilesState = {
  files:File[],
  fetchData:()=>void,
  isLoading:boolean,
  setIsLoading:(v:boolean)=>void,
  TextMap:Map<string,OcrResult>
  setTextMap:(url:string,value:OcrResult)=>void
  clear: () => void; // Define a clear function
};

export const useAllFiles = create<useAllFilesState>((set) => ({
 files:[],
 isLoading:false,
 setIsLoading(v) {
     set({isLoading:v})
 },
 setTextMap: (url: string, value: OcrResult) => {
    set((state) => ({
        TextMap: new Map(state.TextMap).set(url, value)
    }));
},
clear: () => {
    set({ TextMap: new Map<string, OcrResult>(), isLoading: false });
  },
 TextMap:new Map<string,OcrResult>(),
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