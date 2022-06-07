import {
  Button,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLesson } from "../../coursesManagerSlice";
import styles from "./addLessonModal.module.scss";

function AddLessonModal({ open, setOpen, handleShowAlert }) {
  const dispatch = useDispatch();

  const checkSpecialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const [submit, setSubmit] = React.useState(false);

  const [success, setSuccess] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const messageData = useSelector((state) => state.coursesManager.message);
  const successData = useSelector((state) => state.coursesManager.success);

  if (message !== "" && messageData !== "") {
    setMessage(messageData);
  }

  if (success !== null && successData !== null) {
    setSuccess(successData);
  }

  const handleCloseModal = () => {
    setOpen(!open);
    setLesson({
      _id: "",
      name: "",
      lessonCode: "",
      description: "",
      video: "",
      quizz: [],
      thumbnail: "",
      lessonVolume: null,
    });
    setVideoPreview("");
    setThumbnailPreview("");
    setSubmit(false);
    window.location.reload();
  };

  const [lesson, setLesson] = React.useState({
    _id: "",
    lessonCode: "",
    name: "",
    description: "",
    video: "",
    quizz: [],
    thumbnail: "",
    lessonVolume: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = React.useState("");
  const [videoPreview, setVideoPreview] = React.useState("");

  const handleChooseThumbnail = (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setLesson({
        ...lesson,
        thumbnail: file,
      });
      setThumbnailPreview([reader.result]);
    };
  };

  const handleChooseVideo = (e) => {
    let file = e.target.files[0];

    const reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = (e) => {
      setLesson({
        ...lesson,
        video: file,
      });
      setVideoPreview([reader.result]);
    };
  };

  const handleSubmit = (e) => {
    if (
      lesson.name === "" ||
      !lesson.name ||
      checkSpecialCharacters.test(lesson.name)
    ) {
      setSubmit(true);
    } else if (lesson.description === "" || !lesson.description) {
      setSubmit(true);
    } else if (lesson.video === "" || !lesson.video) {
      setSubmit(true);
    } else if (lesson.thumbnail === "" || !lesson.thumbnail) {
      setSubmit(true);
    } else {
      let data = new FormData();

      data.append("lessonCode", lesson.lessonCode);
      data.append("name", lesson.name);
      data.append("description", lesson.description);
      data.append("video", lesson.video);
      data.append("thumbnail", lesson.thumbnail);
      data.append("lessonVolumn", lesson.lessonVolume);
      // data.append("quizz", lesson.quizz);
      dispatch(createLesson(data));
      handleCloseModal();
      handleShowAlert("Add new lesson successfully!");
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Paper className={`${styles.modal}`}>
        <Stack direction="column" spacing="16px">
          <Typography align="center" variant="h4" fontWeight="bold">
            Add Lesson
          </Typography>
          <Stack direction="column" spacing="8px">
            <Typography variant="h5" fontWeight="bold">
              Name
            </Typography>
            <TextField
              error={
                submit &&
                (lesson.name === "" || checkSpecialCharacters.test(lesson.name))
                  ? true
                  : false
              }
              helperText={
                submit && lesson.name === ""
                  ? "Tên bài giảng không được để trống"
                  : submit && checkSpecialCharacters.test(lesson.name)
                  ? "Tên bài giảng không được chứa ký tự đặc biệt"
                  : ""
              }
              className={`${styles.lessonNameInput}`}
              placeholder="Lesson"
              variant="outlined"
              size="small"
              value={lesson.name}
              onChange={(e) => {
                setLesson({ ...lesson, name: e.target.value });
              }}
            />
          </Stack>
          <Stack direction="column" spacing="8px">
            <Typography variant="h5" fontWeight="bold">
              Description
            </Typography>
            <TextField
              error={submit && lesson.description === "" ? true : false}
              helperText={
                submit && lesson.description === ""
                  ? "Mô tả bài giảng không được để trống"
                  : ""
              }
              placeholder="Description"
              variant="outlined"
              size="small"
              fullWidth
              rows={6}
              multiline={true}
              value={lesson.description}
              onChange={(e) => {
                setLesson({ ...lesson, description: e.target.value });
              }}
            />
            {message !== "" ? <h3>{message}</h3> : null}
          </Stack>
          <Stack direction="row" spacing="8px">
            <Stack width="50%" direction="column" spacing="8px">
              <Typography variant="h5" fontWeight="bold">
                Video Link
              </Typography>
              <label htmlFor="contained-button-file">
                <Input
                  accept="video/mp4,video/x-m4v,video/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => handleChooseVideo(e)}
                />
                <Button
                  className={`${styles.iconAddPhoto}`}
                  component="span"
                  size="medium"
                  variant="contained"
                >
                  Select Video
                </Button>
              </label>
              <div
                className={
                  submit && lesson.video === ""
                    ? `${styles.videoerror}`
                    : `${styles.video}`
                }
              >
                {videoPreview !== "" ? (
                  <iframe src={videoPreview} allowFullScreen />
                ) : null}
              </div>
              {submit && lesson.video === "" ? (
                <Typography variant="caption" color="#a90000">
                  Video bài giảng không được để trống
                </Typography>
              ) : null}
            </Stack>
            <Stack width="50%" direction="column" spacing="8px">
              <Typography variant="h5" fontWeight="bold">
                Thumbnail Link
              </Typography>
              <label>
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => handleChooseThumbnail(e)}
                />
                <Button
                  className={`${styles.iconAddPhoto}`}
                  component="span"
                  size="medium"
                  variant="contained"
                >
                  Select Image
                </Button>
              </label>
              <div
                className={
                  submit && lesson.video === ""
                    ? `${styles.thumbnailerror}`
                    : `${styles.thumbnail}`
                }
              >
                {thumbnailPreview !== "" ? (
                  <img src={thumbnailPreview} />
                ) : null}
              </div>
              {submit && lesson.thumbnail === "" ? (
                <Typography variant="caption" color="#a90000">
                  Thumbnail bài giảng không được để trống
                </Typography>
              ) : null}
            </Stack>
          </Stack>
          <Stack direction="row-reverse" spacing="8px">
            <Button
              className={`${styles.saveallbutton}`}
              variant="contained"
              size="medium"
              onClick={(e) => handleSubmit(e)}
            >
              Save all
            </Button>
            <Button
              className={`${styles.cancelbutton}`}
              variant="contained"
              size="medium"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
}

export default AddLessonModal;
