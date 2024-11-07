import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {object, string} from 'yup';

import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import useFetch from '@/hooks/use-fetch';
import { login } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urlState } from '@/context';

  
const Login = () => {

    const [formData, setFormData ] = useState();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const longLink = searchParams.get("createNew")
    const {fetchUser} = urlState();

    const handleChange = (e) => {

        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const {data, loading, error, fn:fnLogin} = useFetch(login, formData);

    const handleLogin = async() => {
        setErrors([])

        const schema = object().shape({
            email: string().email("Invalid Email").required("Email is required"),
            password: string().min(6, "Password must be at least 6 charecters").required("Password is required")
        })

        try {
            await schema.validate(formData, {abortEarly: false})

            await fnLogin();
        } catch (error) {
            
            const newErrors = {};

            error?.inner?.forEach(err => {
                newErrors[err.path] = err.message
            })

            setErrors(newErrors)
        }
        
        
    }

   useEffect(() => {
    
    if(error === null && data){
        
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);

        fetchUser();

    }
   }, [data, error])

  return (
    <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>to your account if you already have one</CardDescription>
            {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className='space-y-2'>
            <div className='space-y-1'>
                <Input type='email' name='email' placeholder="Enter Email" onChange={handleChange}/>
                {errors?.email && <Error message={errors.email} />}
            </div>
            <div className='space-y-1'>
                <Input type='password' name='password' placeholder="Enter Password" onChange={handleChange}/>
                {errors?.password && <Error message={errors.password} />}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleLogin}>
                { loading ? <BeatLoader size={10} color='#36d7b7'/> : "Login"}
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Login