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
   const [limit, setLimit] = useState(2);
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
      <Box maxWidth justifyContent="center" sx={{ minHeight: "80vh" }}>
        <Toaster toasterOptions={{ duratiom: 8000 }} />

        <Box
          maxWidth
          sx={{
            bgcolor: "#E9E8E8",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TaskList tasks={tasks} />
          <Typography
            variant="h5"
            fontWeight={{ xs: 200, sm: 200, md: 200, lg: 200 }}
            my={{ xs: 0.5, sm: 1, md: 1.6, lg: 2 }}
            sx={{
              fontFamily: "Inria Serif",
              color: "primary.main",
            }}
          >
            Your Scoreboard completed - {totalTasks - pendingTasks} - pending -{" "}
            {pendingTasks} total - {totalTasks}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ marginRight: 2 }}
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
        <Paper sx={{ padding: 2, minHeight: "60vh" }}>
          {tasks?.length == 0 ? (
            <Typography
              variant="h5"
              style={{
                color: "#0077b6", // change the color to a desired one
                fontSize: "2rem", // increase the font size to a desired value
                fontFamily: "Verdana, Geneva, sans-serif",
                marginLeft: "34vw", // set a desired font family
                marginTop: "10vw", // set a desired font family
              }}
            >
              No More Tasks To Show
            </Typography>
          ) : (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {tasks &&
                tasks.map((task) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={task.id}
                    sx={{ display: "flex" }}
                  >
                    <Paper
                      sx={{
                        width: "50%",
                        boxShadow: 2,
                        padding: 5,
                        marginLeft: "7.5vw",
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        minHeight: "40vh",
                        backgroundColor: task.status ? "#E9E8E8" : "#E9E8E8",
                        textAlign: "center", // Added textAlign property
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ position: "absolute", top: "10%" }}
                      >
                        {task.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontFamily: "Comic Sans MS",
                          fontStyle: "italic",
                          mb: 4,
                          maxWidth: "80ch", // limit width to 80 characters
                          overflowWrap: "break-word", // wrap long words to prevent overflow
                        }}
                      >
                        {task.description}
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: task.status ? "green" : "brown",
                          position: "absolute",
                          left: "35%",
                          bottom: "18%",
                        }}
                      >
                        {task.progress}% completed
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          position: "absolute",
                          left: "15%",
                          color: task.status ? "green" : "brown",
                          fontWeight: 600,
                        }}
                      >
                        {task.setRemainder ? (
                          <>
                            Remainder:{" "}
                            {format(
                              new Date(task.setRemainder),
                              "dd-MM-yyyy hh:mm:ss a"
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                          mr: 2,
                        }}
                      >
                        Start Date:{" "}
                        {format(new Date(task.startDate), "dd-MM-yyyy")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 1,
                          mr: 2,
                        }}
                      >
                        End Date: {format(new Date(task.endDate), "dd-MM-yyyy")}
                      </Typography>

                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          position: "absolute",
                          left: "20px",
                          bottom: "10px",
                          width: "6vw",
                          boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                          fontSize: "14px",
                          padding: "8px 16px",
                        }}
                        onClick={() => handleDelete(task.id, tasks)}
                      >
                        Delete
                      </Button>
                      <Button
                        sx={{
                          color: "#000000",
                          backgroundColor: "#C2C2C2",
                          boxShadow: "5px 5px 15px rgba(190, 133, 255,1)",
                          width: "70px",
                          position: "absolute",
                          right: "20px",
                          bottom: "10px",
                          fontSize: "14px",
                          padding: "8px 16px",
                          width: "6vw",
                        }}
                        onClick={() => {
                          editHandleOpen(task.id);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => remainderHandleOpen(task.id)}
                        sx={{
                          marginRight: 1,
                          position: "absolute",
                          bottom: "5%",
                          left: "32%",
                          fontSize: "0.8rem",
                          height: "30px",
                          minWidth: "11vw",
                          width: "11vw",
                        }}
                      >
                        {task.setRemainder ? "Edit Remainder" : "Add Reminder"}
                      </Button>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          )}
        </Paper>
        <Box sx={{ marginLeft: "41vw", my: 1 }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous Page
          </button>
          <button
            disabled={tasks.length < limit}
            onClick={() => setPage(page + 1)}
          >
            Next Page
          </button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
