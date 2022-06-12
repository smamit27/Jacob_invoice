
import {
    SHOW_BASIC_SETUP,
    COLLECTION_MODAL_CLOSE,
    // HIDE_PREVIEW,
    SET_CREATE_COLLECTION,
    ALLIANCE_SEARCH_CODE,
    ALLIANCE_SEARCH_CODE_SECOND,
    ALLIANCE_SEARCH_CODE_THIRD,
    SELECTED_PROJECT_NUMBER_CODE,
    PROJECT_NUMBER_CODE,
    SELECTED_ALLIANCE_CODE,
    CONTRACTOR_SEARCH_CODE,
    SHOW_SEARCH_MODAL,
    SELECTED_SEARCH_CODE,
    SIMILAR_CODE_SEARCH,
   // GET_AUTH_DETAILS_REQUEST,
    GET_PROJECT_NUMBER_SUCCESS,
    PROJECT_MANAGER_NAME,
    SEARCH_CLIENT_CODE_DETAIL,
    EDITABLE_COLLECTION,
    SHOW_ALLIANCE_CODE_ONE,
    SHOW_ALLIANCE_ONE,
    SHOW_ALLIANCE_CODE_SECOND,
    SHOW_ALLIANCE_SECOND,
    SHOW_ALLIANCE_CODE_THIRD,
    SHOW_ALLIANCE_THIRD,
    SHOW_SEARCH_COLLECTION_LIST,
    SHOW_SEARCH_COLLECTION,
    SHARED_TASK_MAPPING_PROJECT,
    SEARCH_CONTRACT_NUMBER_DETAIL
} from "./action";

const initState = {
    basicSetup: true,
    searchAllianceCode: [],
    searchAllianceCodeSecond: [],
    searchAllianceCodeThird: [],
    setCollectionData: {},
    searchProjectNumberCode: [],
    similarCode: [],
    employeeList: [],
    sharedTaskMappingProjectList: [],
    editable: '',
    searchContractAdministrator: '',
    showSearchModal: '',
    searchCode: '',
    selectedAlliCode: '',
    selectedpPojectNumberCode: '',
    searchProjectManagerName: '',
    searchClientCode: [],
    searchContractNumber: [],
    collectionModal: false,
    allianceCollectionList: false,    
    allianceCollectionSecond: false,    
    allianceCollectionListThird: false,
    searchCollectionListCode: false,
    showAllianceOne: false,
    showAllianceSecond: false,
    showAllianceThird: false,
    showSearchCollection: false,

}

export function commonReducer(state = initState, { payload, type } = {}) {
    switch (type) {
        case SHOW_BASIC_SETUP:
            return {
                ...state,
                basicSetup: payload,
        };
        case SHOW_ALLIANCE_CODE_ONE: 
        return {
            ...state,
            allianceCollectionList:payload
        }
        case SHOW_ALLIANCE_ONE: 
        return {
            ...state,
            showAllianceOne:payload
        }
        case SHOW_ALLIANCE_CODE_SECOND: 
        return {
            ...state,
            allianceCollectionListSecond:payload
        }
        case SHOW_ALLIANCE_SECOND: 
        return {
            ...state,
            showAllianceSecond:payload
        }
        case SHOW_ALLIANCE_CODE_THIRD: 
        return {
            ...state,
            allianceCollectionListThird:payload
        }
        case SHOW_ALLIANCE_THIRD: 
        return {
            ...state,
            showAllianceThird:payload
        }
        case SHOW_SEARCH_COLLECTION_LIST: 
        return {
            ...state,
            searchCollectionListCode:payload
        }
        case SHOW_SEARCH_COLLECTION:
        return {
            ...state,
            showSearchCollection:payload
            }
        case SET_CREATE_COLLECTION:
            return{
                ...state,
                setCollectionData: payload,
        }
        case COLLECTION_MODAL_CLOSE:
            return {
                ...state,
                collectionModal: payload

            }
            case ALLIANCE_SEARCH_CODE:
                return{
                    ...state,
                    searchAllianceCode: payload,
            }
            case ALLIANCE_SEARCH_CODE_SECOND:
                return{
                    ...state,
                    searchAllianceCodeSecond: payload,
            }
            case ALLIANCE_SEARCH_CODE_THIRD:
                return{
                    ...state,
                    searchAllianceCodeThird: payload,
            }

        case SELECTED_ALLIANCE_CODE:
            return {
                ...state,
                selectedAlliCode: payload
            }
        case PROJECT_NUMBER_CODE:
                return{
                    ...state,
                    searchProjectNumberCode: payload,
            }
       
        case CONTRACTOR_SEARCH_CODE:
            return {
                ...state,
                searchContractAdministrator : payload

            }
        case SHOW_SEARCH_MODAL:
            return {
                ...state,
                showSearchModal: payload

            }
        case SELECTED_SEARCH_CODE:
            return{
                ...state,
                searchCode: payload
            } 
            case SELECTED_PROJECT_NUMBER_CODE:
                return {
                    ...state,
                    selectedpPojectNumberCode: payload
            }
            case SIMILAR_CODE_SEARCH:
                return{
                    ...state,
                    similarCode: payload
            }
            case GET_PROJECT_NUMBER_SUCCESS: 
            return {
                ...state,
                employeeList: payload
            }
            
            case PROJECT_MANAGER_NAME: 
            return {
                ...state,
                searchProjectManagerName: payload
            }
            case SEARCH_CLIENT_CODE_DETAIL: 
            return {
                ...state,
                searchClientCode: payload
            }
            case SEARCH_CONTRACT_NUMBER_DETAIL: 
            return {
                ...state,
                searchContractNumber: payload
            }
            case EDITABLE_COLLECTION:
                return {
                    ...state,
                    editable: payload
            }
            case SHARED_TASK_MAPPING_PROJECT:
                return {
                    ...state,
                    sharedTaskMappingProjectList: payload
            }

        // case HIDE_PREVIEW:
        //     return {
        //         ...state,
        //         preview: false,
        //         previewData: {}
        //     };
       default:
            return state;
    }
}