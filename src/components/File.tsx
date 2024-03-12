import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { format } from 'date-fns';
interface FileInfoprops{
 name :string;
 url:string,
 size:string,
 type:string,
 id:string  ,
 fetchData:()=>void, 
 createdAt:Date,
 updatedAt:Date
}

const FileInfo:React.FC<FileInfoprops>=({
  name,size,type,url,id,fetchData,
  createdAt,
  updatedAt
})=> {
const [isClicked,setisClicked]=useState(false);
 const router=useRouter() 
 const onDelete=()=>{
  setisClicked(true)
  axios.delete(`/api/file/delete/${id}`).then((res)=>{
    toast.success("File deleted!",{description:res.data.name})
  }).catch((err)=>{
    toast.error("something went wrong!")
    console.log("[src/components/File.tsx] error",err)
  }).finally(()=>{
    fetchData()
    setisClicked(false)
  })
 }

  return (
    <div
    className='p-2
    ring-1
    ring-sky-300
    rounded-md
    '>
      <div
      className='w-full justify-between
      flex-row
      text-lg
      items-center
      flex'>{name}  <p
    className='text-xs text-muted-foreground'>{size}</p>
      {isClicked?<Loader2
      className='animate-spin w-4 text-green-600'/>:<X
      onClick={()=>{
        onDelete( )
      }}
        className=' 
        w-4
        hover:text-red-600
        
        '
        />}
      
      </div>
       
    <p
    className='text-xs text-muted-foreground'>{format(createdAt, 'dd/MM/yyyy hh:mm:ss a')}</p></div>
  )
}

export default FileInfo