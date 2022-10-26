import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export const PORT: string = process.env.PORT
export const WATSON_TARGET_WORKSPACE_ID: string = process.env.WATSON_TARGET_WORKSPACE_ID
export const WATSON_TARGET_WORKSPACE_VERSION: string = process.env.WATSON_TARGET_WORKSPACE_VERSION
export const WATSON_TARGET_WORKSPACE_API_KEY: string = process.env.WATSON_TARGET_WORKSPACE_API_KEY
export const WATSON_TARGET_WORKSPACE_SERVICE_URL: string = process.env.WATSON_TARGET_WORKSPACE_SERVICE_URL

export const WATSON_SOURCE_WORKSPACE_ID: string = process.env.WATSON_SOURCE_WORKSPACE_ID
export const WATSON_SOURCE_WORKSPACE_VERSION: string = process.env.WATSON_SOURCE_WORKSPACE_VERSION
export const WATSON_SOURCE_WORKSPACE_API_KEY: string = process.env.WATSON_SOURCE_WORKSPACE_API_KEY
export const WATSON_SOURCE_WORKSPACE_SERVICE_URL: string = process.env.WATSON_SOURCE_WORKSPACE_SERVICE_URL
