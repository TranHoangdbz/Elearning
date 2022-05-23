import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./coursesTableContainer.module.scss";

const tableHeadCells = [
  {
    id: "STT",
    label: "STT",
    align: "left",
  },
  {
    id: "ID",
    label: "ID",
    align: "left",
  },
  {
    id: "Khóa học",
    label: "Khóa học",
    align: "left",
  },
  {
    id: "Số bài học",
    label: "Số bài học",
    align: "left",
  },
  {
    id: "Số người tham gia",
    label: "Số người tham gia",
    align: "left",
  },
  {
    id: "Đã hoàn thành",
    label: "Đã hoàn thành",
    align: "right",
  },
];

function CoursesTableContainer({
  rowData,
  page,
  rowsPerPage,
  numSelected,
  handleSelectAllClick,
  handleRowClick,
  isSelected,
}) {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowData.lenght}
                checked={rowData.lenght > 0 && numSelected === rowData.lenght}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            {tableHeadCells.map((item) => (
              <TableCell key={item.key} align={item.align}>
                {item.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              const isItemSelected = isSelected(item.stt)

              return (
                <TableRow
                  key={item.stt}
                  hover
                  onClick={(e) => handleRowClick(e, item.stt)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.stt}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell
                    key={item.stt}
                    component="th"
                    scope="row"
                    sx={{ width: "500px" }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell>{item.lessonCount}</TableCell>
                  <TableCell>{item.participantCount}</TableCell>
                  <TableCell align="right">
                    {item.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành"}
                  </TableCell>
                </TableRow>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CoursesTableContainer;
