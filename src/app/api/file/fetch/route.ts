export const dynamic = 'force-dynamic';
import client from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(req:Request){

try{
const {userId}=auth();
 
 
if(!userId){
 return new NextResponse("Unauthorized",{status:400})
}

const file= await client.file.findMany(({
    where:{
        userId
    },
    orderBy:{
        createdAt:"desc"
    }
}))


if(file?.[0]){
    return NextResponse.json(file)
}
return NextResponse.json([])
}catch(err){
    console.log("[/api/upload error]",err);
return new NextResponse("Internal Server Error",{status:500})
}


}