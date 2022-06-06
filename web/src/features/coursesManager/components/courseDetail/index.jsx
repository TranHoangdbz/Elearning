import { ArrowBack, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCourseById,
  getCourses,
  setActiveCourse,
} from "../../coursesManagerSlice";
import AddLessonModal from "../addLessonModal";
import styles from "./courseDetail.module.scss";

function CourseDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.pathname;
  const path = url.split("/").filter((x) => x);

  const [show, setShow] = React.useState(false);

  const [alert, setAlert] = React.useState({
    title: "",
    open: false,
  });

  const [deleteAlert, seDeleteAlert] = React.useState(false);

  const handleOpenConfirmDialog = () => {
    seDeleteAlert(true);
  };

  const handleCloseConfirmDialog = () => {
    seDeleteAlert(false);
  };

  const handleShowAlert = (title) => {
    setAlert({ title: title, open: true });
    setTimeout(() => {
      setAlert({ title: "", open: false });
    }, 3000);
  };

  const currentCourseData = useSelector(
    (state) => state.coursesManager.currentCourse
  );

  const [currentCourse, setCurrentCourse] = React.useState({
    _id: "",
    courseCode: "",
    courseImage: "",
    courseName: "",
    demoVideo: "",
    category: "",
    description: "",
    teacher: null,
    discussion: [],
    rating: [],
    lessons: [],
    isActive: null,
  });

  const getVideoDuration = (_id) => {
    if (currentCourse.lessons === []) {
      return {
        minute: NaN,
        second: NaN,
      };
    } else {
      var myVideoPlayer = document.getElementById(`${_id}`);
      if (myVideoPlayer === null) {
        return {
          minute: NaN,
          second: NaN,
        };
      } else if (myVideoPlayer.duration !== NaN) {
        let videoDuration = myVideoPlayer.duration;
        return {
          minute: parseInt(videoDuration / 60, 10),
          second: parseInt(videoDuration % 60),
        };
      }
      return {
        minute: NaN,
        second: NaN,
      };
    }
  };

  if (currentCourseData !== null && currentCourse._id === "") {
    setCurrentCourse(currentCourseData);
  }

  React.useEffect(() => {
    setCurrentCourse({
      _id: "",
      courseCode: "",
      courseImage: "",
      courseName: "",
      demoVideo: "",
      category: "",
      description: "",
      teacher: null,
      discussion: [],
      rating: [],
      lessons: [],
      isActive: null,
    });
    dispatch(getCourseById(path[2]));
  }, [dispatch]);

  const handleDeleteCourse = () => {
    let lessons = [];
    currentCourse.lessons.forEach((item) => {
      lessons.push(item._id);
    });
    dispatch(
      setActiveCourse({ ...currentCourse, lessons: lessons, isActive: false })
    );
    handleCloseConfirmDialog();
    window.location.reload();
  };

  const handleReverseCourse = () => {
    let lessons = [];
    currentCourse.lessons.forEach((item) => {
      lessons.push(item);
    });
    dispatch(setActiveCourse({ ...currentCourse, lessons: lessons, isActive: true }));
    handleCloseConfirmDialog();
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = React.useState();

  const open = Boolean(anchorEl);

  const handleClick = (e, _id) => {
    setAnchorEl(e.currentTarget);
    setId(_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewLesson = (courseId, lessonId) => {
    navigate("/coursesmanager/lessondetail/" + courseId + "/" + lessonId);
    handleClose();
  };

  return (
    <Paper className={`${styles.coursedetail}`} elevation={3}>
      <Stack direction="column" spacing="8px">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            className={`${styles.backbutton}`}
            variant="text"
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate("/coursesmanager/courseslist");
            }}
          >
            Courses list
          </Button>
          <Box>
            <Button
              className={`${styles.button}`}
              variant="text"
              startIcon={<Edit />}
            >
              Edit
            </Button>
            {currentCourse.isActive ? (
              <Button
                className={`${styles.button}`}
                variant="text"
                startIcon={<Delete />}
                onClick={() => handleOpenConfirmDialog()}
              >
                Delete
              </Button>
            ) : (
              <Button
                className={`${styles.button}`}
                variant="text"
                startIcon={<Delete />}
                onClick={() => handleOpenConfirmDialog()}
              >
                Reverse
              </Button>
            )}
          </Box>
        </Stack>
        <Typography variant="h4" fontWeight="bold">
          {currentCourse.courseName}
        </Typography>
        <Typography width="67%">{currentCourse.description}</Typography>
        <Stack padding="12px 0px" spacing="4px">
          <Typography variant="h5" fontWeight="bold">
            Thumbnail
          </Typography>
          <div className={`${styles.thumbnail}`}>
            <img alt="thumbnail" src={currentCourse.courseImage} />
          </div>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column" spacing="4px">
            <Typography variant="h5" fontWeight="bold">
              Course content
            </Typography>
            <Typography>{`${currentCourse.lessons.length} lessons`}</Typography>
          </Stack>
          <Button
            className={`${styles.addbutton}`}
            variant="contained"
            onClick={() => setShow(!show)}
          >
            Add new lesson
          </Button>
        </Stack>
        <Stack direction="row" spacing="12px">
          <div className={`${styles.demo}`}>
            <img alt="demo" src={currentCourse.courseImage} />
          </div>
          <List
            className={`${styles.list}`}
            sx={{ margin: "0px", padding: "0px" }}
          >
            {currentCourse.lessons.map((item, index) => {
              return (
                <ListItem>
                  <Paper className={`${styles.listitem}`} elevation={3}>
                    <Stack direction="row" spacing="16px">
                      <video
                        className={`${styles.lessonvideo}`}
                        id={`video_${item._id}`}
                        controls
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                      <div className={`${styles.listitemimage}`}>
                        <img alt="listitemiamge" src={item.thumbnail} />
                      </div>
                      <Stack
                        className={`${styles.listitemrest}`}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Stack
                          direction="column"
                          alignItems="flex-start"
                          justifyContent="space-evenly"
                        >
                          <Typography fontWeight="bold">
                            {`${index + 1}. ${item.name}`}
                          </Typography>
                          <Typography>
                            {`${getVideoDuration(`video_${item._id}`).minute}:${
                              getVideoDuration(`video_${item._id}`).second
                            }`}
                          </Typography>
                        </Stack>
                        <IconButton
                          aria-controls={
                            open ? "demo-positioned-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e, item._id)}
                        >
                          <MoreVert />
                        </IconButton>
                      </Stack>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        elevation={1}
                      >
                        <MenuItem
                          onClick={() => {
                            handleViewLesson(currentCourse._id, id);
                          }}
                        >
                          Xem
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                        <MenuItem onClick={handleClose}>Xóa</MenuItem>
                      </Menu>
                    </Stack>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
      <AddLessonModal
        open={show}
        setOpen={setShow}
        handleShowAlert={handleShowAlert}
      />
      <Modal
        open={alert.open}
        hideBackdrop={true}
        onClose={() => setAlert({ title: "", open: false })}
      >
        <Alert variant="filled" severity="success">
          {alert.title}
        </Alert>
      </Modal>
      <Dialog
        open={deleteAlert}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {currentCourse.isActive ? "Confirm delete course?" : "Confirm reverse course?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentCourse.isActive ? "After delete, the course will be set to be inactive." : "After reverse, the course will be set to be active."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            className={`${styles.confirmbutton}`}
            variant="contained"
            onClick={currentCourse.isActive ? handleDeleteCourse : handleReverseCourse}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default CourseDetail;
