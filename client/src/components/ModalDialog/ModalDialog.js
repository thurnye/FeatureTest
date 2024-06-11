import React from 'react';
import styles from './ModalDialog.module.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ModalDialog = ({ setOpen, open, children, title, size, fullScreen }) => {
  return (
    <div className={styles.ModalDialog}>
      <Dialog
        open={open}
        size={size}
        fullScreen={fullScreen}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        TransitionComponent={Transition}
      >
        {title && <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalDialog;
