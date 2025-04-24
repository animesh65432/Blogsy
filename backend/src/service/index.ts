import { GoogleGenerativeAI } from "@google/generative-ai"
import Config from "../config"
const gentAi = new GoogleGenerativeAI(Config.Gemein_api_key as string)
const AI_Model = gentAi.getGenerativeModel({ model: "gemini-1.5-flash" })
export default AI_Model
