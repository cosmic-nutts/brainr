import {createClient} from "@supabase/supabase-js";
import {auth} from "@clerk/nextjs/server";

export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'your_supabase_project_url' || 
        supabaseAnonKey === 'your_supabase_anon_key') {
        throw new Error('Supabase environment variables are not properly configured. Please check your .env.local file.');
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
        async accessToken() {
            try {
                return ((await auth()).getToken());
            } catch (error) {
                console.warn('Failed to get auth token:', error);
                return null;
            }
        }
    });
}