import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function Filter({ operators, column, operation, onAppyFilter, resetFilter }) {
  const [logicalOperator, setLogicalOperator] = useState("AND");
  const [filterArray, setFilterArray] = useState([]);

  const handleFilter = () => {
    const newfilterArray = [...filterArray];
    let isAllowed = true;
    // validation
    for (let data of newfilterArray) {
      if (data.field === "" || data.operator === "" || data.value === "") {
        isAllowed = false;
        break;
      }
    }

    if (isAllowed) {
      newfilterArray.push({ field: "", operator: "", value: "" });
      setFilterArray(newfilterArray);
    } else {
      alert("Please check filter then add again!");
    }
  };

  const handleDelete = (index) => {
    const newfilterArray = [...filterArray];
    newfilterArray.splice(index, 1);
    setFilterArray(newfilterArray);
  };

  const handleSelectValue = (e, index, field) => {
    let newfilterArray = [...filterArray];
    newfilterArray[index][field] = e.target.value;
    setFilterArray(newfilterArray);
  };

  useEffect(() => {
    let preparedFIlters = filterArray.filter((data) => {
      return data.field !== "" && data.operator !== "" && data.value !== "";
    });

    if (preparedFIlters && preparedFIlters.length > 0) {
      onAppyFilter(filterArray, logicalOperator);
    } else {
      //reset filter
      resetFilter();
    }
  }, [filterArray, logicalOperator]);

  return (
    <div className="container">
      <h6 className="title">FILTERS</h6>
      <div className="filter_container">
        <table>
          <tbody>
            {filterArray.map((data, index) => {
              return (
                <tr>
                  <td>
                    {index > 1 ? (
                      <h6 className="where_text">{logicalOperator}</h6>
                    ) : index > 0 ? (
                      <Select
                        value={logicalOperator}
                        onChange={(e) => setLogicalOperator(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {operators.map((item) => {
                          return (
                            <MenuItem value={item}>
                              <em>{item}</em>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    ) : (
                      <h6 className="where_text">Where</h6>
                    )}
                  </td>
                  <td>
                    <Select
                      value={data.field}
                      onChange={(e) => handleSelectValue(e, index, "field")}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {column.map((headCell) => {
                        return (
                          <MenuItem value={headCell}>
                            <em>{headCell}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </td>
                  <td>
                    <Select
                      value={data.operator}
                      onChange={(e) => handleSelectValue(e, index, "operator")}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {operation.map((item) => {
                        return (
                          <MenuItem value={item}>
                            <em>{item}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </td>
                  <td>
                    {data.operator === "Equals" ? (
                      <Select
                        value={data.value}
                        onChange={(e) => handleSelectValue(e, index, "value")}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {["Yes", "No"].map((item) => {
                          return (
                            <MenuItem value={item}>
                              <em>{item}</em>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    ) : (
                      <input
                        value={data.value}
                        onChange={(e) => handleSelectValue(e, index, "value")}
                      ></input>
                    )}
                  </td>
                  <td>
                    <div className="del_container">
                      <DeleteOutlineIcon
                        className="del_icon"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h6 className="add_filter_text" onClick={handleFilter}>
          + Add Filter
        </h6>
      </div>
    </div>
  );
}

export default Filter;
