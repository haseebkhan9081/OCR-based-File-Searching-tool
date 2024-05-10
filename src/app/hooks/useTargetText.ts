import {create} from 'zustand'; 

type useTargetText = {
  targetText:string,
  setTargetText:(v:string)=>void
};

export const useTargetText = create<useTargetText>((set) => ({
 targetText:"",
 setTargetText(v) {
     set({targetText:v})
 }, 
}));