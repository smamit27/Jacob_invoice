/* Back drop loader open close logic */

const BACK_DROP_LOADER_OPEN = 'BACK_DROP_LOADER_OPEN'
const BACK_DROP_LOADER_CLOSE = 'BACK_DROP_LOADER_CLOSE'

const initialState = {
  open: false,
  data: {}
}

export function backDropLoaderOpenAction (payload = {}) {
  return {
    type: BACK_DROP_LOADER_OPEN,
    payload
  }
}

export function backDropLoaderCloseAction () {
  return {
    type: BACK_DROP_LOADER_CLOSE,
  }
}


export function backDropLoaderReducer (state = initialState, action) {
  switch (action.type) {
    case BACK_DROP_LOADER_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case BACK_DROP_LOADER_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}