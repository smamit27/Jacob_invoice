import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, DialogContentText, Divider } from '@mui/material';
import { ModalTitle } from '../../atoms'

export default function AlertModal({ children, title = '', open, onClose, onConfirm, confirmText = 'Delete',widthSize='sm' }) {
  return (
    <Dialog open={open} maxWidth={widthSize}>
      <DialogTitle id="alert-dialog-title">
        <ModalTitle>{title}</ModalTitle>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {onConfirm && <Button onClick={onConfirm} variant="contained">
          {confirmText}
        </Button>}
      </DialogActions>
    </Dialog>
  );
}