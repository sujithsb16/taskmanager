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
import { addTask, deleteTask, getTask, setRemainder, updateTask } from "../actions/userActions";
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


const Home = () => {
  ///////////////////////////////////////////////////
  const userData = useSelector((state) => state.userLogin);

  const { tasks } = useSelector((state) => state.getTask);
  const { addTaskSuccess } = useSelector((state) => state.addTask);
  const { updateSuccess } = useSelector((state) => state.updateTask);
  const { addRemainderSuccess } = useSelector(
    (state) => state.addRemainderTask
  );
  console.log(addTaskSuccess);

  const dispatch = useDispatch();

  const pendingTasks = tasks.filter((task) => !task.status);


  /////////////////add task start////////////////////
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
// const [reminder, setReminder] = useState(false);





 const handleReminderChange = (event) => {
    setReminder(event.target.checked);
  };

  const setReminder = (task) => {
    const endDate = new Date(task.endDate);
    const currentTime = new Date();
    const timeDiff = endDate.getTime() - currentTime.getTime();

    if (timeDiff > 0) {
      // Reminder is in the future
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Show reminder message
      alert(
        `Reminder: Task "${task.title}" ends in ${days} days, ${
          hours % 24
        } hours, ${minutes % 60} minutes`
      );
    } else {
      // Reminder is in the past
      alert(`Task "${task.title}" has already ended.`);
    }
  };



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const taskData = { title, description, startDate, endDate };
    // Handle form submission here

    dispatch(addTask(taskData, tasks));
    handleClose();
    console.log({ title, description, startDate, endDate });
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
    e.preventDefault()
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
  setId(id)
  setRemainderOpen(true);
};



const handleRemainderSubmit = async () => {

 const taskData = {remainder}

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
 


  useEffect(() => {
    dispatch(getTask());
  }, [dispatch, addTaskSuccess, updateSuccess, addRemainderSuccess]);


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

// export default TaskList

//////////////////////////////////////

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
            Your Scoreboard completed - {tasks.length - pendingTasks.length} -
            pending - {pendingTasks.length} total - {tasks.length}
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
                label="Title"
                type="text"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
          {/* ///////////////////////////////////////////////////
          ////////////////edit task///////////////////////// */}
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
          {/* /////////////////////// remainder/////////////////////////// */}

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
            <DialogContent sx={{ minHeight: "20vw" }}>
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
        </Box>
        <Paper sx={{ padding: 2 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} key={task.id} sx={{ display: "flex" }}>
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
                  {/* <Typography
                    variant="body1"
                    sx={{
                      position: "absolute",
                      right: "10%",
                      color: task.status ? "green" : "brown",
                    }}
                  >
                    {task.status ? "Done" : "Pending"}
                  </Typography> */}
                  <Typography
                    variant="body1"
                    sx={{
                      position: "absolute",
                      left: "15%",
                      color: task.status ? "green" : "brown",
                      fontWeight: 600,
                    }}
                  >
                    Remainder :-{" "}
                    {format(
                      new Date(task.setRemainder),
                      "dd-MM-yyyy hh:mm:ss a"
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      mr: 2,
                    }}
                  >
                    <span>
                      Start Date:{" "}
                      {format(new Date(task.startDate), "dd-MM-yyyy")}
                    </span>
                    <span sx={{ marginLeft: "auto", marginRight: "10px" }}>
                      End Date: {format(new Date(task.endDate), "dd-MM-yyyy")}
                    </span>
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
                      left: "34%",
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
        </Paper>
      </Box>
    </>
  );
};

export default Home;
