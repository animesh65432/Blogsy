import "dotenv/config"

const Config = {
    PORT: process.env.PORT,
    JSONWEBTOEKN: process.env.JSONWEBTOEKN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY

}

export default Config