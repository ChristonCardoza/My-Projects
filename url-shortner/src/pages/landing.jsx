import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from "react-router-dom";


const LandingPage = () => {

  const [longURL, setLongURL] = useState('');
  const navigate = useNavigate();

  const handleShorten = (e) => {

    e.preventDefault;

    if(longURL) navigate(`/auth?createNew=${longURL}`)
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL Shortner you'll ever need!
      </h2>

      <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2" onSubmit={handleShorten}>
        <Input type="url" placeholder="Enter your long URL" value={longURL} onChange={(e) => setLongURL(e.target.value) } className="h-full flex-1 p-4"/>
        <Button type="submit" variant="destructive" className="h-full">Shortner!</Button>
      </form>
      <img src="banner.jpeg" alt="banner" className="w-full my-11 md:px-11"/>

      <Accordion type="multiple" collapsible className="w-full md:px-11">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the URL Shortner works?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL our system generate short version of that URL. This shortened URL redirected 
            to original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do I need an account to use the App?</AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage URLs, manage accounts, analytics and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What analytics available for my Shortened URLs</AccordionTrigger>
          <AccordionContent>
            You can view number of click, geological data of clicks and device types for each of your shortned URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  );
};

export default LandingPage;
