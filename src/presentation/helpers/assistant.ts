import AssistantV1 from 'ibm-watson/assistant/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { WATSON_SERVICE_URL, WATSON_API_KEY } from '../config/index'

export const createAssistantV1 = new AssistantV1({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: WATSON_API_KEY
  }),
  serviceUrl: WATSON_SERVICE_URL
})
