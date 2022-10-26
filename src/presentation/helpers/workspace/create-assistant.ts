import AssistantV1 from 'ibm-watson/assistant/v1'
import { IamAuthenticator } from 'ibm-watson/auth'
import { WATSON_TARGET_WORKSPACE_API_KEY, WATSON_TARGET_WORKSPACE_SERVICE_URL, WATSON_TARGET_WORKSPACE_VERSION, WATSON_SOURCE_WORKSPACE_API_KEY, WATSON_SOURCE_WORKSPACE_SERVICE_URL, WATSON_SOURCE_WORKSPACE_VERSION } from '../../config/index'

export const createTargetAssistantV1 = new AssistantV1({
  version: WATSON_TARGET_WORKSPACE_VERSION,
  authenticator: new IamAuthenticator({
    apikey: WATSON_TARGET_WORKSPACE_API_KEY
  }),
  serviceUrl: WATSON_TARGET_WORKSPACE_SERVICE_URL
})

export const createSourceAssistantV1 = new AssistantV1({
  version: WATSON_SOURCE_WORKSPACE_VERSION,
  authenticator: new IamAuthenticator({
    apikey: WATSON_SOURCE_WORKSPACE_API_KEY
  }),
  serviceUrl: WATSON_SOURCE_WORKSPACE_SERVICE_URL
})
