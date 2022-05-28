import { ArrowBack, Edit } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./lessonDetail.module.scss";

function LessonDetail() {
  const navigate = useNavigate();
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
              navigate("/coursesmanager/courseslist");
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
            <iframe src="http://res.cloudinary.com/ddpmmci58/video/upload/v1653662720/kj0nhgi9jl5zsvuq5fib.mp4" />
          </div>
          <Stack
            className={`${styles.detail}`}
            direction="column"
            spacing="12px"
          >
            <Typography variant="h5" fontWeight="bold">
              Name: Lesson Name
            </Typography>
            <div className={`${styles.thumbnail}`}>
              <img src="https://res.cloudinary.com/dry9yzxep/image/upload/v1653556266/courses/COURSE1/course1_image_sd6ql7.png" />
            </div>
            <Typography>
              <b>Course:</b> Course Name
            </Typography>
            <Typography>
              <b>Video Link:</b> Thisisvideolink.com
            </Typography>
            <Typography>
              <b>Thumbnail Link:</b> Thisisthumbnaillink.com
            </Typography>
          </Stack>
        </Stack>
        <Stack paddingTop="24px" paddingBottom="24px" direction="column" spacing="4px">
          <Typography variant="h5" fontWeight="bold">
            Description
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eqet aliquet nibh present tristique magna Enim present elementum facilisis leo vel fringilla est ullamcorper get. Platea dictumst quisque sagittis purus sit amet. Aliquet get sit amet tellus cras. Egestas maecenas pharetra convallis posuere. Dolor sit amet consectetur adipiscina elit duis tristique sollicitudin. Lacus vel facilisis volutpat est velit egestas. At varius vel pharetra vel. Vivera nam libero justo laoreet.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default LessonDetail;
