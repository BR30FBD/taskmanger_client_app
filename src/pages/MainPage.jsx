import React, { useEffect } from 'react'
import NavAppBar from '../components/NavBar'
import TaskListTable from '../components/TaskListTable'
import { Box, Button } from '@mui/material'
import AddTaskModal from '../components/AddTaskModal'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getTasks } from '../features/task/taskSlice'
import LoaderPage from '../components/Loader'

const MainPage = () => {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const [task, setTask] = React.useState({});
      const dispatch = useDispatch();
      const { tasks, loading, error } = useSelector((state) => state.tasks);
      useEffect(() => {
        dispatch(getTasks());
      }, [dispatch]);
      const handleRefetch = () => {
        dispatch(getTasks());
      };
    
  return (
    <>
   {loading && <LoaderPage />}
        <NavAppBar />
        <div style={{marginTop:'100px'}}>
          <Box sx={{display: 'flex', alignItems: 'center' ,justifyContent: 'end'}}>

          <Button variant="contained" mt={20}   color="primary" onClick={handleOpen}>Add Task</Button>

          </Box>
       {tasks?.length>0 ? <TaskListTable data={tasks} setTask={setTask} handleRefetch={handleRefetch} setOpen={setOpen} />:
       <h1>No Tasks Found</h1>
       }
        <AddTaskModal handleClose={handleClose} open={open} data={task} handleRefetch={handleRefetch}  />
        </div>
    </>
  )
}

export default MainPage