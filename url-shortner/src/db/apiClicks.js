import supabase from "./supabase";
import UAParser from "ua-parser-js";

export async function getClicks(urlIds) {
    
    const {data, err} = await supabase.from("clicks").select("*").in("url_id", urlIds);

    if(err) {
        console.error(err.message);
        throw new Error("Unable to load Clicks")
    };

    return data;
}

const parser = new UAParser();

export async function storeClicks({id, originalUrl}){

    try {
        const res = parser.getResult();
        const device = res.type || 'desktop';

        const response = await fetch("https://ipapi.co/json");
        const {city, country_name: country} = await response.json();

        await supabase.from('clicks').insert([{
            url_id: id,
            city,
            country,
            device
        }]);

        window.location.href = originalUrl;
    } catch (e) {
        console.error("Error Recording clicks", e.message);
    }
}

export async function getClick(url_id) {
    const {data, err} = await supabase
        .from("clicks")
        .select("*")
        .eq('url_id', url_id);

    if(err) {
        console.error(err.message);
        throw new Error("Error fetching Clicks")
    };

    return data;
}