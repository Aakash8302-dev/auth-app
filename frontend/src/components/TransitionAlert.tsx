import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

interface Props{
  info: {
    severity: "error" | "warning" | "info" | "success" | undefined,
    message: string,
    open: boolean,
  },
}

export default function TransitionAlert(props:Props) {

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={props.info.open} >
        <Alert
          severity={props.info.severity}
          // action={
          //   <IconButton
          //     aria-label="close"
          //     color="inherit"
          //     size="small"
          //     onClick={() => {
          //       setOpen(false);
          //     }}
          //   >
          //     <CloseIcon fontSize="inherit" />
          //   </IconButton>
          // }
          sx={{ mb: 2 }}
        >
          {props.info.message}
        </Alert>
      </Collapse>
      {/* <Button
        disabled={props.open}
        variant="outlined"
        onClick={() => {
          props.setOpen(true);
        }}
      >
        Re-open
      </Button> */}
    </Box>
  );
}