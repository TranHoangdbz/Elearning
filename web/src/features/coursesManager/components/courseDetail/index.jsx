import { ArrowBack, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  Button,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styles from "./courseDetail.module.scss";

const list = [1, 2, 3, 4, 5, 6, 7];

function CourseDetail() {
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
          Đây là tên của khóa học
        </Typography>
        <Typography width="67%">
          Đây là mô tả ngắn về khóa học ngắn thôi chứ không phải ngắn lắm, từ
          100 đến 300 ký tự là oke, chiếm 8/12 col của content nha nghe hông,
          tức là cái cục bên kia chiếm 4 phần ó :3
        </Typography>
        <Stack padding="12px 0px" spacing="4px">
          <Typography variant="h5" fontWeight="bold">
            Thumbnail
          </Typography>
          <div className={`${styles.thumbnail}`}>
            <img
              className={{}}
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
            />
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
            <Typography>35 lessons</Typography>
          </Stack>
          <Button className={`${styles.addbutton}`} variant="contained">
            Thêm bài học
          </Button>
        </Stack>
        <Stack direction="row" spacing="12px">
          <div className={`${styles.demo}`}>
            <img src="https://images.unsplash.com/photo-1589118949245-7d38baf380d6" />
          </div>
          <List
            className={`${styles.list}`}
            sx={{ margin: "0px", padding: "0px" }}
          >
            {list.map((item) => {
              return (
                <ListItem>
                  <Paper className={`${styles.listitem}`} elevation={3}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                    >
                      <img
                        className={`${styles.listitemimage}`}
                        src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                      />

                      <Stack
                      
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-evenly"
                      >
                        <Typography fontWeight="bold">
                          1. Chương số mấy, tên gì ai biết?
                        </Typography>
                        <Typography>12:25</Typography>
                      </Stack>
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </Stack>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CourseDetail;
