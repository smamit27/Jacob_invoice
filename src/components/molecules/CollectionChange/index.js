import { parse } from 'query-string'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { Loader } from '../../atoms'
import { setCollectionIdAction } from './logic'

function CollectionChange({ height = '90vh', children }) {
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const dispatch = useDispatch()
  const { collectionId = -1 } = parse(location.search)
  useEffect(() => {
    if (collectionId && collectionId !== -1) {
      dispatch(setCollectionIdAction(parseInt(collectionId, 10) || 0))
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 800);
    }
  }, [collectionId, setLoading])

  return (
    <Loader loading={loading} style={{ height: height }} error={false} noData={collectionId === -1} noDataMessage="Please select a collection." >
      {children}
    </Loader>
  )
}

export default CollectionChange
