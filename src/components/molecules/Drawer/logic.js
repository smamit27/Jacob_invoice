const DRAWER_OPEN = 'DRAWER_OPEN'
const DRAWER_CLOSE = 'DRAWER_CLOSE'

const initialDrawer = {
  open: false,
  data: {}
}

export function drawerOpenAction (payload = {}) {
  return {
    type: DRAWER_OPEN,
    payload
  }
}

export function drawerCloseAction () {
  return {
    type: DRAWER_CLOSE,
  }
}


export function drawerReducer (state = initialDrawer, action) {
  switch (action.type) {
    case DRAWER_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case DRAWER_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}
