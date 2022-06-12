import { Modal, Box, styled, Button, Stack, Grid, IconButton, Tabs, Tab } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stringify } from 'query-string'
import DataGrid from 'react-data-grid'
import { fundingBudgetSummaryModalCloseAction, getFundingBudgetSummaryTableAction, getFundingBudgetSummaryTableFlagResetAction, getFundingBudgetSummaryTableResetAction, saveFundingBudgetSummaryTableAction, saveFundingBudgetSummaryTableResetAction, getFundingBudgetSummaryTotalAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader, ModalTitle } from '../../atoms';
import { CLIENT_COLUMNS, PROJECT_COLUMNS } from './constants';
import useLazyLoad from '../../../hooks/useLazyLoad'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import ColumnFilter from '../../atoms/Filters'
import useColumns from '../../../hooks/useColumns'
import { useHistory } from 'react-router'
import { generateRandomString } from '../../../helpers'

function a11yProps(index) {
  return {
    id: `summary-${index}`,
    'aria-controls': `summarypanel-${index}`,
  };
}

const API_URL = {
  0: '/GetFundingBudgetSummary',
  1: '/GetFundingBudgetClientProjectGroupSummary'
}

const API_URL_SAVE = {
  0: '/SaveFundingBudgetingPercentage',
  1: '/SaveFundingBudgetingClientProjectPercentage'
}

const API_URL_TOTAL = {
  0: '/GetFundingBudgetSummaryTotal',
  1: '/GetClientProjectGroupSummaryTotal'
}

function FundingBudgetSummary() {
  const history = useHistory()
  const { open, data: modalData } = useSelector(state => state.fundingBudgetSummaryModal)
  const { flag: saveTableFlag, error: saveTableError } = useSelector(state => state.saveFundingBudgetSummaryTable)
  const { data, loading, error, flag } = useIntialSelector('getFundingBudgetSummaryTable')
  const { data: total } = useSelector(state => state.getFundingBudgetSummaryTotal)
  const collectionId = useSelector(state => state.getCollectionId)
  const [tab, setTab] = useState(0)
  const [saveData, setSaveData] = useState([])
  const {headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData, setColumnsData} = useColumns({ columns: tab === 0 ? PROJECT_COLUMNS : CLIENT_COLUMNS, handleFiltersChange, local: true })
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionId: collectionId, ...filterParams },
    url: API_URL[tab],
    rows: data,
    pageSizeKey: 'PageSize',
    pageIndexKey: 'PageIndex'
  })
  const dispatch = useDispatch()
  const prevSaveData = useRef([])

  useEffect(() => {
    if (open) {
      handleApiCall(tab)
    } else {
      dispatch(getFundingBudgetSummaryTableResetAction())
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(getFundingBudgetSummaryTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveFundingBudgetSummaryTableResetAction())
    }
  }, [saveTableError])

  useEffect(() => {
    if (saveTableFlag) {
      setSaveData([])
      dispatch(saveFundingBudgetSummaryTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveTableFlag])

  function handleApiCall (val) {
    dispatch(getFundingBudgetSummaryTableAction({ 
      url: API_URL[val], params: { 
        CollectionId: collectionId,
        PageSize: 20,
        PageIndex: 0,
        ...(filterParams?.localFilter ? { LocalFilter: filterParams?.localFilter } : {})
      } 
    }))
    dispatch(getFundingBudgetSummaryTotalAction({
      url: API_URL_TOTAL[val], params: { 
        CollectionId: collectionId, ...(filterParams?.localFilter ? { Filter: filterParams?.localFilter } : {})
      }
    }))
    prevSaveData.current = []
    setSaveData([])
    resetFrom()
  }
  function handleFiltersChange () {
    handleApiCall(tab)
  }

  const onTabChange = (val) => {
    setTab(val)
    setColumnsData(val === 0 ? PROJECT_COLUMNS : CLIENT_COLUMNS)
    clearFilters()
    if (!filtersData.length) {
      handleApiCall(val)
    }
  }

  const getChange = (row) => {
    const oldSaveData = [...prevSaveData.current]
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      row
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }

  const onRefresh = () => {
    handleApiCall(tab)
  }
  const onSave = () => {
    dispatch(backDropLoaderOpenAction())
    dispatch(saveFundingBudgetSummaryTableAction({
      url: API_URL_SAVE[tab],
      data: saveData.map(d => ({
        ...(d.PROJECT_ID && tab === 0 ? { projecT_ID: d.PROJECT_ID } : {}),
        ...(d.GROUP_NAME && tab === 1 ? { clienT_PROJECT_GROUP: d.CLIENT_PROJECT_GROUP } : {}),
        percentage: Number(d.PERCENTAGE_FUNDS_USED)
      })),
      params: {
        CollectionID: collectionId
      }
    }))
  }

  const onClose = () => dispatch(fundingBudgetSummaryModalCloseAction())

  const onClear = () => {
    clearFilters()
  }

  const onLinkClick = (project) => {
    const fil = project.map(d => ({
      key: 'PROJECT_NUMBER',
      value: d,
      id: generateRandomString()
    }))
    const params = stringify({
      collectionId,
      moduleId: 2,
      filters: JSON.stringify(fil)
    })
    onClose()
    history.push(`?${params}`)
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='funding-budget-summary' >Funding and Budget Summary</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box m={2} className='fundingBudgetTabs'>
            <Tabs indicatorColor="primary" style={{ marginBottom: 10 }} value={tab} onChange={(e, val) => onTabChange(val)} aria-label="Funding and Budget Summary">
              <Tab sx={{ textTransform: 'capitalize' }} label="Projects" {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'capitalize' }} label="Client Project Groups" {...a11yProps(1)} />
            </Tabs>
            <Grid container flexWrap="wrap">
              <Grid item  sm lg md xs >
                {/* <Button disabled={!filtersData.length} variant="contained" color="secondary" onClick={onClear} >Clear Filters</Button> */}
              </Grid>
              <Grid item alignSelf="flex-end" >
                <Stack spacing={2} direction="row" >
                  {/* <Button size="small" variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button> */}
                  <Button disabled={!saveData.length} size="small" variant="contained" onClick={onSave} >Save</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box ml={3} mr={3} mb={3} className="fundingBudget_table">
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }}>
            <DataGrid
              className='rdg-header-white'
              style={{height: 'calc(95vh - 130px - 11em)' }} 
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              onRowsChange={setRowsData}
              otherFunctions={{ getChange, onLinkClick, collectionId }}
              columns={headerColumns}
              onScroll={handleScroll}
              rows={rowsData}
              summaryRows={total}
            />
          </Loader>
          </Box>
          {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button size="small" onClick={onClose} >Cancel</Button>
            <Button size="small" onClick={onClose} variant="contained">Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default FundingBudgetSummary


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  height: '95vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  borderBottom: '1px solid #E1E1E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%'
})

const Footer = styled('div')({
  padding: '1.2em 1.5em',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  borderTop: '1px solid #E1E1E1',
  width: '100%'
})


const TableContent = styled('div')({
  height: 'calc(95vh - 130px)',
  overflow: 'auto'
})

const ProjectCell = styled('div')({
  color: '#231EDC',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
})