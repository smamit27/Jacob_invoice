
import {
    GET_PROJECT_NUMBER_SUCCESS,
    GET_PROJECT_SEARCH_CRITERIA_SUCCESS,
    GET_SEARCH_COLLECTION_SUCCESS,
    GET_COLLECTION_NAME_SUCCESS,
    GET_COLLECTION_ID_SUCCESS
} from "./action";

const initState = {
    employeeList: [],
    getProjectSearchCriteria: [],
    getSearchCollection: [],
    getCollectionName: [],
    insertCollection: [],
    getCollectionId: []
}

export function apiReducer(state = initState, { payload, type } = {}) {
    switch (type) {
            case GET_PROJECT_NUMBER_SUCCESS: 
            return {
                ...state,
                employeeList: payload
            }           
            case GET_PROJECT_SEARCH_CRITERIA_SUCCESS: 
            return {
                ...state,
                getProjectSearchCriteria: payload
            }            
            case GET_COLLECTION_NAME_SUCCESS: 
            return {
                ...state,
                getCollectionName: payload
            }
            case GET_SEARCH_COLLECTION_SUCCESS: 
            return {
                ...state,
                getSearchCollection: payload
            }
            case GET_COLLECTION_ID_SUCCESS: 
            return {
                ...state,
                getCollectionId: payload
            }
           
       default:
            return state;
    }
}