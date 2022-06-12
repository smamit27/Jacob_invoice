import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import style from "styled-components";
import { Button } from "../../atoms";
import { colors } from "../../../theme";
import {CreateCollectionModalClose} from '../../../redux/common/action'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
    
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-paperWidthSm': {
    width:'328px'
  }
}));
const Footer = style.div`
display: flex;
align-items: flex-end;
justify-content: flex-end;
margin-right:10px;
margin-bottom: 10px;

`;
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle style={{color: '#000000',fontWeight: 700}}  sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ExitModal(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    props.setOpen(false);
  };
  const exitModal=() => {
    dispatch(CreateCollectionModalClose(true))
    props.setOpen(false);
  }

  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" data-testid="exit-create-new-collection">
            Exit create new collection?
        </BootstrapDialogTitle>
        
        <DialogContent dividers>
          <Typography gutterBottom>
          Are you sure you want to exit create new collection? Your configurations will not be saved if you exit.
          </Typography>
        </DialogContent>
        <DialogActions>
        <Footer>
        <div  onClick={handleClose}>
        <Button text="Cancel" padding="15px 20px 15px 20px" bg={colors.transparent} color={colors.black} >
        </Button>
        </div>
        <div  onClick={exitModal}>
        <Button text="Exit" bg={colors.blue} padding="15px 20px 15px 20px" color={colors.white} >
            
        </Button>
        </div>
        </Footer>
        
          
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}