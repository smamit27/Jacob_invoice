import axios from 'axios'
import promise from 'redux-promise-middleware'
import { getCookie } from './cookie'


// export const getAuthenticationDetailsService = () => new Promise((resolve, reject) => {
//   const baseUrl = window.location.href === 'http://localhost:3000/' ? 'https://jacobsanalyticsportaldev.jacobs.com/' : window.location.href
//   axios.get(`${baseUrl}.auth/me`)
//     .then(res => {
//       if (isArray(res?.data)) {
//         if (res.data.length > 0) {
//           const authData = res?.data[0]
//           localStorage.setItem("JacobsAuth", JSON.stringify(authData))
//           resolve(authData)
//         } else {
//           if (!window.location.hash) {
//             // window.location = window.location + '#loaded';
//             //   window.location.reload();
//           }
//         }
//       } else {
//         if (!window.location.hash) {
//           // window.location = window.location + '#loaded';
//           // window.location.reload();
//         }
//       }
//     })
//     .catch(err => {
//       if (!window.location.hash) {
//         // window.location = window.location + '#loaded';
//         window.location.reload();
//       }
//     })
// })

export const handleError = (error = {}) => {
  const { status = '', statusText = '', data } = (error?.response || {})
  try {
    return {
      code: status,
      message: typeof data === 'string' ? data : (statusText || 'Something went wrong, Please try again later!')
    }
  } catch (error) {
    return {
      code: 'unknown issue',
      message: 'Something went wrong, Please try again later!'
    }
  }
}

export const apiCall = async ({
  method = 'GET', params = {}, data = {}, url = '/', headers = {}, auth = true, baseURL = process?.env?.REACT_APP_API_URL, dummy = false, noDataValue = [], ignore404 = false
}) => {
  const mainUrl = dummy ? process?.env?.REACT_APP_DUMMY_API_URL : baseURL
  // const queryString = params && Object.keys(params).length ? `?${new URLSearchParams(params).toString()}` : ''
  const request = {
    url,
    baseURL: mainUrl,
    method,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      // ...(auth ? { 'Authorization': `bearer ${getCookie('auth') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkpFR0lOVExcXFNJTkdIQTIzIiwibmJmIjoxNjM5Mzc4MDA2LCJleHAiOjE2Mzk5ODI4MDYsImlhdCI6MTYzOTM3ODAwNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0ODg0OSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDg4NDkifQ.2PacsyW84BKbs078P2qva8HVVqoJwqhPeBvusaqKczk'}` } : {}),
      ...headers
    },
    ...(auth ? { withCredentials: true } : {}),
  }
  try {
    const response = await (axios(request))
    return response.data
  } catch (error) {
    const err = handleError(error)
    // if (err.code === 404) {
    //   return Promise.resolve(noDataValue)
    // }
    return Promise.reject(err)
  }
}

export const insertCollectionService = async (collection) => {
  try {
    const response = await apiCall({
      method: 'POST',
      url: '/InsertCollection',
      params: {BudgetAmount: 0},
      data: collection              
    })
    return response
  }

  catch (error) {
    const err = handleError(error)
    return Promise.reject(err)
  }
}
  



  export const getEmployeesService = async (employee,id) => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: id === 'project' ? '/GetProgramManagerDetails': '/GetContractAdministartorDetails',
        params: {
          EmpName: employee.EMPLOYEE_NAME,
          EmpNumber: employee.EMPLOYEE_NUMBER,
          EmailAddress: employee.EMPLOYEE_EMAIL,
          HrLocation: employee.EMPLOYEE_LOCATION
        }       
      })
      return response
    }
  
    catch (error) {
      const err = handleError(error)
    return Promise.reject(err)
    }
  }
  
 export const getProjectSearchCriteriaService = async () => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: '/GetProjectsearchcriteria'        
      })
      return response
    }
  
    catch (error) {
      const err = handleError(error)
    return Promise.reject(err)
    }
  }



  export const getSearchCollectionService = async (searchCollection) => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: '/GetSearchCollection',
        params: {
          collectioName: searchCollection
        }
      })
      return response
    }
  
    catch (error) {
      const err = handleError(error)
    return Promise.reject(err)
    }
  }

  
  export const getCollectionNameService = async (CollectionName) => {
    try {
      const response = await apiCall({
        method: 'GET',
        url: '/GetCollectionNameValidation',
        params: {
          CollectionName: CollectionName
        }
      })
      return response
    }
  
    catch (error) {
      const err = handleError(error)
    return Promise.reject(err)
    }
  }
  

  
export const getCollectionIdService = async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/GetSearchCollection'
    })
    return response
  }

  catch (error) {
    const err = handleError(error)
    return Promise.reject(err)
  }
}



export const getAddAllModule = async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/GetUDFModuleAll',
      params: {
        Active: 'Y'
      }
    })
    return response
  }

  catch (error) {
    const err = handleError(error)
    return Promise.reject(err)
  }
}



export const getRequiredOptions = async () => {
  try {
    const response = await apiCall({
      method: 'GET',
      url: '/Get_UDFFieldRequired',
      // params: {
      //   Active: 'Y'
      // }
    })
    return response
  }

  catch (error) {
    const err = handleError(error)
    return Promise.reject(err)
  }
}

export const getUniqueIdFromApi = async (url, key) => {
  try {
    const response = await apiCall({
      url
    })
    const [a = {}] = response
    return a[key] || ''
  } catch (error) {
    return ''
  }
}