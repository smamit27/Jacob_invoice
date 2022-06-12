import React, {useState, useRef, useEffect} from 'react'
import { apiCall } from '../services/httpService'
import { generateRandomString } from '../helpers'

function isAtBottom({ currentTarget }) {
  return currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;
}

function useLazyLoad({ method = 'get', url, data, params = {}, from = 1, size = 20, rowAdditionalData = {}, rows = [], pageIndexKey = 'pageIndex', pageSizeKey = 'pageSize' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [PageIndex, setPageIndex] = useState(from)
  const [rowsData, setRowsData] = useState(rows)
  const isEnd = useRef(false)
  async function handleScroll(event) {
    if (isLoading || !isAtBottom(event) || isEnd.current) return;
    setIsLoading(true);
    try {
      const response = await apiCall({
        method,
        url,
        data,
        params: {
          ...params,
          [pageIndexKey]: PageIndex,
          [pageSizeKey]: size
        }
      })
      if (response && response?.length) {
        setPageIndex(PageIndex + 1)
        setRowsData([...rowsData, ...response.map(d => ({ ...d, tableRowId: generateRandomString(), ...rowAdditionalData }))]);
      } else {
        isEnd.current = true
      }
    } catch (error) {
      isEnd.current = true
    }
    setIsLoading(false);
  }
  function resetFrom () {
    setPageIndex(from)
    isEnd.current = false
  }
  return {
    handleScroll,
    isLoadingMore: isLoading,
    resetFrom,
    rowsData,
    setRowsData
  }
}

export default useLazyLoad