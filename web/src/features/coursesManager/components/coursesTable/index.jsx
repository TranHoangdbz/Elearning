import { Paper } from "@mui/material";
import React from "react";
import CoursesTableContainer from "../coursesTableContainer";
import CoursesTablePagination from "../coursesTablePagination";
import EnhancedTableToolBar from "../enhancedTableToolbar";
import styles from "./coursesTable.module.scss";

function createData(stt, id, name, lessonCount, participantCount, isCompleted) {
  return {
    stt: stt,
    id: id,
    name: name,
    lessonCount: lessonCount,
    participantCount: participantCount,
    isCompleted: isCompleted,
  };
}

const rowData = [
  createData(1, 1, "Khóa học TOEIC 500", 25, 100, false),
  createData(2, 2, "Khóa học TOEIC 500", 25, 100, false),
  createData(3, 3, "Khóa học TOEIC 500", 25, 100, false),
  createData(4, 4, "Khóa học TOEIC 500", 25, 100, false),
  createData(5, 5, "Khóa học TOEIC 500", 25, 100, false),
  createData(6, 6, "Khóa học TOEIC 500", 25, 100, false),
  createData(7, 7, "Khóa học TOEIC 500", 25, 100, false),
  createData(8, 8, "Khóa học TOEIC 500", 25, 100, false),
  createData(9, 9, "Khóa học TOEIC 500", 25, 100, false),
  createData(10, 10, "Khóa học TOEIC 500", 25, 100, false),
  createData(11, 11, "Khóa học TOEIC 500", 25, 100, false),
  createData(12, 12, "Khóa học TOEIC 500", 25, 100, false),
  createData(13, 13, "Khóa học TOEIC 500", 25, 100, false),
  createData(14, 14, "Khóa học TOEIC 500", 25, 100, false),
  createData(15, 15, "Khóa học TOEIC 500", 25, 100, false),
  createData(16, 16, "Khóa học TOEIC 500", 25, 100, false),
  createData(17, 17, "Khóa học TOEIC 500", 25, 100, false),
  createData(18, 18, "Khóa học TOEIC 500", 25, 100, false),
  createData(19, 19, "Khóa học TOEIC 500", 25, 100, false),
];

function CoursesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = rowData.map((item) => item.stt);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, stt) => {
    const selectedIndex = selected.indexOf(stt);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, stt);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
  };

  const isSelected = (stt) => selected.indexOf(stt) !== -1;

  return (
    <Paper className={`${styles.coursestable}`} elevation={3}>
      <EnhancedTableToolBar numSelected={selected.length}/>
      <CoursesTableContainer
        rowData={rowData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleSelectAllClick={handleSelectAllClick}
        handleRowClick={handleClick}
        isSelected={isSelected}
      />
      <CoursesTablePagination
        rowCount={rowData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CoursesTable;
