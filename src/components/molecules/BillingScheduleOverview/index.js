import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBillingScheduleAction ,getBillingScheduleResetAction} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {columns, formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import useLazyLoad from '../../../hooks/useLazyLoad'
import { SEARCH_BILLING_SCHEDULE } from './constants'



function BillingScheduleOverview(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('getBillingScheduleReducer')
  const collectionId = useSelector(state => state.getCollectionId)
  const [selectedProjectNum, setSelectedProjectNum] = useState([])
 
//   const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
//     params: {
//       collectionID: collectionId,
//       moduleId: props.moduleId || 11,
//       isOld: 'Y',
//       orderBy: 1,
//     },
//     url: '/GetBillingScheduleOverview',
//     rows: data
   
//   })

  useEffect(() => {
    dispatch(getBillingScheduleAction({
      collectionID: collectionId,
      orderBy: 1,
      pageIndex: 1,
      pageSize: 100,
    }))
  }, [])

  useEffect(() => {
    if (flag) {
        setSelectedProjectNum(data)
        dispatch(getBillingScheduleResetAction())
    }
  }, [flag])

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
              <Button variant="contained"  >Data Refresh</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
      {selectedProjectNum.length > 0 && (

      <DataGrid
      style={{height: 'calc(80vh*(9/13))' }} 
                  rowHeight={40}
                  headerRowHeight={60}
                  rowKeyGetter={row => row.PROJECT_NUMBER}
                  columns={[
                    ...SEARCH_BILLING_SCHEDULE]}
                  rows={selectedProjectNum}
                />
      )}
      </Stack>
     
    </div>
  )
}

export default memo(BillingScheduleOverview)
