import supabase, { supabaseUrl } from "./supabase";

export async function login({email, password}){
    const {data, error} = await supabase.auth.signInWithPassword({
        email, password
    });

    if(error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    
    const {data: session, err} = await supabase.auth.getSession();

    if(!session.session) return null;

    if(err) throw new Error(err.message);

    return session.session?.user
}

export async function signUp({name, email, password, profilePic}) {

    const filename = `dp-${name.split(" ").join("-")}-${Math.random()}`
    const {error: storageError} = await supabase.storage.from('url-shortner').upload(filename, profilePic);
    const { data: path, error: pathError } = await supabase.storage.from('url-shortner').getPublicUrl(filename)

    if(storageError) throw new Error(storageError.message);

    if(pathError)  throw new Error(pathError.message);

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                profile_pic: path.publicUrl
            }
        }
    });

    if(error) throw new Error(error.message);

    return data;
    
}

export async function logout() {
    const { error } = await supabase.auth.signOut()

    if(error) throw new Error(error.message)
}