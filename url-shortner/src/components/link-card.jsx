import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {Copy, Delete, Download, Trash} from "lucide-react";
import useFetch from "@/hooks/use-fetch.jsx";
import {deleteURL} from "@/db/apiUrls.js";
import {BeatLoader} from "react-spinners";

const LinkCard = ({url, fetchUrls}) => {

    const {loading: deleteLoading, fn:deleteFn} = useFetch(deleteURL, url?.id);

    const downloadImage = () => {

        const imageUrl = url?.qr;
        const filename= url?.title;

        const anchor = document.createElement('a');
        anchor.href = imageUrl;
        anchor.download = filename;

        document.body.appendChild(anchor);
        anchor.click();

        document.body.removeChild(anchor);
    }

    return (
        <div className='flex flex-col md:flex-row gap-4 border p-4 rounded-lg bg-gray-900'>
           <img src={url?.qr} alt='qr code' className='h-32 object-contain ring ring-blue-500 self-start'/>

            <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
                <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
                <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>{
                    `https://url-shortner.cardoza.in/${ url?.custom_url ? url.custom_url : url?.short_url}`
                }</span>
                <span className='flex gap-1 items-center hover:underline cursor-pointer'>{url?.original_url}</span>
                <span className='flex flex-1 items-end font-extralight text-sm'>{new Date(url?.created_at).toLocaleString()}</span>
            </Link>

            <div className='flex gap-2'>
                <Button variant='ghost' onClick={() => navigator.clipboard.writeText(`https://url-shortner.cardoza.in/${url?.short_url}`)}>
                    <Copy />
                </Button>
                <Button variant='ghost' onClick={downloadImage}>
                    <Download />
                </Button>
                <Button variant='ghost' onClick={() => deleteFn().then(() => fetchUrls())}>
                    { deleteLoading ? <BeatLoader size={5} color='white' /> : <Trash/>}
                </Button>

            </div>
        </div>
    );
};

export default LinkCard;