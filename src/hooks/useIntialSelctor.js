import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux'

function useIntialSelector(id, reset = false) {
  const willMount = useRef(true)
  const [loader, setLoader] = useState(!reset)
  const {flag, loading, error, ...rest} = useSelector(state => state[id] || {})
  if (willMount.current) {
    setLoader(!reset)
    willMount.current = false
  }
  useEffect(() => {
    setLoader(loading)
  }, [loading])
  
  useEffect(() => {
    // if (!loading && !flag && !error){
    //   setLoader(true)
    // } else 
    if (loading) {
      setLoader(true)
    } else if (flag && !loading) {
      setLoader(false)
    } else if (error && !loading) {
      setLoader(false)
    } 
  }, [flag])

  return {...rest, flag, error: false, loading: reset ? loading : loader}
}

export default useIntialSelector