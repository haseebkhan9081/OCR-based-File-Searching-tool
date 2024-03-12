export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
         const {userId}=auth()
if(!userId){
    return new NextResponse("UnAuthorized",{status:400})
}

const f=await client.file.delete(({
    where:{
        id:params?.id
    }
}))

if(!f){

  return new NextResponse("unable to delete")  
}
        // Return a success response
return NextResponse.json(f);
    } catch (error) {
        console.error('src/app/api/file/delete/[id]/route.ts  Error deleting item:', error);
        // Return an error response
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
