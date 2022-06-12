import { Modal, Box, styled, Button, Stack, ButtonGroup, Grid, TextField, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, IconButton, Tabs } from '@mui/material'
import React, { useEffect, useState, PureComponent } from 'react'
import { tableCellClasses } from '@mui/material/TableCell';
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css';
import { ImportCsv, ModalTitle, TableFilter } from '../../atoms';
import Tab from '@mui/material/Tab';
import './UserDefineFieldsStyles.css';

class SheetRenderer extends PureComponent {
  render () {
    const { className } = this.props
    return (
      <Box>
        <StyledTableContainer>
          <Table className={className} >
            <TableHead>
              <TableRow>
                <StyledTableCell className='read-only row-handle'>
                  Dropdown Options
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.children}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    )
  }
}

const RowRenderer = (props) => {
  const { children } = props
  return (
    <TableRow>
      { children }
    </TableRow>
  )
}


const CellRenderer = ({ children, className, selected, ...rest}) => {
  return (
    <StyledTableCell {...rest} selected={selected} size="small" className={selected ? "selected" : ""}>
      {children}
    </StyledTableCell>
  )
}

const DataEditor = (props) => {
  return props.value
}

const titleType = {
  New: 'Dropdown Options',
  Existing: 'Dropdown Options'
}

function ImportCopyViewOptions({ open, type, valueOptions = [], onClose, onSaveOptions }) {
  const dataOptions = Array.isArray(valueOptions) && valueOptions?.length ? valueOptions.map(d => [{ value: d }]) : null
  const [options, setOptions] = useState(dataOptions || [[{ value: 'Please select here and paste the dropdown options', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}]])
  const [filterOptions, setFilterOptions] = useState([])
  const [tab, setTab] = useState('Paste')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (open) {
      const tempOptions = Array.isArray(valueOptions) && valueOptions?.length ? valueOptions.map(d => [{ value: d }]) : null
      setOptions(tempOptions || [[{ value: 'Please select here and paste the dropdown options', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}]])
    }
  }, [open, valueOptions])

  const onUpload = (uploadData) => {
    setOptions(uploadData.filter((v, i, a) => a.indexOf(v) === i).map(d => ([{ value: d}])))
  }
  const onTabChange = (e, t) => {
    setOptions(t === 'Paste' ? [[{ value: 'Please select here and paste the dropdown options', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}], [{ value: '', dummy: true}]] : [])
    setTab(t)
  }
  const handleChanges = (changes, allChanges) => {
    const grid = options.map(row => [...row])
    changes.forEach(({cell, row, col, value}) => {
      if (grid[row] && grid[row][col] && value) {
        grid[row][col] = {...grid[row][col], value, dummy: false}
      }
    })
    if (allChanges) {
      allChanges?.forEach(({cell, row, col, value}) => {
        if (col === 0 && value) {
          grid[row] = [{value, dummy: false}]
        }
      })
    }
    setOptions(grid)
  }
  const onFilter = (val) => {
    if (val) {
      const filter = options.filter(d => {
        if (Array.isArray(d) && d[0] && d[0].value && d[0].value.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          return true
        }
        return false
      })
      setFilterOptions(filter)
    } else {
      setFilterOptions([])
    }
    setSearchText(val)
  }

  const onSave = () => {
    const temp = options.filter(d => {
      if (Array.isArray(d) && d[0] && d[0].value && !d[0].dummy) {
        return true
      }
      return false
    }).map(d => d[0].value)
    onSaveOptions(temp)
    onClose()
  }

  const disabled = !options?.length || options?.every(d => Array.isArray(d) && d?.length && d[0].dummy)

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='import-copy-udf' >{titleType[type || 'New']}</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <FormContent>
          {type === 'New' && <Stack m={2} direction="row" justifyContent="space-between" alignItems="center" >
            { <Box sx={{ borderBottom: 1, borderColor: 'divider' }} variant="outlined" >
              <Tabs value={tab} onChange={onTabChange} >
                <Tab style={{ width: 109,height:24, textTransform: 'capitalize'}} className='udf_tabs' value='Paste' label="Paste"/>
                <Tab style={{ width: 109,height:24, textTransform: 'capitalize'}} className='udf_tabs' value='Import' label="Import"/>
              </Tabs>
            </Box>}
            {tab !== 'Paste' && <ImportCsv onUpload={onUpload} />}
          </Stack>}
          <Stack m={2} >
            <TableFilter searchText={searchText} disabled={disabled} filterTitle="Filter dropdown options" onFilter={onFilter} />
          </Stack>
          <Stack m={2}>
            {!!options?.length && <ReactDataSheet data={searchText ? filterOptions : options} valueRenderer={(cell) => cell.value} sheetRenderer={SheetRenderer} rowRenderer={RowRenderer} cellRenderer={CellRenderer} dataEditor={DataEditor} onCellsChanged={handleChanges} />}
          </Stack>
        </FormContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
          <Button type="button" onClick={onClose} className='Close-Primary-buttons' variant="contained">Close</Button>
            {type === 'New' && <Button disabled={disabled} onClick={() => onSave()} variant="contained">Save</Button>}
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ImportCopyViewOptions

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
  height: '85vh',
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
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E6E6E6',
    color: '#444444',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  '& .data-editor': {
    height: 30,
    // boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    border: 0,
    width: '100%',
    margin: '10px'
  },
  '&.selected' : {
    border: '1px double #2185d0',
    boxShadow: 'inset 0 -100px 0 rgb(33 133 208 / 15%)'
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRight: '1px solid #E1E1E1',
  borderLeft: '1px solid #E1E1E1'
}))