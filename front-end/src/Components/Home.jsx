import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
  Modal,
  Stack,
} from "@mui/material";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  getTask,
  setRemainder,
  updateTask,
} from "../actions/userActions";
import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import { format } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import moment from "moment"; // import moment library for handling dates
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useFormik } from "formik";
import { addTaskSchema } from "../schema/validation";
import { axiosUserInstance } from "../utility/axios";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const  initialTaskValues={
  title:"",
  description:"",
}

const Home = () => {
  ///////////////////////////////////////////////////
//  const [tasks, setTasks] = useState([]);
  const { tasks, pendingTasks, totalTasks } = useSelector(
    (state) => state.getTask
  );
  const { addTaskSuccess } = useSelector((state) => state.addTask);
  const { updateSuccess } = useSelector((state) => state.updateTask);
  const { deleteTaskSuccess } = useSelector((state) => state.deleteTask);
  const { addRemainderSuccess } = useSelector(
    (state) => state.addRemainderTask
  );
  console.log(addTaskSuccess);

  const dispatch = useDispatch();

  

  ///////////////////task validation//////////////////////////
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialTaskValues,
      validationSchema: addTaskSchema,
      onSubmit: (values) => {
        submitHandler();

        console.log(values);
      },
    });
        console.log(errors);


  ////////////////////////////////////////////////////////////

  /////////////////add task start////////////////////
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = async () => {
    const taskData = { title:values.title, description:values.description, startDate, endDate };
    // Handle form submission here

    dispatch(addTask(taskData, tasks));
    handleClose();
    console.log({
      title: values.title,
      description: values.description,
      startDate,
      endDate,
    });
    setOpen(false);
  };

  const handleDateChange = (item) => {
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };

  //////////////////add task end///////////////////////////

  ///////////////////update task start/////////////////////
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState(new Date());
  const [editEndDate, setEditEndDate] = useState(new Date());

  const editHandleClose = () => {
    setEditOpen(false);
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleEditDateChange = (item) => {
    setEditStartDate(item.selection.startDate);
    setEditEndDate(item.selection.endDate);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: editTitle,
      description: editDescription,
      startDate: editStartDate,
      endDate: editEndDate,
      progress,
    };
    console.log(updatedTask);
    dispatch(updateTask(id, updatedTask));
    //  // resetHandler();
    editHandleClose();
  };

  const [progress, setProgress] = useState("");
  const [id, setId] = useState("");
  const editHandleOpen = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      //  setEditStartDate(task.startDate);
      //  setEditEndDate(task.endDate);
      setProgress(task.progress);
      setId(id);
    }
    setEditOpen(true);
  };

  ///////////////////update task end/////////////////////

  //////////////////set remainder start/////////////////

  const [remainder, onChange] = useState(new Date());

  const [remainderOpen, setRemainderOpen] = useState(false);
  const remainderHandleOpen = (id) => {
    setId(id);
    setRemainderOpen(true);
  };

  const handleRemainderSubmit = async () => {
    const taskData = { remainder };

    dispatch(setRemainder(id, taskData));

    setRemainderOpen(false);
  };

  const remainderHandleClose = () => {
    setRemainderOpen(false);
  };

  ///////////////////set remainder end////////////////////////////////

  ///////////task delete start////////////////////////

  const handleDelete = async (id, tasks) => {
    await dispatch(deleteTask(id, tasks));
  };

  ////////////task delete end//////////////////////

  //////////////////task remainder start////////////////

  function TaskList({ tasks }) {
    useEffect(() => {
      const intervalId = setInterval(() => {
        checkReminders();
      }, 60000); // check reminders every minute

      return () => clearInterval(intervalId); // clear interval on unmounting the component
    }, []); // run the effect only on component mounting

    const checkReminders = () => {
      const now = moment();
      tasks.forEach((task) => {
        console.log(task.setRemainder);
        const remainderDateTime = moment.utc(task.setRemainder);
        console.log(remainderDateTime);
        if (remainderDateTime.isSame(now, "minute")) {
          toast.error(`Remainder for task "${task.title}"`);
        }
      });
    };
  }

  //////////////////task remainder End////////////////

  ////////////pagiantion/////////////
  
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(3);
  const { userInfo } = useSelector((state) => state.userLogin);

   useEffect(() => {
     const fetchData = async () => {
      //  const config = {
      //    headers: {
      //      "Content-Type": "application/json",
      //      Authorization: `Bearer ${userInfo.token}`,
      //    },
      //  };
      //  const response = await axiosUserInstance.get(
      //    `/tasks/${page}/${limit}`,
      //    config
      //  );
       dispatch(getTask(page, limit));
       //  setTasks(response.data.result);
     };

     fetchData();
   }, [
     dispatch,
     page,
     limit,
     addTaskSuccess,
     updateSuccess,
     addRemainderSuccess,
     deleteTaskSuccess,
     userInfo.token,
   ]);
  //////////////////////////////////

  //////////////////////////////////////
