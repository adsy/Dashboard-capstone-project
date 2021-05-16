import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import { Dropdown} from "rsuite";
import { ButtonToolbar } from "reactstrap";

// DropdownComponent constant is created and exported so 'day, week, month, year' are options
// for dashboard users to select from.
const DropdownComp = ({ granularity, setGran }) => (
  <ButtonToolbar>
    <Dropdown
      style={{ width: "100%" }}
      title={"Granularity Filter"}
      size="lg"
      activeKey={granularity}
      trigger="hover"
    >
      <Dropdown.Item
        eventKey="day"
        style={{ width: "100%" }}
        onSelect={() => {
          granularity = "day";
          setGran(granularity);
        }}
      >
        Day
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="week"
        style={{ width: "100%" }}
        onSelect={() => {
          granularity = "week";
          setGran(granularity);
        }}
      >
        Week
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="month"
        style={{ width: "100%" }}
        onSelect={() => {
          granularity = "month";
          setGran(granularity);
        }}
      >
        Month
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="year"
        style={{ width: "100%" }}
        onSelect={() => {
          granularity = "year";
          setGran(granularity);
        }}
      >
        Year
      </Dropdown.Item>
    </Dropdown>
  </ButtonToolbar>
);

export default DropdownComp;
