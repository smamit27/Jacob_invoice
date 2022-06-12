import { Modal, Box, styled, Button, Stack, Chip, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchModal } from '../Modal';
import {
  showSearchModal,
  allianceCodeSearch,
  allianceCodeSearchSecond,
  allianceCodeSearchThird,
} from "../../../redux/common/action";
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import { saveProjectMappingByAllianceAction, saveProjectMappingByAllianceResetAction } from './logic';

function ByAllianceCode({ open = false, onClose = () => null }) {
  const {
    searchAllianceCode,
    searchAllianceCodeSecond,
    searchAllianceCodeThird,
  } = useSelector(({ common }) => common);
  const collectionId = useSelector(state => state.getCollectionId)
  const { flag: saveFlag, error: saveError } = useSelector(state => state.saveProjectMappingByAlliance)
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(allianceCodeSearch([]))
      dispatch(allianceCodeSearchSecond([]))
      dispatch(allianceCodeSearchThird([]))
    }
  }, [])
  useEffect(() => {
    if (saveFlag) {
      onClose()
      dispatch(saveProjectMappingByAllianceResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveFlag])
  useEffect(() => {
    if (saveError) {
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveError])

  const handleSearchModal = (type) => {
    setOpenSearchModal(true)
    dispatch(showSearchModal(type));
  }
  const handleDelete = (id, type) => {
    if (type === 'alliance') {
      const newList = searchAllianceCode.filter((item) => item.ID !== id);
      dispatch(allianceCodeSearch(newList))
    } else if (type === 'alliance_second') {
      const newList = searchAllianceCodeSecond.filter((item) => item.ID !== id);
      dispatch(allianceCodeSearchSecond(newList))
    } else if (type === 'alliance_third') {
      const newList = searchAllianceCodeThird.filter((item) => item.ID !== id);
      dispatch(allianceCodeSearchThird(newList))
    }
  }

  const onSave = () => {
    const payload = {
      collectioN_ID: collectionId,
      ...(searchAllianceCode && searchAllianceCode?.length ? { alliancE_CODE_1: searchAllianceCode.map(d => d.ID).join(', ') } : {}),
      ...(searchAllianceCodeSecond && searchAllianceCodeSecond?.length ? { alliancE_CODE_2: searchAllianceCodeSecond.map(d => d.ID).join(', ') } : {}),
      ...(searchAllianceCodeThird && searchAllianceCodeThird?.length ? { alliancE_CODE_3: searchAllianceCodeThird.map(d => d.ID).join(', ') } : {}),
      autO_ADD_PROJECT_COLLECTION: [...searchAllianceCodeThird, ...searchAllianceCode, ...searchAllianceCodeSecond].some(d => d.ISCHECKED === 'Y') ? 'Y' : 'N'
    }
    dispatch(backDropLoaderOpenAction())
    dispatch(saveProjectMappingByAllianceAction(payload))
  }


  const disabled = !searchAllianceCode.length && !searchAllianceCodeSecond.length && !searchAllianceCodeThird.length

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle data-testid='assign-alliance-code' >Assign by alliance code(s)</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent>
          <Stack m={3} spacing={2} >
            <div>How do you want to assign projects to the collection?</div>
            <Stack spacing={3} >
              <div>
                <Label>Alliance code 1</Label>
                <Stack spacing={1} >
                  <Button onClick={() => handleSearchModal('alliance')} style={{ width: 100 }} variant="contained" color="secondary" size="small" >Select</Button>
                  <div>
                    {searchAllianceCode.map((code,index)=> (
                      <Chip style={{ marginBottom: 8, marginRight: 8 }} key={code.ID} label={code.DESCRIPTION} variant="outlined" onDelete={() => handleDelete(code.ID, 'alliance')} />
                    ))}
                  </div>
                </Stack>
              </div>
              <div>
                <Label>Alliance code 2</Label>
                <Stack spacing={1} >
                  <Button onClick={() => handleSearchModal('alliance_second')} style={{ width: 100 }} variant="contained" color="secondary" size="small" >Select</Button>
                  <div>
                    {searchAllianceCodeSecond.map((code,index)=> (
                      <Chip key={code.ID} label={code.DESCRIPTION} variant="outlined" onDelete={() => handleDelete(code.ID, 'alliance_second')} />
                    ))}
                  </div>
                </Stack>
              </div>
              <div>
                <Label>Alliance code 3</Label>
                <Stack spacing={1} >
                  <Button onClick={() => handleSearchModal('alliance_third')} style={{ width: 100 }} variant="contained" color="secondary" size="small" >Select</Button>
                  <div>
                    {searchAllianceCodeThird.map((code,index)=> (
                      <Chip key={code.ID} label={code.DESCRIPTION} variant="outlined" onDelete={() => handleDelete(code.ID, 'alliance_third')} />
                    ))}
                  </div>
                </Stack>
              </div>
            </Stack>
          </Stack>
          {openSearchModal && <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />}
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onSave} disabled={disabled} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ByAllianceCode


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '40%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  // background: '#555555',
  // color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  borderBottom: '1px solid #E1E1E1',
  width: '100%'
})

const HeaderTitle = styled('div')({
  color: '#222222',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '24px',
  fontFamily: " Jacobs Chronos Bold"
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
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})

const Label = styled('label')({
  fontSize: '14px',
  lineHeight: '24px',
  marginBottom: '10px',
  fontWeight: 400
})