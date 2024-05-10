import React, { useState } from 'react';

import { toast } from 'sonner';
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
  clear();
  setProgress(0);

  try {
    console.log("We have a total of ", files.length, " files");
    for (let i = 0; i < files.length; i++) {
      if (files[i].url.toLowerCase().endsWith('.pdf')) {
        console.log("It is a PDF, here we go...");
        try {
          const { data } = await axios.post("/api/convert_pdf", { url: files[i].url });
          const imageBase64List = data.image_base64_list;
          const worker = await createWorker();
          console.log("Worker", worker);

          for (const base64Image of imageBase64List) {
            try {
              // Perform OCR on the base64-encoded image directly
              const { data: { text } } = await worker.recognize('data:image/png;base64,' + base64Image);
          
              // Update the result text with OCR result
              const ocrResult = {
                documentName: files[i].name,
                pageNumber: imageBase64List.indexOf(base64Image) + 1,
                text: text
              };
              setTextMap(files[i].url + ocrResult.pageNumber, ocrResult);
              setOcrResults(prevResults => [...prevResults, ocrResult]);  
            } catch (ocrError) {
              console.error('Error performing OCR:', ocrError);
              // Handle OCR error
              setProgress(100);
              toast.error("something went wrong! please refresh!")
            }
          }
          // Terminate the worker
          await worker.terminate();
        } catch (pdfError) {
          console.error('Error converting PDF:', pdfError);
          // Handle PDF conversion error
          toast.error("something went wrong,please refresh!")
          setProgress(100);

        }
      } else {
        console.log("It is an image, wait for it...");
        const worker = await createWorker();
        try {
          const { data: { text } } = await worker.recognize(files[i].url);
          const ocrResult = {
            documentName: files[i].name,
            pageNumber: 1,
            text: text
          };
          setTextMap(files[i].url, ocrResult);
          setOcrResults(prevResults => [...prevResults, ocrResult]); 
        } catch (ocrError) {
          console.error('Error performing OCR:', ocrError);
          // Handle OCR error
          toast.error("something went wrong please refresh")
          setProgress(100);
        }
        // Terminate the worker
        await worker.terminate();
      }
      setProgress(((i + 1) / files.length) * 100);
      console.log("Progress:", ((i + 1) / files.length) * 100);
    }
  } catch (error) {
    console.error('Error:', error);
    setProgress(100);
    // Handle general error
  }
};



  return (
    <div>
    <Button disabled={isLoading||((progress==100)?false:true)} onClick={performOCR}>Start Scanning</Button>
       
    </div>
  );
}

export default Scan;
