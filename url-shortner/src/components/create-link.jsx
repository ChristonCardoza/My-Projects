import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.jsx";
import {Input} from "@/components/ui/input.jsx";
import Error from "@/components/error.jsx";
import {Card} from "@/components/ui/card.jsx";
import {object, string} from "yup"
import {urlState} from "@/context.jsx";
import {QRCode} from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch.jsx";
import {createURL} from "@/db/apiUrls.js";
import {BeatLoader} from "react-spinners";

function CreateLink() {

    const { user } = urlState();
    const navigate = useNavigate();
    const ref = useRef();

    const [searchParams, setSearchParams] =useSearchParams();
    const longLink = searchParams.get('createNew');

    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title:'',
        longUrl: longLink ? longLink : '',
        customUrl:''
    });

    const schema = object().shape({
        title: string().required('Title is required'),
        longUrl: string().url("Must be Valid URL").required('Long URL is required'),
        customUrl: string()
    })

    const handleChange = (event) => {
        const {id, value} = event.target;
        setFormValues({
            ...formValues,
            [id]: value
        })
    }

   const { loading, data, error, fn: fnCreate} = useFetch(createURL, {...formValues, user_id:user?.id});

    const createNewUrl = async () => {
        setErrors({});

        try {
            await schema.validate(formValues, {abortEarly: false});
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => {canvas.toBlob(resolve)})
            fnCreate(blob)
        } catch (e){
            const newErrors = {};
            e?.inner?.forEach( err => newErrors[err.path] = err.message);
            setErrors(newErrors);
        }
    }

    useEffect(() => {

        if(error === null && data){
            navigate(`/link/${data[0].id}`)
        }
    }, [error, data])

    return (
        <Dialog defaultOpen={longLink} onOpenChange={(res) => {if(!res) setSearchParams({})}}>
            <DialogTrigger>
                Create New Link
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='font-bold text-2xl'>Create New</DialogTitle>
                </DialogHeader>

                {
                    formValues?.longUrl && (
                        <QRCode value={formValues.longUrl} size={250} ref={ref}/>
                    )
                }
                <Input id='title' placeholder="Short Link's Title" value={formValues.title} onChange={handleChange}/>
                {errors?.title && <Error message={errors.title}/>}

                <Input id='longUrl' placeholder="Enter Long URL" value={formValues.longUrl} onChange={handleChange}/>
                {errors?.longUrl && <Error message={errors.longUrl}/>}

                <div className='flex items-center gap-2'>
                    <Card className='p2'>...cardoza.in</Card> /
                    <Input id='customUrl' placeholder="Custom Link (optional)" value={formValues.customUrl} onChange={handleChange}/>
                </div>
                {error && <Error message={error.message}/>}
                <DialogFooter onClick={createNewUrl} disabled={loading} className='sm:justify-start'>
                    <Button variant='destructive'>{ loading ? <BeatLoader size={10} color='white'/> : 'Create'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateLink;