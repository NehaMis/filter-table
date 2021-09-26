import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTable({ column, rows }) {
  return (
    <div className="container">
      <p className="record_count">Showing {rows.length} records</p>
      <TableContainer
        style={{
          width: "100%",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-grey">
              {column.map((headCell) => {
                return <TableCell className="fwt-8">{headCell}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.screen_name}</TableCell>
                <TableCell align="right">{row.followers_count}</TableCell>
                <TableCell align="right">{row.following_count}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.verified}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
