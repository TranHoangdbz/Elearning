import { ArrowBack, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  deleteLessonById,
  getLessonsByCourse,
} from "../../coursesManagerSlice";
import styles from "./courseDetail.module.scss";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditCourse from "../editCourse/EditCourse";
function CourseDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.pathname;
  const path = url.split("/").filter((x) => x);

  const courseIndex = useSelector(
    (state) => state.coursesManager.courses
  ).findIndex((object) => {
    return object._id === path[2];
  });

  const courseData = useSelector((state) => state.coursesManager.courses)[
    courseIndex
  ];

  const lessons = useSelector((state) => state.coursesManager.lessons);

  React.useEffect(() => {
    dispatch(getLessonsByCourse(courseData._id));
  }, [courseData]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentItem, setCurrentItem] = React.useState();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const location = useLocation();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(deleteLessonById(currentItem?._id));
    setOpenConfirm(false);
  };
  // Open edit popup
  const [openEditPopup,setOpenEditPopup] = React.useState(false);
  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
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
              onClick = {()=>handleOpenEditPopup()}
            >
              Edit
            </Button>
            <Button
              className={`${styles.button}`}
              variant="text"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </Box>
        </Stack>
        <Typography variant="h4" fontWeight="bold">
          {courseData.courseName}
        </Typography>
        <Typography width="67%">{courseData.description}</Typography>
        <Stack padding="12px 0px" spacing="4px">
          <Typography variant="h5" fontWeight="bold">
            Thumbnail
          </Typography>
          <div className={`${styles.thumbnail}`}>
            <img alt="thumbnail" src={courseData.courseImage} />
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
            <Typography>{`${courseData.lessons.length} lessons`}</Typography>
          </Stack>
          <Button
            className={`${styles.addbutton}`}
            variant="contained"
            onClick={() => {
              navigate("/coursesmanager/addcourse");
            }}
          >
            Thêm bài học
          </Button>
        </Stack>
        <Stack direction="row" spacing="12px">
          <div className={`${styles.demo}`}>
            <img alt="demo" src={courseData.courseImage} />
          </div>
          <List
            className={`${styles.list}`}
            sx={{ margin: "0px", padding: "0px" }}
          >
            {lessons.map((item) => {
              return (
                <ListItem>
                  <Paper className={`${styles.listitem}`} elevation={3}>
                    <Stack direction="row" justifyContent="space-between">
                      <img
                        alt="listitemiamge"
                        className={`${styles.listitemimage}`}
                        src={item.thumbnail}
                      />

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-evenly"
                      >
                        <Typography fontWeight="bold">
                          {`${item.lessonVolume}. ${item.name}`}
                        </Typography>
                        <Typography>12:25</Typography>
                      </Stack>
                      <IconButton
                        aria-controls={
                          open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) => {
                          handleClick(e);
                          setCurrentItem(item);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open && currentItem?._id === item._id}
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
                        <Link
                          to="/edit-courses"
                          state={{
                            _id: item._id,
                            name: item.name,
                            description: item.description,
                            thumbnail: item.thumbnail,
                            course_url: item.video,
                            course_url2: location.pathname,
                          }}
                        >
                          <MenuItem onClick={handleClose}>Edit</MenuItem>
                        </Link>
                        <MenuItem
                          onClick={(e) => {
                            setOpenConfirm(true);
                          }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={`${styles.popup}`}>
          <div className={`${styles.header}`}>
            <h2 className={`${styles.header__title}`}>Confirm action</h2>
            <button
              className={`${styles.header__right}`}
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              <CancelOutlinedIcon color="secondary" fontSize="large" />{" "}
            </button>
          </div>
          <p>Are you sure want to delete?</p>

          <div className={`${styles.footer}`}>
            <div className={`${styles.footer__left}`}></div>
            <div className={`${styles.footer__right}`}>
              <button
                className={`${styles.btn__cancel}`}
                onClick={() => {
                  setOpenConfirm(false);
                }}
              >
                {" "}
                Cancel{" "}
              </button>
              <button className={`${styles.btn__ok}`} onClick={handleDelete}>
                {" "}
                Ok{" "}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openEditPopup}
        fullScreen
      >
        
        <button className={`${styles.header__right__}`} onClick={()=>handleCloseEditPopup()} > <CancelOutlinedIcon color="secondary" fontSize="large" /> </button>
        <EditCourse 
          _id = { courseData._id}
          name= {courseData.courseName}
          description = {courseData.description}
          thumbnail = {courseData.courseImage}
          course_url = { courseData.demoVideo}
          course_url2={location.pathname} 
        />
        
      </Dialog>
    </Paper>
  );
}

export default CourseDetail;
