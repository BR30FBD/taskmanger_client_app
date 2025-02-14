import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { REACT_APP_API_URL } from "../../constant";

const API_URL = `${REACT_APP_API_URL}/api/tasks`;

// **Get Auth Token**
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token"); // Retrieve token from localStorage
  console.log("token",token);
  return {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token in the headers
    },
  };
};

// **1. Get All Tasks**
export const getTasks = createAsyncThunk("api/tasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch tasks");
  }
});

// **2. Add New Task**
export const addTask = createAsyncThunk("tasks/addTask", async ({formData,handleCancel,handleRefetch}, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, formData, getAuthHeaders());
    handleCancel();
    toast.success("Task added successfully!");
    handleRefetch();
    return response.data;
  } catch (error) {
    toast.error("Failed to add task");
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to add task");
  }
});

// **3. Update Task**
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ id, formData,handleCancel,handleRefetch }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, getAuthHeaders());
    handleCancel();
    handleRefetch();
    toast.success("Task updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update task");
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to update task");
  }
});

// **4. Delete Task**
export const deleteTask = createAsyncThunk("tasks/deleteTask", async ({id,handleRefetch,handleClose}, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    toast.success("Task deleted successfully!");
    handleRefetch();
    handleClose()
    return id;
  } catch (error) {
    toast.error("Failed to delete task");
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete task");
  }
});

// **Task Slice**
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Get Tasks**
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // **Add Task**
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // **Update Task**
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // **Delete Task**
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
