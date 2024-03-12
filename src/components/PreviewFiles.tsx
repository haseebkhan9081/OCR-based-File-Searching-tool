"use client"
import { File } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import FileInfo from './File'
import { useAllFiles } from '@/app/hooks/useAllFiles'
import { Loader2 } from 'lucide-react'
 

function PreviewFiles() { 
const {fetchData,files,isLoading}=useAllFiles()

useEffect(()=>{
fetchData()
},[])
  return (
    <div
    className='flex
    flex-col
    space-y-2'>{isLoading&&<Loader2
    className='text-sky-600
    animate-spin
    justify-center
    overflow-y-auto
    items-center
    w-4 h-4'/>}{files?.map((f:File)=>(
<div
key={f.id}>
<FileInfo
createdAt={f?.createdAt}
updatedAt={f?.updatedAt}
fetchData={fetchData}
id={f?.id}
name={f?.name}
size={f?.size}
type={f?.type}
url={f?.url}
/>
</div>

    ))}</div>
  )
}

export default PreviewFiles