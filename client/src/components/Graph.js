import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import "rsuite/dist/styles/rsuite-default.css";
import numeral from "numeral";
import DashboardItem from "./DashboardItem";
import moment from "moment";

// Functions to display the data on the graph x/y axis
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatterMonth = item => moment(item).format("MMM");
const dateFormatterYear = item => moment(item).format("YYYY");
const dateFormatterMonthDay = item => moment(item).format("DD MMM");

// Functions to display the data on the graph with tooltip
const dateFormatterMonthDayText = item => moment(item).format("DD MMM YY");
const dateFormatterMonthText = item => moment(item).format("MMM YYYY");
const dateFormatterYearText = item => moment(item).format("YYYY");

// Function to handle how date is displayed on top of graph
const HandleDateFormat = date => {
  let formatted_date =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  return formatted_date;
};

// Switch function takes in a type and returns a graph type object to pass to DashboardItem.
function GraphType(type, dates, granularity) {
  switch (type) {
    case "SettledGraph":
      return {
        precision: 0,
        className: "col-6",
        labelStyle: {
          paddingLeft: "auto",
          color: "black",
          fontSize: "18px",
          width: "100%"
        },
        itemStyle: {
          backgroundColor: "white",
          color: "black",
          width: "100%"
        },
        style: { width: "100%" },
        title: `Listings settled during ${HandleDateFormat(
          dates[0]
        )} - ${HandleDateFormat(
          dates[1]
        )} - (${granularity} by ${granularity}) `,
        dataKey: "Listings.count",
        name: "Listings",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              granularity: granularity,
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Listings.dateActualSettlement",
              operator: "set"
            }
          ]
        }
      };
    case "PublishedGraph":
      return {
        precision: 0,
        style: { width: "100%" },
        labelStyle: {
          paddingLeft: "auto",
          color: "black",
          fontSize: "18px",
          width: "100%"
        },
        itemStyle: {
          backgroundColor: "white",
          color: "black",
          width: "100%"
        },
        title: `Listings published during ${HandleDateFormat(
          dates[0]
        )} - ${HandleDateFormat(
          dates[1]
        )} - (${granularity} by ${granularity}) `,
        dataKey: "Listings.count",
        name: "Listings",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              granularity: granularity,
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Listings.systemPublicationTime",
              operator: "set"
            }
          ]
        }
      };
    case "CommissionsGraph":
      return {
        precision: 0,
        style: { width: "100%" },
        labelStyle: {
          paddingLeft: "auto",
          color: "black",
          fontSize: "18px",
          width: "100%"
        },
        itemStyle: {
          backgroundColor: "white",
          color: "black",
          width: "100%"
        },
        title: `Commission Payable during 
        ${HandleDateFormat(dates[0])} - ${HandleDateFormat(
          dates[1]
        )} - (${granularity} by ${granularity}) `,
        dataKey: "Commission.sum",
        name: "Commission",
        query: {
          measures: ["Commission.sum"],
          timeDimensions: [
            {
              dimension: "Commission.dateActualSettlement",
              granularity: granularity,
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: `Commission.commission`,
              operator: `set`
            }
          ]
        }
      };
  }
}

// Graph function takes in the type, date and granularity which is then passed into the 
// DashboardItem component within the return funciton.
function Graph({ type, dates, granularity }) {
  let graphType = GraphType(type, dates, granularity);
  return (
    <DashboardItem
      type={graphType}
      render={resultSet => (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resultSet.chartPivot()}>
            <XAxis
              dataKey="category"
              tickFormatter={
                (granularity === "month" && dateFormatterMonth) ||
                (granularity === "year" && dateFormatterYear) ||
                (granularity !== ("month" || "year") && dateFormatterMonthDay)
              }
            />
            <YAxis tickFormatter={numberFormatter} />
            <Tooltip
              labelStyle={graphType.labelStyle}
              itemStyle={graphType.itemStyle}
              labelFormatter={
                (granularity === "month" && dateFormatterMonthText) ||
                (granularity === "year" && dateFormatterYearText) ||
                (granularity !== ("month" || "year") &&
                  dateFormatterMonthDayText)
              }
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              type="monotone"
              dataKey={graphType.dataKey}
              name={graphType.name}
              stroke="rgb(105,105,105)"
              fill="rgba(000, 120, 255, .16)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    />
  );
}

export default Graph;
