import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./enhancedTableToolbar.module.scss";

function EnhancedTableToolbar({ numSelected }) {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Danh sách khóa học</Typography>
        <Button
          className={`${styles.button}`}
          variant="contained"
          onClick={() => {
            navigate("/coursesmanager/addcourse");
          }}
        >
          Thêm khóa học
        </Button>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing="12px"
      >
        <Typography variant="h6">Nhập bất kỳ để tìm kiếm</Typography>
        <InputBase className={`${styles.input}`} />
      </Stack>
      <Box height="12px">
        {numSelected > 0 ? (
          <Typography variant="h6">Đã chọn {numSelected} khóa học</Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default EnhancedTableToolbar;
