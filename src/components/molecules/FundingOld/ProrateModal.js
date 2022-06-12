import { Modal, Box, styled, Button, Stack, Grid, FormControl, TextField, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import { groupBy as rowGrouper, uniqBy } from 'lodash'
import { useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format';
import useIntialSelector from '../../../hooks/useIntialSelctor'
import Label from '../../atoms/Label'
import { Loader, ModalTitle } from '../../atoms';
import { fundingSourceListAction } from './logic'
import { generateRandomString } from "../../../helpers"
import { PRORATE_COLUMNS } from './constants';
import { getUniqueIdFromApi } from '../../../services/httpService'

const getGroupData = (dat) => {
  const group = rowGrouper(dat, 'GROUP_PERCENTAGE_ID')
  return Object.keys(group)
}

const LabelComponent = ({ children, title, xs = 12, sm = 12, md = 6, lg = 6 }) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} >
    <FormControl fullWidth >
      <Label>{title}</Label>
      {children}
    </FormControl>
  </Grid>
)

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function ProrateModal({ open, onClose, prorateData = {}, onSave }) {
  const { loading, error, data: sources } = useIntialSelector('fundingSourceList')
  const {data = [], detail = {}, sourceName = ''} = prorateData
  const [rowsData, setRowsData] = useState(data)
  const [expandedGroupIds, setExpandedGroupIds] = useState(new Set(getGroupData(data)))
  const [input, setInput] = useState('')
  const [task, setTask] = useState([])
  const [errorSource, setErrorSource] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      const { params } = prorateData
      dispatch(fundingSourceListAction(params))
    }
  }, [open])

  const onRowDelete = (row) => {
    const newData = [...rowsData].filter(d => d.tableRowId !== row.tableRowId)
    const group = rowGrouper(newData, 'GROUP_PERCENTAGE_ID')
    const temp = []
    Object.keys(group).forEach(d => {
      group[d].forEach((z, i) => {
        temp.push({
          ...z,
          PRIORITY: i + 1
        })
      })
    })
    checkExistingSource(temp)
    setRowsData(temp)
  }
  const onPercentChange = (val) => {
    setInput(val?.value)
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTask(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const getTotal = (newData = rowsData) => {
    const temp = uniqBy(newData, 'GROUP_PERCENTAGE_ID').map(d => d.PERCENTAGE)
    return temp.reduce((prev, val) => prev + Number(val), 0)
  }

  const checkExistingSource = (newData = rowsData) => {
    const total = getTotal(newData)
    if (total === 100) {
      if (newData.some(d => d.FUNDING_SOURCE_ID === detail.PRIMARY_FUNDING_SOURCE_ID)) {
        setErrorSource('')
      } else {
        setErrorSource(`Some percent* needs to be allocated for ${sourceName} funding source.`)
      }
    } else {
      setErrorSource('Overall allocated % should be 100%')
    }
  }

  const onAdd = async () => {
    const id = await getUniqueIdFromApi('/GetFundingSourcePercentSeq', 'FUNDING_SOURCE_PERCENT_ID')
    const temp =  sources.filter(d => task.includes(d.ID)).map((d, i) => ({
      ...detail,
      GROUP_PERCENTAGE_ID: id,
      IS_PRORATE_YN: 'Y',
      FUNDING_SOURCE_ID: d.ID,
      tableRowId: generateRandomString(),
      PERCENTAGE: input,
      FUNDING_SOURCE_NAME: d.DESCRIPTION,
      PRIORITY: i + 1
    }))
    const newData = [...rowsData, ...temp]
    checkExistingSource(newData)
    setRowsData(newData)
    setExpandedGroupIds(new Set(getGroupData(newData)))
    setInput('')
    setTask([])
  }

  const saveClick = () => {
    onSave(rowsData, detail)
    onClose()
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='prorate-funding' >Prorate Funding</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <FormContent>
          <Box m={3} >
            <Grid container spacing={3} sx={{ alignItems: 'flex-end' }} >
              <LabelComponent lg={3} md={3} title="Funding %" >
                <NumberFormat size="small" placeholder="Enter Funding %" suffix="%" value={input || ''} onValueChange={onPercentChange} autoFocus customInput={TextField} />
              </LabelComponent>
              <LabelComponent lg={7} md={7} title="Funding Source" >
                <Select size="small" multiple displayEmpty value={task} onChange={handleChange} input={<OutlinedInput placeholder="Select Funding Source (s)" />} renderValue={(selected) => (selected.length === 0 ? (<span>Select Funding Source (s)</span>) : sources.filter(d => selected.includes(d.ID)).map(d => d.DESCRIPTION).join(', '))} MenuProps={MenuProps}>
                  {sources.map((d, i) => (
                    <MenuItem disabled={rowsData.findIndex(z => z.FUNDING_SOURCE_ID === d.ID) !== -1} key={i} value={d.ID}>
                      <Checkbox disabled={rowsData.findIndex(z => z.FUNDING_SOURCE_ID === d.ID) !== -1} checked={task.indexOf(d.ID) > -1} />
                      <ListItemText primary={d.DESCRIPTION} />
                    </MenuItem>
                  ))}
                </Select>
              </LabelComponent>
              <LabelComponent lg={2} md={2} sm={4} xs={4} title="" >
                <Button disabled={!input || !task?.length || Number(input) > 100} size="small" onClick={onAdd} variant="contained" >Add</Button>
              </LabelComponent>
            </Grid>
            <Box mt={3} mb={1.5} >
              <DataGrid
                className='rdg-header-white'
                rowHeight={40}
                noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
                headerRowHeight={40}
                rowKeyGetter={row => row.tableRowId}
                otherFunctions={{ onRowDelete }}
                columns={PRORATE_COLUMNS}
                style={{ height: 'calc(90vh - 126px - 10.5em)' }}
                rows={rowsData}
                groupBy={['GROUP_PERCENTAGE_ID']}
                rowGrouper={rowGrouper}
                expandedGroupIds={expandedGroupIds}
                onExpandedGroupIdsChange={setExpandedGroupIds}
                defaultColumnOptions={{ resizable: true }}
                summaryRows={[{ total: getTotal() }]}
              />
            </Box>
          </Box>
        </FormContent>
        <Footer>
          <Stack width="100%" alignItems='center' flexDirection='row' justifyContent='space-between' >
            <div >
              {errorSource && <span style={{ color: '#D72850' }} >{errorSource}</span>}
            </div>
            <Stack spacing={2} direction="row" justifyContent="flex-end" >
              <Button type="button" onClick={onClose} >Cancel</Button>
              <Button disabled={getTotal() !== 100 || errorSource} variant="contained" onClick={saveClick} >Save</Button>
            </Stack>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ProrateModal

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '60%',
  height: '90vh',
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


const FormContent = styled('div')({
  height: 'calc(90vh - 80px - 3em)',
  overflow: 'auto'
})
