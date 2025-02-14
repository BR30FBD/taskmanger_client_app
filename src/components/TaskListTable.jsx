import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import AlertModal from "./AlertModal";

export default function TaskListTable({data, setTask, setOpen, handleRefetch}) {
  const [tasks, setTasks] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [page, setPage] = useState(0); // State to manage current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // State to manage rows per page

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // Handle Drag and Drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    handleOpen();
    setSelectedId(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset page to 0 when rows per page changes
  };

  useEffect(() => {
    setTasks(data);
  }, [data]);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            mt: 3,
            boxShadow: 3,
          }}
        >
          <Table aria-label="draggable task table">
            {/* Table Header */}
            <TableHead>
              <TableRow sx={{backgroundColor: "#f5f5f5"}}>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>S.No</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Title</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Description</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Status</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Created At</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Updated At</TableCell>
                <TableCell sx={{fontWeight: "bold", color: "#333333"}}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body with Drag & Drop */}
            <Droppable droppableId="tasks">
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks?.length>0 ? tasks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <TableRow
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              backgroundColor: snapshot.isDragging ? "#f4f4f4" : "inherit",
                            }}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>{new Date(task.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(task.updatedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => handleEditTask(task)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: "10px" }}
                                onClick={() => handleDelete(task._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    )):
                  <p>No tasks found</p>
                    }
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={tasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </DragDropContext>

      <AlertModal
        open={openModal}
        handleClose={handleClose}
        id={selectedId}
        handleRefetch={handleRefetch}
      />
    </>
  );
}
