import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/task/taskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 4,
};

export default function AlertModal({open,id,handleClose,handleRefetch}) {
    const dispatch=useDispatch()
const handleDelete=()=>{
    dispatch(deleteTask({id:id,handleRefetch,handleClose}))
}

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2,color:'red' }}>
          Are you sure you want to delete this item?
          </Typography>
          <Button onClick={()=>handleDelete(id)} variant="contained" sx={{mt:2,background:"red"}}>Yes</Button>
          <Button onClick={handleClose} variant="contained" sx={{mt:2 ,ml:4}}>No</Button>
        </Box>
      </Modal>
    </div>
  );
}
