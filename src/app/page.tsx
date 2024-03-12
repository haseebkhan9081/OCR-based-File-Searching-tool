import Preview from "@/components/Preview";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div
    className="w-full
    p-6
    h-full
    flex
flex-col
justify-center
items-center
    ">
      <div
      className="
      flex
      flex-row-reverse 
      justify-between
      w-full
      h-full
      
      ">
      <UserButton/>
      </div>
      <Preview/>
   
    </div>
  );
}
