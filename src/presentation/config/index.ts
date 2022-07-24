import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const PORT: string = process.env.PORT
export const WATSON_API_KEY: string = process.env.WATSON_API_KEY
export const WATSON_SERVICE_URL: string = process.env.WATSON_SERVICE_URL
export const WATSON_ASSISTANT_SOURCE_WORKSPACE_ID: string = process.env.WATSON_ASSISTANT_SOURCE_WORKSPACE_ID
export const WATSON_ASSISTANT_TARGET_WORKSPACE_ID: string = process.env.WATSON_ASSISTANT_TARGET_WORKSPACE_ID
