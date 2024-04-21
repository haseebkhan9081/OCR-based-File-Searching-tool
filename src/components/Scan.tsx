import React, { useState } from 'react';
import { Button } from './ui/button';
import { createWorker } from 'tesseract.js';
import axios from 'axios';
import { useAllFiles } from '@/app/hooks/useAllFiles';
import { useScanProgressBar } from '@/app/hooks/useProgress';
interface OcrResult {
  documentName: string;
  pageNumber: number;
  text: string;
}
function Scan() {const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);
const {setProgress,progress}=useScanProgressBar()
const {setTextMap,files,clear,fetchData,isLoading}=useAllFiles()
 
  const performOCR = async () => {
     clear()
    setProgress(0);
   
         try {
console.log("we have a total of ",files.length,"files");
      for (let i=0;i<files.length;i++) {
         
        
        if (files[i].url.toLowerCase().endsWith('.pdf')) {
          console.log("it is a pdf here we go bro....")
          const { data } = await axios.post("/api/convert_pdf", { url: files[i].url });
          const imageBase64List = data.image_base64_list;
          const worker=await createWorker()
  
  
          for (const base64Image of imageBase64List) {
            // Perform OCR on the base64-encoded image directly
            const { data: { text } } = await worker.recognize('data:image/png;base64,' + base64Image);
        
            // Update the result text with OCR result
            const ocrResult: OcrResult = {
              documentName: files[i].name,
              pageNumber: imageBase64List.indexOf(base64Image) + 1,
              text: text
            };
  setTextMap(files[i].url+ocrResult.pageNumber,ocrResult);
            setOcrResults(prevResults => [...prevResults, ocrResult]);  
          }
          // Log the recognized text
          await worker.terminate();
          
          // Terminate the worker
           
        } else {
          console.log("it is an image wait for it...")
          const worker=await createWorker()
          const { data: { text } } = await worker.recognize(files[i].url);
          console.log(text);
          const ocrResult: OcrResult = {
            documentName: files[i].name,
            pageNumber:   1,
            text: text
          };
          setTextMap(files[i].url,ocrResult);
          setOcrResults(prevResults => [...prevResults, ocrResult]); 
          await worker.terminate();
  
          
        }
        
        setProgress(((i + 1) / files.length) * 100);

        console.log("p:",((i + 1) / files.length) * 100)
      }
      // Check if the input URL ends with .pdf
      
    } catch (error) {
      console.error('Error performing OCR:', error);
    }
  };

  return (
    <div>
    <Button disabled={isLoading||((progress==100)?false:true)} onClick={performOCR}>Start Scanning</Button>
       
    </div>
  );
}

export default Scan;
