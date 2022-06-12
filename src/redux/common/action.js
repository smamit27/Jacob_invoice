//export const GET_AUTH_DETAILS_REQUEST = 'GET_AUTH_DETAILS_REQUEST'
export const GET_AUTH_DETAILS_SUCCESS = 'GET_AUTH_DETAILS_SUCCESS'
export const GET_AUTH_DETAILS_FAILURE = 'GET_AUTH_DETAILS_FAILURE'
export const SHOW_BASIC_SETUP = 'SHOW_BASIC_SETUP'
export const SET_CREATE_COLLECTION = 'SET_CREATE_COLLECTION'
export const ALLIANCE_SEARCH_CODE = 'ALLIANCE_SEARCH_CODE'
export const ALLIANCE_SEARCH_CODE_SECOND = 'ALLIANCE_SEARCH_CODE_SECOND'
export const ALLIANCE_SEARCH_CODE_THIRD = 'ALLIANCE_SEARCH_CODE_THIRD'
export const SELECTED_ALLIANCE_CODE = 'SELECTED_ALLIANCE_CODE'
export const CONTRACTOR_SEARCH_CODE = 'CONTRACTOR_SEARCH_CODE'
export const SHOW_SEARCH_MODAL = 'SHOW_SEARCH_MODAL'
export const SELECTED_SEARCH_CODE = 'SELECTED_SEARCH_CODE'
export const SIMILAR_CODE_SEARCH = 'SIMILAR_CODE_SEARCH'
export const SELECTED_PROJECT_NUMBER_CODE = 'SELECTED_PROJECT_NUMBER_CODE'
export const PROJECT_NUMBER_CODE = 'PROJECT_NUMBER_CODE'
export const GET_PROJECT_NUMBER_SUCCESS = 'GET_PROJECT_NUMBER_SUCCESS'
export const GET_PROJECT_NUMBER_FAILURE = 'GET_PROJECT_NUMBER_FAILURE'
export const PROJECT_MANAGER_NAME = 'PROJECT_MANAGER_NAME'
export const SEARCH_CLIENT_CODE_DETAIL = 'SEARCH_CLIENT_CODE_DETAIL'
export const COLLECTION_MODAL_CLOSE = 'COLLECTION_MODAL_CLOSE'
export const EDITABLE_COLLECTION = 'EDITABLE_COLLECTION'
export const  SHOW_ALLIANCE_CODE_ONE = 'SHOW_ALLIANCE_CODE_ONE'
export const SHOW_ALLIANCE_ONE = 'SHOW_ALLIANCE_ONE'
export const SHOW_ALLIANCE_CODE_SECOND = 'SHOW_ALLIANCE_CODE_SECOND'
export const SHOW_ALLIANCE_SECOND = 'SHOW_ALLIANCE_SECOND'
export const SHOW_ALLIANCE_CODE_THIRD = 'SHOW_ALLIANCE_CODE_THIRD'
export const SHOW_ALLIANCE_THIRD = 'SHOW_ALLIANCE_THIRD'
export const SHOW_SEARCH_COLLECTION_LIST = 'SHOW_SEARCH_COLLECTION_LIST'
export const SHOW_SEARCH_COLLECTION = 'SHOW_SEARCH_COLLECTION'
export const SHARED_TASK_MAPPING_PROJECT = 'SHARED_TASK_MAPPING_PROJECT'
export const SEARCH_CONTRACT_NUMBER_DETAIL = 'SEARCH_CONTRACT_NUMBER_DETAIL'



export function showBasicSetup(payload) {
    return {
        type: SHOW_BASIC_SETUP,
        payload: payload
    };
}
export function showAllianceCodeOne(payload) {
    return {
        type: SHOW_ALLIANCE_CODE_ONE,
        payload: payload
    };
}
export function showAllianceOneInBasic(payload) {
    return {
        type: SHOW_ALLIANCE_ONE,
        payload: payload
    };
}
export function showAllianceCodeSecond(payload) {
    return {
        type: SHOW_ALLIANCE_CODE_SECOND,
        payload: payload
    };
}
export function showAllianceSecondInBasic(payload) {
    return {
        type: SHOW_ALLIANCE_SECOND,
        payload: payload
    };
}

export function showAllianceCodeThird(payload) {
    return {
        type: SHOW_ALLIANCE_CODE_THIRD,
        payload: payload
    };
}
export function showAllianceThirdInBasic(payload) {
    return {
        type: SHOW_ALLIANCE_THIRD,
        payload: payload
    };
}
export function showSearchCollectionList(payload) {
    return {
        type: SHOW_SEARCH_COLLECTION_LIST,
        payload: payload
    };
}
export function showSearchCollectionInBasic(payload) {
    return {
        type: SHOW_SEARCH_COLLECTION,
        payload: payload
    };
}
export function setCreateCollectionData(payload){
        return {
            type: SET_CREATE_COLLECTION,
            payload: payload
        }
};
export function allianceCodeSearch(payload){
    return {
        type: ALLIANCE_SEARCH_CODE,
        payload: payload
    };
}
export function allianceCodeSearchSecond(payload){
    return {
        type: ALLIANCE_SEARCH_CODE_SECOND,
        payload: payload
    };
}
export function allianceCodeSearchThird(payload){
    return {
        type: ALLIANCE_SEARCH_CODE_THIRD,
        payload: payload
    };
}

export function selectedAllianceCode(payload){
    return {
        type: SELECTED_ALLIANCE_CODE,
        payload: payload
    };
}
export function projectNumberCode(payload){
    return {
        type: PROJECT_NUMBER_CODE,
        payload: payload
    };
}
export function selectedProjectNumberCode(payload){
    return {
        type: SELECTED_PROJECT_NUMBER_CODE,
        payload: payload
    };
}
export function contractAdministrator(payload){
    return {
        type: CONTRACTOR_SEARCH_CODE,
        payload: payload
    };
}
export function showSearchModal(payload) {
    return {
        type: SHOW_SEARCH_MODAL,
        payload: payload
    };
}
export function selectedSearchCode(payload){
    return {
        type: SELECTED_SEARCH_CODE,
        payload: payload
    };
}
export function similarCodeSearch(payload) {
    return {
        type: SIMILAR_CODE_SEARCH,
        payload: payload
    };
}

export function projectManagerName(payload){
    return {
        type: PROJECT_MANAGER_NAME,
        payload: payload
    }
}
export function searchClientCodeDetails(payload){
    return {
        type: SEARCH_CLIENT_CODE_DETAIL,
        payload: payload
    }
}
export function searchContractNumberDetails(payload){
    return {
        type: SEARCH_CONTRACT_NUMBER_DETAIL,
        payload: payload
    }
}
export function CreateCollectionModalClose(payload){
    return {
        type: COLLECTION_MODAL_CLOSE,
        payload: payload
    }
}
export function editableCollection(payload){
    return {
        type: EDITABLE_COLLECTION,
        payload: payload
    }
}
export function sharedTaskMappingProject(payload){
    return {
        type: SHARED_TASK_MAPPING_PROJECT,
        payload: payload
    }
}
