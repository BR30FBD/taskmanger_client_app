import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
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
export default function NavAppBar() {
  const [open, setOpen] = React.useState(false);
    const navigate=useNavigate()
    const handleLogout=()=>{
        sessionStorage.clear();
       navigate("/login");
    }
  return (
    <Box sx={{ flexGrow: 1 }} maxWidth="xl" >
      <AppBar  >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Button color="inherit" onClick={()=>setOpen(true)}>LogOut</Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2,color:'red' }}>
          Are you sure you want to Logout ?
          </Typography>
          <Button onClick={handleLogout} variant="contained" sx={{mt:2,background:"red"}}>Yes</Button>
          <Button onClick={()=>setOpen(false)} variant="contained" sx={{mt:2 ,ml:4}}>No</Button>
        </Box>
      </Modal>
    </Box>
  );
}
