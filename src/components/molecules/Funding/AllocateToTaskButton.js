import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { apiCall } from '../../../services/httpService'

function AllocateToTaskButton(props) {
  const collectionId = useSelector(state => state.getCollectionId)
  const {
    row = {},
    column = {},
    otherFunctions,
  } = props
  const {openAllocateToTask} = otherFunctions
  const { CLIENT_FUNDING_DETAILS_2_PHASE, CLIENT_FUNDING_DETAILS_1_ACRN, FUNDING_ALLOCATION_AMOUNT, FUNDING_ALLOCATION_SUBTOTAL_1, LEVEL_FLAG, AGREEMENT_ID, PROJECT_ID, FUNDING_SOURCE_ID } = row
  const handleAllocateToTaskButton = async () => {
    const updatedRow = {
      ...row
    }
    if (openAllocateToTask) {
      try {
          const [res = {}] = await apiCall({
            method: 'post',
            url: '/SaveFundingSource',
            params: {
              CollectionID: collectionId,
              AGREEMENTID: AGREEMENT_ID,
              PROJECTID: PROJECT_ID,
              FundingSourceID: FUNDING_SOURCE_ID || 0,
              FundingSourceName: `${CLIENT_FUNDING_DETAILS_1_ACRN}, ${CLIENT_FUNDING_DETAILS_2_PHASE}, $${FUNDING_ALLOCATION_SUBTOTAL_1 || FUNDING_ALLOCATION_AMOUNT}`,
            }
          })
          if (!FUNDING_SOURCE_ID && res?.FUNDING_SOURCE_ID) {
            updatedRow.FUNDING_SOURCE_ID = res?.FUNDING_SOURCE_ID
            openAllocateToTask(updatedRow, true)
          } else {
            openAllocateToTask(row)
          }
      } catch (error) {
        openAllocateToTask(row)
      }
    }
  }
  const checkDisabled = () => {
    if (LEVEL_FLAG === 'B') {
      return !FUNDING_ALLOCATION_AMOUNT || !CLIENT_FUNDING_DETAILS_1_ACRN || !CLIENT_FUNDING_DETAILS_2_PHASE
    } else if (LEVEL_FLAG === 'C') {
      return !FUNDING_ALLOCATION_SUBTOTAL_1 || !CLIENT_FUNDING_DETAILS_1_ACRN || !CLIENT_FUNDING_DETAILS_2_PHASE
    }
    return false
  }
  const getTitle = () => {
    if (LEVEL_FLAG === 'B') {
      return 'and Allocation Amount'
    } else if (LEVEL_FLAG === 'C') {
      return 'and Allocation Subtotal1'
    }
    return null
  }
  if ((row.INNER_LEVEL_FLAG === 'N' && row.LEVEL_FLAG === 'B') || row.LEVEL_FLAG === 'C') {
    return (
      <Button style={{ width: '100%' }} title={checkDisabled() ? `Client Funding Detail (ACRN), Client Funding Detail1 (Phase) ${getTitle()} need to be filled` : ''} disabled={checkDisabled()} onClick={handleAllocateToTaskButton} size="small" ><a className='allocateToTask'>Allocate to Task Groups</a></Button>
    )
  }
  return null
}

export default AllocateToTaskButton
