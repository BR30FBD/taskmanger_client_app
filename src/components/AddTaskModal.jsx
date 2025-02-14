import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addTask, getTasks, updateTask } from "../features/task/taskSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddTaskModal({ handleClose, open,data,handleRefetch }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  // Handle Submit with Validation
  const handleSubmit = () => {
    let validationErrors = {};
    if (!formData.title.trim()) validationErrors.title = "Title is required";
    if (!formData.description.trim()) validationErrors.description = "Description is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if(data?._id){
        const obj={
            title:formData.title,
            description:formData.description,
            status:formData.status,
        }
      dispatch(updateTask({formData:obj, handleCancel,handleRefetch, id:data._id}));
    }else{
        const newTask =formData;
        dispatch(addTask({formData:newTask, handleCancel,handleRefetch}));
       
    }
  
  };
  const handleCancel=()=>{
    setFormData({
      title: "",
      description: "",
    })
    handleClose();
  }
useEffect(() =>{
    if(data?._id){
        setFormData(data)
    }

},[data])
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleCancel}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
           {formData?._id ? "Update Task" : "Add New Task"}
          </Typography>

          {/* Title Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />

          {/* Description Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />
        {formData?._id &&       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData?.status}
          label="status"
          name="status"
          onChange={handleChange}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>}

          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2,margin: '10px'}}
            onClick={handleCancel}
          >
            Cancel
          </Button>
         {data?._id ? <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2,margin: '10px'}}
            onClick={handleSubmit}
          >
            Update
          </Button> : <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2,margin: '10px'}}
            onClick={handleSubmit}
          >
            Submit
          </Button>}
          </Box>
         
        </Box>
      </Fade>
    </Modal>
  );
}
