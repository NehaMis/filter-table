import "./App.css";
import Filter from "./components/Filter";
import CustomTable from "./components/CustomTable";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

function createData(
  name,
  screen_name,
  followers_count,
  following_count,
  location,
  verified
) {
  return {
    name,
    screen_name,
    followers_count,
    following_count,
    location,
    verified: verified ? <CheckIcon /> : <ClearIcon />,
    verifiedValue: verified,
  };
}

const rows = [
  createData("James Murphy", "james4", 100, 224, "Glendora, CA", false),
  createData("Robert O'Kelly", "robert1", 9, 387, "Dubai", true),
  createData("JohncWalsh", "john2", 16, 24, "Boulder, CA", true),
  createData("Michael O'Brien", "michael9", 1, 671, "Toronto", true),
  createData("William O'Connor", "william", 60, 490, "Nederland", false),
];

function App() {
  const [displayData, setDisplayData] = useState(rows || []);

  const column = [
    "Name",
    "Screen Name",
    "Followers Count",
    "Following Count",
    "Location",
    "Verified",
  ];

  const columnMap = {
    Name: "name",
    "Screen Name": "screen_name",
    "Followers Count": "followers_count",
    "Following Count": "following_count",
    Location: "location",
    Verified: "verifiedValue",
  };

  const operations = ["Contains", "Equals", ">=", "<="];
  const logical_operators = ["AND", "OR"];

  const getFilteredOut = (data, filters, logicalOperation) => {
    let isAllowedArray = logicalOperation === "OR" ? false : true;

    for (let condition of filters) {
      let isAllowed = false;

      try {
        const value = data[columnMap[condition.field]];
        if (value !== undefined) {
          switch (condition.operator) {
            case "Contains":
              if (typeof value === "string") {
                if (
                  value.toLowerCase().includes(condition.value.toLowerCase())
                ) {
                  isAllowed = true;
                }
              } else if (typeof value === "number") {
                if (value * 1 === condition.value * 1) {
                  isAllowed = true;
                }
              }
              break;
            case "Equals":
              if (condition.value === "Yes") {
                if (true === value) {
                  isAllowed = true;
                }
              } else {
                if (false === value) {
                  isAllowed = true;
                }
              }
              break;
            case ">=":
              if (value >= condition.value) {
                isAllowed = true;
              }
              break;
            case "<=":
              if (value <= condition.value) {
                isAllowed = true;
              }
              break;
            default:
              break;
          }
        }
      } catch (error) {}

      if (filters.length > 1) {
        if (logicalOperation === "AND") {
          console.log("here", isAllowedArray, isAllowed);
          isAllowedArray = isAllowedArray && isAllowed;
        } else {
          console.log("there", isAllowedArray, isAllowed);
          isAllowedArray = isAllowedArray || isAllowed;
        }
      } else {
        isAllowedArray = isAllowed;
      }
    }

    return isAllowedArray;
  };

  // getting filter from filter component and apply
  const onAppyFilter = (conditions = [], conditionalOperator = "AND") => {
    const filteredRows = [...rows];

    const newFilteredData = filteredRows.filter((data) => {
      return getFilteredOut(data, conditions, conditionalOperator);
    });
    setDisplayData(newFilteredData);
  };
  const resetFilter = () => {
    setDisplayData(rows);
  };

  return (
    <div className="App">
      <Filter
        operators={logical_operators}
        column={column}
        operation={operations}
        onAppyFilter={onAppyFilter}
        resetFilter={resetFilter}
      />

      <CustomTable column={column} rows={displayData} />
    </div>
  );
}

export default App;
