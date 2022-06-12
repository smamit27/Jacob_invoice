import {useState} from 'react'
import { apiCall } from '../../../services/httpService';


function useGetProjects({ onFinish }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([])

  async function getProjects(group = 0, collectionId) {
    if (isLoading) return;
    setData([])
    setIsLoading(true);
    try {
      const response = await apiCall({
        method: 'get',
        url: '/GetFundBudgetClientProjectGroupModelProjects',
        params: {
          CollectionId: collectionId,
          GroupId: group
        }
      })
      if (response) {
        const res = response.map(d => d.PROJECT_NUMBER)
        setData(res);
        if (onFinish) {
          onFinish(res)
        }
      }
    } catch (error) {
      setData([])
      if (onFinish) {
        onFinish([])
      }
    }
    setIsLoading(false);
  }
  return {
    getProjects,
    data
  }
}

export default useGetProjects