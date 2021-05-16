import React from "react";
import "antd/dist/antd.css";
import { QueryRenderer } from "@cubejs-client/react";
import { Table } from "rsuite";
import { Spin } from "antd";

const { Column, HeaderCell, Cell } = Table;

// RenderChart function - provided by CubeJS. Used to help pivot data set to be displayed in a table.
const renderChart = (Component, pivotConfig) => ({ resultSet, error }) =>
  (resultSet && (
    <Component resultSet={resultSet} pivotConfig={pivotConfig} />
  )) ||
  (error && error.toString()) || <Spin />;

// Setup tableRender constant which takes in resultSet and pivotConfig and returns the Table structure and columns.
const tableRender = ({ resultSet, pivotConfig }) => (
  <Table
    height={window.innerHeight * 0.35}
    columns={resultSet.tableColumns(pivotConfig)}
    data={resultSet.tablePivot(pivotConfig)}
  >
    <Column flexGrow={70} align="center" fixed>
      <HeaderCell>Date Created</HeaderCell>
      <Cell dataKey="Listings.dateFormatted" />
    </Column>
    <Column flexGrow={70} align="center" fixed>
      <HeaderCell>Sale or Lease Price</HeaderCell>
      <Cell dataKey="Listings.Sale_Price" />
    </Column>
    <Column flexGrow={70} align="center" fixed>
      <HeaderCell>Current Listing State</HeaderCell>
      <Cell dataKey="Listings.systemListingState" />
    </Column>
    <Column flexGrow={70} align="center" fixed>
      <HeaderCell>Commission Value</HeaderCell>
      <Cell dataKey="Listings.commNetTax" />
    </Column>
  </Table>
);

// TableComponent - component contains the QueryRenderer which sends the query to the DB and returns the dataset.
const TableComponent = ({ dates }) => {
  return (
    <QueryRenderer
      query={{
        measures: [],
        timeDimensions: [
          {
            dimension: "Listings.systemCtime",
            dateRange: [dates[0], dates[1]],
            granularity: "day"
          }
        ],
        order: {
          "Listings.systemCtime": "desc"
        },
        filters: [],
        dimensions: [
          "Listings.dateFormatted",
          "Listings.Sale_Price",
          "Listings.systemListingState",
          "Listings.commNetTax"
        ]
      }}
      render={renderChart(tableRender, {
        x: [
          "Listings.dateFormatted",
          "Listings.Sale_Price",
          "Listings.systemListingState",
          "Listings.commNetTax"
        ],
        y: [],
        fillMissingDates: true
      })}
    />
  );
};
export default TableComponent;
