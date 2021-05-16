import React from "react";
import DashboardItem from "./DashboardItem";
import numeral from "numeral";
import { Statistic } from "antd";

const numberFormatter = item => numeral(item).format("0,0.00");


// setup scorecard types that are called from the pages
function ScorecardType(type, dates) {
  switch (type) {
    case "CurrentCount":
      return {
        precision: 0,
        style: { width: "100%", height: "150px" },
        title: "Current Count",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Listings.systemListingState",
              operator: "equals",
              values: ["current"]
            }
          ]
        }
      };
    case "SettledCount":
      return {
        precision: 0,
        style: { width: "100%", height: "150px" },
        title: "Settled Count",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: `Listings.dateActualSettlement`,
              operator: `set`
            }
          ]
        }
      };
    case "WithdrawnCount":
      return {
        precision: 0,
        style: { width: "100%", height: "150px" },
        title: "Withdrawn Count",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Listings.systemListingState",
              operator: "equals",
              values: ["withdrawn"]
            }
          ]
        }
      };
    case "LeasedCount":
      return {
        precision: 0,
        style: { width: "100%", height: "150px" },
        title: "Leased Count",
        query: {
          measures: ["Listings.count"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Listings.systemListingState",
              operator: "equals",
              values: ["leased"]
            }
          ]
        }
      };
    case "AgentCommsCount":
      return {
        precision: 2,
        style: { width: "100%", height: "150px" },
        title: "Agent Comms Payable",
        prefix: "$",
        query: {
          measures: ["Commission.sum"],
          timeDimensions: [
            {
              dimension: "Commission.dateActualSettlement",
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
    case "AvgCommValue":
      return {
        precision: 2,
        style: { width: "100%", height: "150px" },
        title: "Avg Commission Value",
        prefix: "$",
        query: {
          measures: ["Listings.avg"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: `Listings.commNetTax`,
              operator: `set`
            }
          ]
        }
      };
    case "AvgCommPerc":
      return {
        precision: 2,
        style: { width: "100%", height: "150px" },
        title: "Avg Commission %",
        suffix: "%",
        query: {
          measures: ["Listings.avgCommPercentage"],
          timeDimensions: [
            {
              dimension: "Listings.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: `Listings.commNetTax`,
              operator: `set`
            }
          ]
        }
      };
    case "AppraisalsWon":
      return {
        precision: 0,
        style: { width: "100%", height: "150px" },
        title: "Appraisals Won",
        query: {
          measures: ["Appraisals.count"],
          timeDimensions: [
            {
              dimension: "Appraisals.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ],
          filters: [
            {
              dimension: "Appraisals.archiveReasonId",
              operator: "equals",
              values: ["won"]
            }
          ]
        }
      };
    case "AppraisalsValue":
     return {
        precision: 2,
        style: { width: "100%", height: "150px" },
        prefix: "$",
        title: "Avg Appraisal Value",
        query: {
          measures: ["Appraisals.PriceAvg"],
          timeDimensions: [
            {
              dimension: "Appraisals.systemCtime",
              dateRange: [dates[0], dates[1]]
            }
          ]
        }
      }; 
  }
}

function Scorecard({ type, dates }) {
  let scorecardType = ScorecardType(type, dates);
  // we call dashboard component to get info from cube and return this to the above page
  return (
    <DashboardItem
      type={scorecardType}
      render={resultSet => (
        <Statistic
          value={numberFormatter(
            resultSet.chartPivot()[0][scorecardType.query.measures]
          )}
          precision={scorecardType.precision}
          suffix={scorecardType.suffix}
          prefix={scorecardType.prefix}
          valueStyle={{
            fontSize: "24px",
            paddingBottom: "-10px"
          }}
        />
      )}
    />
  );
}

export default Scorecard;
