import { Box, Button, InputBase, Stack, Typography } from "@mui/material";
import { useNavigate ,Link } from "react-router-dom";
import styles from "./enhancedTableToolbar.module.scss";

function EnhancedTableToolbar() {
  const navigate = useNavigate();
  
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Course List</Typography>
        <Link to="/coursesmanager/addcourse">
          <Button
            className={`${styles.button}`}
            variant="contained"
          > 
            Add new course
          </Button>
        </Link>
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing="12px"
      >
        <Typography variant="h6">Input anything for search</Typography>
        <InputBase className={`${styles.input}`} />
      </Stack>
    </Box>
  );
}

export default EnhancedTableToolbar;
