import Config from "../config"
import { createClient } from "@supabase/supabase-js"

const db = createClient(Config.SUPABASE_URL as string, Config.SUPABASE_ANON_KEY as string)


export default db