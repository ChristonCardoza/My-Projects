import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {mixed, object, string} from 'yup';

import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import useFetch from '@/hooks/use-fetch';
import { login, signUp } from '@/db/apiAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urlState } from '@/context';

  
const Signup = () => {

    const [formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        profile_pic: null
    });

    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const longLink = searchParams.get("createNew")
    const {fetchUser} = urlState();

    const handleChange = (e) => {

        const {name, value, files} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const {data, loading, error, fn:fnSignup} = useFetch(signUp, formData);

    const handleSignup= async() => {
        setErrors([])

        const schema = object().shape({
            name: string().required("Name is required"),
            email: string().email("Invalid Email").required("Email is required"),
            password: string().min(6, "Password must be at least 6 charecters").required("Password is required"),
            profile_pic: mixed().required("Profile Pic is required")
        })

        try {
            await schema.validate(formData, {abortEarly: false})
            await fnSignup();
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
            <CardTitle>Signup</CardTitle>
            <CardDescription>to your account if you already have one</CardDescription>
            {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className='space-y-2'>
            <div className='space-y-1'>
                <Input type='name' name='name' placeholder="Enter Name" onChange={handleChange}/>
                {errors?.name && <Error message={errors.name} />}
            </div>
            <div className='space-y-1'>
                <Input type='email' name='email' placeholder="Enter Email" onChange={handleChange}/>
                {errors?.email && <Error message={errors.email} />}
            </div>
            <div className='space-y-1'>
                <Input type='password' name='password' placeholder="Enter Password" onChange={handleChange}/>
                {errors?.password && <Error message={errors.password} />}
            </div>
            <div className='space-y-1'>
                <Input type='file' name='profile_pic' accept='image/*' onChange={handleChange}/>
                {errors?.profile_pic && <Error message={errors.profile_pic} />}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSignup}>
                { loading ? <BeatLoader size={10} color='#36d7b7'/> : "Create Account"}
            </Button>
        </CardFooter>
    </Card>

  )
}

export default Signup