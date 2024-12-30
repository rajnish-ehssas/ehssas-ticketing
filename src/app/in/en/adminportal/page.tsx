"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router])
  // const updateData=()=>{
    
  //   router.refresh();
  // }
  return (
    <div>
      Admin portal
      {/* <button  onClick={updateData}>hello users</button> */}
    </div>
  )
}

export default Page
