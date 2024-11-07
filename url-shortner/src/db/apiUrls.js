import supabase from "./supabase";

export async function getURLs(user_id) {
    const {data, err} = await supabase
        .from("urls")
        .select("*")
        .eq("user_id", user_id);

    if(err) {
        console.error(err.message);
        throw new Error("Unable to load URLs")
    };

    return data;
}

export async function deleteURL(id) {
    const {data, err} = await supabase
        .from("urls")
        .delete()
        .eq("id", id);

    if(err) {
        console.error(err.message);
        throw new Error("Unable to load URLs")
    };

    return data;
}

export async function createURL({title, longUrl, customUrl, user_id},qrcode) {

    const shortURL = Math.random().toString(36).substring(2,6);
    const filename = `qr-${shortURL}`;

    const {error: storageError} = await supabase.storage.from('qrs').upload(filename, qrcode);
    if(storageError) throw new Error(storageError.message);

    const { data: qr, error: pathError } = await supabase.storage.from('qrs').getPublicUrl(filename)
    if(pathError) throw new Error(pathError.message);

    const {data, err} = await supabase
        .from("urls")
        .insert([
            {
                title,
                original_url: longUrl,
                custom_url: customUrl || null,
                short_url: shortURL,
                user_id ,
                qr: qr.publicUrl
            }
        ]).select();

    if(err) {
        console.error(err.message);
        throw new Error("Error while creating short URLs")
    };

    return data;
}

export async function getLongURL(id) {
    const {data, err} = await supabase
        .from("urls")
        .select("id, original_url")
        .or(`short_url.eq.${id}, custom_url.eq.${id}`)
        .single();

    if(err) {
        console.error(err.message);
        throw new Error("Error fetching Long URLs")
    };

    return data;
}

export async function getURL({id, user_id}) {
    const {data, err} = await supabase
        .from("urls")
        .select("*")
        .eq('id', id)
        .eq("user_id", user_id)
        .single();

    if(err) {
        console.error(err.message);
        throw new Error("Error fetching Short URL")
    };

    return data;
}

