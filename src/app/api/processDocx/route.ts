export const dynamic = 'force-dynamic'; // Assuming this import is necessary for your code
import { auth } from "@clerk/nextjs"; 
import axios from "axios";
import { NextResponse } from "next/server";
import mammoth from 'mammoth';


export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    const { url } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    
    console.log("docX processing was requested");
    
    // Start the OCR process asynchronously
    const response = await initiateDocXProcessing(url);
    
 
    
    return  NextResponse.json(response);
  } catch (err) {
    console.log("[/api/processDocX error]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function initiateDocXProcessing(url:string) {
  // Initiate the OCR process
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const fileBuffer = response.data;
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
   
  return result.value;
}
