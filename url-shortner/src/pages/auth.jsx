import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login';
import Signup from '@/components/signup';
import { urlState } from '@/context';

function Auth() {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const {isAuthenticated, loading} = urlState();

  useEffect(() => {

    if(isAuthenticated && !loading){
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  },[isAuthenticated, loading, navigate])

  return (
    <div className='mt-36 flex flex-col items-center gap-10'>

      <h1 className='text-5xl font-extrabold'>
        { longLink ? "Hold Up! Let's Login first..." :  "Login / SignUp"}
      </h1>

      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login"><Login /></TabsContent>
        <TabsContent value="signup"><Signup /></TabsContent>
      </Tabs>

    </div>
  )
}

export default Auth