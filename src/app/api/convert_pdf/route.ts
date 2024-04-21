export const dynamic = 'force-dynamic'; // Assuming this import is necessary for your code
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"; 
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    
    const { url } = await req.json();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    
    console.log("Conversion was requested");
    
    // Start the OCR process asynchronously
    const response = await initiateOCR(url);
    
    console.log("OCR Text:", response.data);
    
    return  NextResponse.json(response.data);
  } catch (err) {
    console.log("[/api/upload error]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function initiateOCR(url:string) {
  // Initiate the OCR process
  const response = await axios.post('https://pdf-to-image-converter-microserv.onrender.com/convert_pdf_to_images', {
    pdf_url:url
  });

  // Return the response, assuming it's an Axios response object
  return response;
}
