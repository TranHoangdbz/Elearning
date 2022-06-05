import { ArrowBack, Edit } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById, getLessonById } from "../../coursesManagerSlice";
import styles from "./lessonDetail.module.scss";

function LessonDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.pathname;
  const path = url.split("/").filter((x) => x);

  const currentLessonData = useSelector(
    (state) => state.coursesManager.currentLesson
  );
  const currentCourseData = useSelector(
    (state) => state.coursesManager.currentCourse
  );

  const [currentLesson, setCurrentLesson] = React.useState({
    _id: "",
    lessonCode: "",
    description: "",
    video: "",
    quizz: [],
    passed: [],
    thumbnail: "",
    name: "",
    lessonVolume: null,
  });

  const [currentCourseName, setCurrentCourseName] = React.useState("");

  if (currentLessonData !== null && currentLesson._id === "") {
    setCurrentLesson(currentLessonData);
  }

  if (currentCourseData !== null && currentCourseName === "") {
    setCurrentCourseName(currentCourseData.courseName);
  }

  React.useEffect(() => {
    setCurrentLesson({
      _id: "",
      lessonCode: "",
      description: "",
      video: "",
      quizz: [],
      passed: [],
      thumbnail: "",
      name: "",
      lessonVolume: null,
    });
    dispatch(getCourseById(path[2]));
    dispatch(getLessonById(path[3]));
  }, []);

  return (
    <Paper className={`${styles.lessondetail}`} elevation={3}>
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
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            className={`${styles.button}`}
            variant="text"
            startIcon={<Edit />}
          >
            Edit Lesson
          </Button>
        </Stack>
        <Stack direction="row" spacing="12px">
          <div className={`${styles.demo}`}>
            <iframe src={currentLesson.video} allowFullScreen />
          </div>
          <Stack
            className={`${styles.detail}`}
            direction="column"
            spacing="12px"
          >
            <Typography variant="h5" fontWeight="bold">
              {currentLesson.name}
            </Typography>
            <div className={`${styles.thumbnail}`}>
              <img src={currentLesson.thumbnail} />
            </div>
            <Typography>
              <b>Course:</b> {currentCourseName}
            </Typography>
            <Typography>
              <b>Video Link:</b> {currentLesson.video}
            </Typography>
            <Typography>
              <b>Thumbnail Link:</b> {currentLesson.thumbnail}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          paddingTop="24px"
          paddingBottom="24px"
          direction="column"
          spacing="4px"
        >
          <Typography variant="h5" fontWeight="bold">
            Description
          </Typography>
          <Typography>{currentLesson.description}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default LessonDetail;
