import React from "react";
import { useState } from "react";

import { Container, Row, Col, Card, CardTitle } from "reactstrap";
import "rsuite/dist/styles/rsuite-default.css";
import { DateRangePicker } from "rsuite";

import TableComponent from "../components/ListingsTable";
import Dropdown from "../components/GranularityDropdown";
import Scorecard from "../components/Scorecard";
import Graph from "../components/Graph";
import "../css/sizing.css";

// Create a constant for listings which can be exported onto the dashboard page holding components
const Listings = () => {
  
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
      <Row className="justify-content-md-center">
        {/* Data Manipulation components */}
        <Col className="resize" xs={12} sm={12} md={12} lg={12} xl={2}>
          <Card outline color="secondary" style={{ height: "150px" }}>
            <CardTitle
              style={{
                paddingLeft: "10px",
                fontSize: "15px",
                color: "white",
                backgroundColor: "#001529",
              }}
              tag="h3"
            >
              Data Manipulation
            </CardTitle>

            <div className="pb-2">
              <DateRangePicker
                value={dates}
                style={{ paddingLeft: "10px" }}
                onChange={(value) => {
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
        {/* Current Listing Count Component */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard type="CurrentCount" dates={dates} id="count"></Scorecard>
        </Col>
        {/* Current Settled Count Component */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard type="SettledCount" dates={dates}></Scorecard>
        </Col>
        {/* Current Withdrawn Count Component */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard type="WithdrawnCount" dates={dates}></Scorecard>
        </Col>
        {/* Current Leased Count Component */}
        <Col className="resize" xs={12} sm={12} md={6} lg={6} xl={2}>
          <Scorecard type="LeasedCount" dates={dates}></Scorecard>
        </Col>
      </Row>

      {/* Graph row */}
      <br />
      <Row>
        {/* Settled Listings Graph */}
        <Col className="resize" xs={12} sm={12} md={12} lg={6}>
          <div>
            <Graph
              type="SettledGraph"
              dates={dates}
              granularity={granularity}
            />
          </div>
        </Col>
        {/* Published Listings Graph */}
        <Col className="resize" xs={12} sm={12} md={12} lg={6}>
          <Graph
            type="PublishedGraph"
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
                paddingLeft: "10px",
              }}
              tag="h3"
            >
              Listings Table
            </CardTitle>
            <TableComponent dates={dates}></TableComponent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Listings;
