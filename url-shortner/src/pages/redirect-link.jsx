import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import useFetch from "@/hooks/use-fetch.jsx";
import {getLongURL} from "@/db/apiUrls.js";
import {BarLoader} from "react-spinners";
import {storeClicks} from "@/db/apiClicks.js";

const RediectLink = () => {

  const {id} = useParams();
  const {loading, data, fn} = useFetch(getLongURL, id);
  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url
  })

  console.log("id", id)

  useEffect(() => {
    fn();
  }, [])

  useEffect(() => {

    if(!loading && data){
      fnStats()
    }
  }, [loading, data])


  if( loading || loadingStats) {
    return (
        <>
          <BarLoader width={'100%'} color='#36d7b7' />
          <br/>
          Redirecting...
        </>
    )
  }

  return null;
}

export default RediectLink