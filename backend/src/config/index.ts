import "dotenv/config"

const Config = {
    PORT: process.env.PORT,
    JSONWEBTOEKN: process.env.JSONWEBTOEKN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    DEEPSAKE_API_KEY: process.env.DEEPSAKE_API_KEY,
    Gemein_api_key: process.env.Gemein_api_key,
    FRONTEND_URL: process.env.FRONTEND_URL
}

export default Config