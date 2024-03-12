import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import next from "next";
import { NextResponse } from "next/server";

export async function POST(req:Request){

try{
const {userId}=auth();
const { name,
    url,
    typ,
    size}=await req.json()

    let s, unit;
    if (size < 1024) {
        s = size;
        unit = "B";
    } else if (size < 1024 * 1024) {
        s = size / 1024;
        unit = "KB";
    } else {
        s = size / (1024 * 1024);
        unit = "MB";
    }

    // Round the result to two decimal places
    const Sizefinal= s.toFixed(2) + "" + unit;
if(!userId){
 return new NextResponse("Unauthorized",{status:400})
}

const file=await client.file.create(({
    data:
    {
        name,
        size:Sizefinal,
        type:typ,
        url,
        userId,
    }
}))


if(file){
    return NextResponse.json(file)
}
return new NextResponse("failed to upload",{status:402})
}catch(err){
    console.log("[/api/upload error]",err);
return new NextResponse("Internal Server Error",{status:500})
}


}