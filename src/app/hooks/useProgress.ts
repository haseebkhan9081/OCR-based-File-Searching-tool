import { File } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import {create} from 'zustand'; 

type useScanProgress = {
  progress:number,
  setProgress:(v:number)=>void
};

export const useScanProgressBar = create<useScanProgress>((set) => ({
 progress:100,
 setProgress(v) {
     set({progress:v})
 }, 
}));