import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'bottom',
    horizontal: 'left',
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
 

  return (
    <div className='z-30'>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message=''
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={props.alert} sx={{ width: '100%' }} className="font-body">
        {props.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}