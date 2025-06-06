import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

class SupabaseClient {

    static #instance = null;

    constructor() {
        if(!SupabaseClient.#instance){
            SupabaseClient.#instance = createClient(supabaseUrl, supabaseAnonKey);
        }
        
        return SupabaseClient.#instance;
    }

}


export default SupabaseClient;
