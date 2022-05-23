import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import styles from "./enhancedTableToolbar.module.scss";

function EnhancedTableToolbar({ numSelected }) {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Danh sách khóa học</Typography>
        <Button className={`${styles.button}`} variant="contained">
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
      {numSelected > 0 ? (
        <Typography variant="h6">Đã chọn {numSelected} khóa học</Typography>
      ) : null}
    </Box>
  );
}

export default EnhancedTableToolbar;