//  useEffect(() => {
//    dispatch(getTask(page, limit));
//  }, [
//    dispatch,
//    addTaskSuccess,
//    updateSuccess,
//    addRemainderSuccess,
//    deleteTaskSuccess,
//  ]);

  //////////////////////////////////////

  return (
    <>
      <Box sx={{ minHeight: "100vh", padding: 0 }}>
        <Toaster toasterOptions={{ duration: 8000 }} />
        <Box
          sx={{
            bgcolor: "#E9E8E8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100px",
          }}
        >
          <TaskList tasks={tasks} />
          <Typography
            variant="h5"
            fontWeight={200}
            my={1}
            textAlign="center"
            sx={{
              fontFamily: "Inria Serif",
              color: "primary.main",
            }}
          >
            Your Scoreboard completed - {totalTasks - pendingTasks} - pending -{" "}
            {pendingTasks} total - {totalTasks}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginBottom: 2 }}
          >
            Add Task
          </Button>
          {/* ////////////////////add task//////////////////////// */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle
              sx={{
                // backgroundImage: "linear-gradient(to right, #AD85FF, #C452BE)",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                marginTop: "10px",
                // fontFamily: "monospace",
                fontSize: "1.25rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Add Task
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                type="text"
                fullWidth
                required
                name="title"
                label="Title"
                // label={errors.title && touched.title ? errors.title : "Title"}
                // error={errors.title && touched.title ? true : false}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                margin="dense"
                id="description"
                type="text"
                fullWidth
                required
                multiline
                rows={4}
                name="description"
                // error={errors.description && touched.description ? true : false}
                label={
                  errors.description && touched.description
                    ? errors.description
                    : "Description"
                }
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Typography sx={{ marginY: 2 }}>
                Select The Start Date and End Date
              </Typography>
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: startDate,
                    endDate: endDate,
                    key: "selection",
                  },
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          {/* //////////////////////add task end/////////////////////////////
          ////////////////edit task start///////////////////////// */}
          <Dialog open={editOpen} onClose={editHandleClose}>
            <DialogTitle
              sx={{
                // backgroundImage: "linear-gradient(to right, #AD85FF, #C452BE)",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                marginTop: "10px",
                // fontFamily: "monospace",
                fontSize: "1.25rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              EDIT YOUR TASKS
            </DialogTitle>

            <form onSubmit={handleUpdate}>
              <DialogContent>
                <TextField
                  name="title"
                  label="title"
                  defaultValue={editTitle}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  name="description"
                  label="description"
                  defaultValue={editDescription}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                />

                <DateRange
                  editableDateInputs={true}
                  onChange={handleEditDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={[
                    {
                      startDate: editStartDate,
                      endDate: editEndDate,
                      key: "selection",
                    },
                  ]}
                />

                <Typography gutterBottom>Progress</Typography>

                <Slider
                  valueLabelDisplay="auto"
                  slots={{
                    valueLabel: ValueLabelComponent,
                  }}
                  aria-label="custom thumb label"
                  defaultValue={progress}
                  onChange={(event, newValue) => setProgress(newValue)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={editHandleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
          {/* ///////////////////////edit task end/////////////////////////// */}
          {/* ///////////////////////add remainder start/////////////////////////// */}

          <Dialog open={remainderOpen} onClose={remainderHandleClose}>
            <DialogTitle
              sx={{
                // backgroundImage: "linear-gradient(to right, #AD85FF, #C452BE)",
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                marginTop: "10px",
                // fontFamily: "monospace",
                fontSize: "1.25rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Add Reminder
            </DialogTitle>
            <DialogContent sx={{ minHeight: "20vw", minWidth: "20vw" }}>
              {" "}
              <DateTimePicker onChange={onChange} value={remainder} />
            </DialogContent>
            <DialogActions>
              <Button onClick={remainderHandleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleRemainderSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          {/* ///////////////////////add remainder end/////////////////////////// */}
        </Box>
        <Paper sx={{ padding:3, minHeight: "calc(100vh - 230px)" }}>
          {tasks?.length == 0 ? (
            <Typography
              variant="h5"
              sx={{
                color: "#0077b6",
                fontSize: "1.5rem",
                fontFamily: "Verdana, Geneva, sans-serif",
                marginTop: "2rem",
                textAlign: "center",
              }}
            >
              No Tasks To Show
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {tasks.map((task) => (
                <Grid item sm={12} lg={4} key={task.id}>
                  <Box
                    sx={{
                      boxShadow: 2,
                      padding: 2,
                      borderRadius: 10,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: "42vh",
                      minWidth: "40vh",
                      backgroundColor: task.status ? "#E9E8E8" : "#E9E8E8",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ marginTop: 1 }}>
                      {task.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Comic Sans MS",
                        fontStyle: "italic",
                        mb: 1,
                        maxWidth: "80ch",
                        overflowWrap: "break-word",
                      }}
                    >
                      {task.description}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: task.status ? "green" : "brown",
                      }}
                    >
                      {task.progress}% completed
                    </Typography>

                    {task.setRemainder && (
                      <Typography
                        variant="body1"
                        sx={{
                          color: task.status ? "green" : "brown",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Remainder:{" "}
                        {format(
                          new Date(task.setRemainder),
                          "dd-MM-yyyy hh:mm:ss a"
                        )}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Start Date:{" "}
                      {format(new Date(task.startDate), "dd-MM-yyyy")}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Due Date: {format(new Date(task.endDate), "dd-MM-yyyy")}
                    </Typography>

                    <Box
                      sx={{ display: "flex", justifyContent: "space-evenly" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          editHandleOpen(task.id);
                        }}
                        sx={{ margin: "0.5rem" }}
                      >
                        Update
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(task.id)}
                        sx={{ margin: "0.5rem" }}
                      >
                        Delete
                      </Button>
                    </Box>

                    {!task.status && (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => remainderHandleOpen(task.id)}
                          sx={{ margin: "0.5rem" }}
                        >
                          {task.setRemainder
                            ? "Edit Remainder"
                            : "Add Reminder"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/*  */}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          sx={{ mr: 2 }}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          disabled={tasks.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </Button>
      </Box>
    </>
  );
};

export default Home;
