import React from 'react';

interface FileInfo {
  text: string;
  name: string;
  url: string;
  pagenumber:number
}

const TextPreview: React.FC<FileInfo> = ({ text, name, url,pagenumber }) => {
  return (
    <div className=' rounded-md items-center justify-center flex flex-col w-[500px]   '>
      <p className='text-center h2 font-semibold' > {name}</p>
      <p className='text-sm  text-center'> {text}</p>
      <p className='text-center text-sm text-muted-foreground'>{pagenumber}</p>
    </div>
  );
};

export default TextPreview;
