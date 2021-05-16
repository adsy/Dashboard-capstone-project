import React from "react";
import { useState } from "react";
import { Container, Row, Col, Card, CardTitle } from "reactstrap";

import Scorecard from "../components/Scorecard";
import Graph from "../components/Graph";
import Dropdown from "../components/GranularityDropdown";
import TableComponent from "../components/CommisionsTable";

import { DateRangePicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "../css/sizing.css";

// Create a constant for commissions which can be exported onto the dashboard page holding components
function Commission() {

  // Initiate state for dates
  const [dates, setDates] = useState([
    new Date("2019/1/1"),
    new Date("2019/6/31")
  ]);
  // Initiate state for granularity
  const [granularity, setGran] = useState("week");

  // Return function returns the structure for the dashboard component, holding all other components.
  return (
    <Container fluid>
      {/* Scorecard row */}
      <Row>
        <Col className="resize" xs={12} sm={12} md={12} lg={12} xl={2}>
          {/* Data Manipulation components */}
          <Card outline color="secondary" style={{ height: "150px" }}>
            <CardTitle
              style={{
                paddingLeft: "10px",
                fontSize: "15px",
                color: "white",
                backgroundColor: "#001529"
              }}
              tag="h3"
            >
              Data Manipulation
            </CardTitle>
            <div className="pb-2">
              <DateRangePicker
                value={dates}
                style={{ paddingLeft: "10px" }}
                onChange={value => {
                  setDates([value[0], value[1]]);
                }}
              />
            </div>
            <div className="pb-2">
              <Dropdown
                style={{ paddingLeft: "10px" }}
                granularity={granularity}
                setGran={setGran}
              ></Dropdown>
            </div>
          </Card>
        </Col>

        {/* Agent Commission Count Scorecard */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard
            type="AgentCommsCount"
            dates={dates}
            granularity={granularity}
          />
        </Col>
        {/* Average Commission Value Scorecard */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard
            type="AvgCommValue"
            dates={dates}
            granularity={granularity}
          />
        </Col>
        {/* Agent Commission Percentage Scorecard */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard
            type="AvgCommPerc"
            dates={dates}
            granularity={granularity}
          />
        </Col>
        {/* Appraisals Won Scorecard */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard
            type="AppraisalsWon"
            dates={dates}
            granularity={granularity}
          />
        </Col>
        {/* Appraisals Value Scorecard */}
        <Col className="resize" xs={12} sm={12} md={12} lg={12} xl={2}>
          <Scorecard
            type="AppraisalsValue"
            dates={dates}
            granularity={granularity}
          />
        </Col>
      </Row>

      {/* Graph row */}
      <br />
      <Row>
        {/* Commissiosn Graph */}
        <Col sm="12">
          <Graph
            type="CommissionsGraph"
            dates={dates}
            granularity={granularity}
          />
        </Col>
      </Row>

      {/* Table row */}
      <br />
      <Row>
        <Col sm="12">
          <Card outline color="secondary">
            <CardTitle
              style={{
                fontSize: "15px",
                color: "white",
                backgroundColor: "#001529",
                paddingLeft: "10px"
              }}
              tag="h3"
            >
              Commissions Table
            </CardTitle>
            <TableComponent dates={dates}></TableComponent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Commission;
