const initialState = -1

const COLLECTION_ID = 'COLLECTION_ID'

export const setCollectionIdAction = (payload) => {
  return {
    type: COLLECTION_ID,
    payload
  }
}


export const getCollectionIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTION_ID:
      return action.payload
    default:
      return state
  }
}
