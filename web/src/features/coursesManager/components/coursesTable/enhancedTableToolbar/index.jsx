import React, { useState } from 'react'
import { Box, Button, InputBase, Stack, Typography, Modal } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import styles from "./enhancedTableToolbar.module.scss";
import AddCourse from '../../addCourse/AddCourse'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2,
  overflow: 'hidden'
};

function EnhancedTableToolbar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Modal
        open={openModal}
        aria-labelledby="modal-add-title"
        aria-describedby="modal-add-description"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Box sx={style}>
          <AddCourse setOpenModal={setOpenModal} />
        </Box>
      </Modal>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Course List</Typography>
          <Button onClick={() => setOpenModal(true)}
            className={`${styles.button}`}
            variant="contained"
          >
            Add new course
          </Button>
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
