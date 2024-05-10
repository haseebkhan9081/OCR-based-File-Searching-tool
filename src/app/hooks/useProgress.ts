 
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