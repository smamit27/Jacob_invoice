import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import style from "styled-components";
import { SearchCollectionModal,SearchContractorModal,SearchProjectNumberModal,SearchProjectManagerModal } from "../Modal";
import { selectedSearchCode,selectedAllianceCode,selectedProjectNumberCode } from '../../../redux/common/action'
import {AllianceCode} from '../Steppar/index';
import ContractorCeiling from "../ContractorCeilings/index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-root":{
    maxWidth: '80%'
  },
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paperWidthSm": {
    width: "100%",
    maxWidth: '800px'
  },
}));
const Footer = style.div`
display: flex;
align-items: flex-end;
justify-content: flex-end;
margin-right:10px;
margin-bottom: 10px;`;

export default function SearchModal(props) {
  const {open,setOpen,openModal,setOpenModal} = props;  
  const { showSearchModal } = useSelector(({ common }) => common);

  const onClose = () => {
   setOpenModal("")
    setOpen(false)
  }
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >       
        {showSearchModal === 'similar' && <SearchCollectionModal open={open} setOpen={setOpen}/>}
        {showSearchModal === 'projectmanager' && <SearchProjectManagerModal setOpen={setOpen}/>}

        {showSearchModal === 'contractor' && <SearchContractorModal setOpen={setOpen}/>}
      </BootstrapDialog>
      
      {openModal === 'alliance_code' && <AllianceCode open={openModal === 'alliance_code'} onClose={onClose} />}

      {openModal === 'projectnumber' && <SearchProjectNumberModal open={openModal === 'projectnumber'} onClose={onClose}/>}
      {openModal === 'contractor_ceiling' && <ContractorCeiling open={openModal === 'contractor_ceiling'} onClose={onClose}/>}

    </div>

  );
}
