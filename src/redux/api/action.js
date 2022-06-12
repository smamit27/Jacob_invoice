
import { showSearchCollectionList,CreateCollectionModalClose} from '../common/action'
import {  statusNotificationAction,errorStatusNotificationAction } from "../../components/molecules/StatusNotification/logic";

import {
    //getAuthenticationDetailsService,
    getEmployeesService,
    getProjectSearchCriteriaService,
    getSearchCollectionService,
    getCollectionNameService,
    insertCollectionService,
    getCollectionIdService
} from '../../services/httpService'
export const GET_PROJECT_NUMBER_SUCCESS = 'GET_PROJECT_NUMBER_SUCCESS'
export const GET_PROJECT_NUMBER_FAILURE = 'GET_PROJECT_NUMBER_FAILURE'
export const GET_PROJECT_SEARCH_CRITERIA_SUCCESS = 'GET_PROJECT_SEARCH_CRITERIA_SUCCESS'
export const GET_PROJECT_SEARCH_CRITERIA_FAILURE = 'GET_PROJECT_SEARCH_CRITERIA_FAILURE'
export const GET_SEARCH_COLLECTION_SUCCESS = 'GET_SEARCH_COLLECTION_SUCCESS'
export const GET_SEARCH_COLLECTION_FAILURE = 'GET_SEARCH_COLLECTION_FAILURE'
export const GET_COLLECTION_NAME_SUCCESS = 'GET_COLLECTION_NAME_SUCCESS'
export const GET_COLLECTION_NAME_FAILURE = 'GET_COLLECTION_NAME_FAILURE'
export const POST_CREATE_COLLECTION_SUCCESS = 'POST_CREATE_COLLECTION_SUCCESS'
export const POST_CREATE_COLLECTION_FAILURE = 'POST_CREATE_COLLECTION_FAILURE'
export const GET_COLLECTION_ID_SUCCESS = 'GET_COLLECTION_ID_SUCCESS'
export const GET_COLLECTION_ID_FAILURE = 'GET_COLLECTION_ID_FAILURE'



export const insertCollectionDetails = (collection) => async (dispatch, getState) => {
    await insertCollectionService(collection)
        .then(response => {
            dispatch({ type: POST_CREATE_COLLECTION_SUCCESS, payload: response })
            if(response.Result[0].FINAL_STATUS === "SUCCESS") {     
                dispatch(CreateCollectionModalClose(true))
                dispatch(statusNotificationAction({
                    type: 'success',
                    message: `${collection.collection[0].collectioN_NAME} collection created`
                  }))
                dispatch(getAllCollectionIdDetails())
            } else if(response.Result[0].FINAL_STATUS === "FAILED") {
                dispatch(errorStatusNotificationAction({
                    type: 'error',
                    message: `${response.Result[0].ERROR_OUT_MSG}`
                  }))
            }

        }).catch(error => {
            dispatch({ type: POST_CREATE_COLLECTION_FAILURE, payload: error })

        })
}
export const getEmployeesDetails = (employeeList,id) => async (dispatch, getState) => {
    //dispatch({ type: GET_AUTH_DETAILS_REQUEST })
    await getEmployeesService(employeeList,id)
        .then(response => {
            dispatch({ type: GET_PROJECT_NUMBER_SUCCESS, payload: response })

        }).catch(error => {
            dispatch({ type: GET_PROJECT_NUMBER_FAILURE, payload: error })
        })
}

export const getProjectSearchCriteriaDetails = (dispatch) =>
    async (dispatch) => {
        //dispatch({ type: GET_AUTH_DETAILS_REQUEST })
        await getProjectSearchCriteriaService()
            .then(response => {
                dispatch({ type: GET_PROJECT_SEARCH_CRITERIA_SUCCESS, payload: response })

            }).catch(error => {
                dispatch({ type: GET_PROJECT_SEARCH_CRITERIA_FAILURE, payload: error })
            })
    }

export const getSearchCollectionDetails = (value) => async (dispatch) => {
        //dispatch({ type: GET_AUTH_DETAILS_REQUEST })
        await getSearchCollectionService(value)
            .then(response => {
                dispatch({ type: GET_SEARCH_COLLECTION_SUCCESS, payload: response })
                dispatch(showSearchCollectionList(true))

            }).catch(error => {
                dispatch({ type: GET_SEARCH_COLLECTION_FAILURE, payload: error })
            })
    }

export const getCollectionNameDetails = (collectionName) => async (dispatch, getState) => {
    //dispatch({ type: GET_AUTH_DETAILS_REQUEST })
    await getCollectionNameService(collectionName)
        .then(response => {
            dispatch({ type: GET_COLLECTION_NAME_SUCCESS, payload: response })

        }).catch(error => {
            dispatch({ type: GET_COLLECTION_NAME_FAILURE, payload: error })
        })
}

export const getAllCollectionIdDetails = () => async (dispatch, getState) => {
    //dispatch({ type: GET_AUTH_DETAILS_REQUEST })
    await getCollectionIdService()
        .then(response => {
            dispatch({ type: GET_COLLECTION_ID_SUCCESS, payload: response })

        }).catch(error => {
            dispatch({ type: GET_COLLECTION_ID_FAILURE, payload: error })
        })
}
