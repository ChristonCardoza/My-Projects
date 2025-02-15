import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import Links from './Links';
import { useResultContext } from './contexts/ResultContextProvider';

const Search = () => {

    const [text, setText] = useState('DeadMan');
    const { setSearchTerm } = useResultContext();
    const [ debounceValue ] = useDebounce(text, 300);

    useEffect(() => {
        if(debounceValue) setSearchTerm(debounceValue);
    }, [debounceValue]);

    return (
        <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
            <input
                value={text}
                type='text'
                className='sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
                placeholder='Search Coggle or type url'
                onChange={(e) => setText(e.target.value)}
            />
            {
                !text && (
                    <button type='button' className='absolute top-15 right-4 text-2xl text-gray-500' onClick={() => setText('')}>
                        X
                    </button>
                )
            }
            <Links />  
        </div>
    )
}

export default Search
