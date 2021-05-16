import React from "react";
import { Card, CardTitle, CardBody, CardText, CardHeader } from "reactstrap";
import { QueryRenderer } from "@cubejs-client/react";

// DashboardItem constant is created and exported so it can be used by all other components
const DashboardItem = ({ type, render }) => (
  <Card outline color="secondary" style={type.style}>
    <CardTitle
      style={{
        paddingLeft: "10px",
        fontSize: "15px",
        color: "white",
        backgroundColor: "#001529"
      }}
      tag="h3"
    >
      {type.title}
    </CardTitle>
    <CardBody>
      <CardText>
        <QueryRenderer
          query={type.query}
          render={({ resultSet }) => {
            if (!resultSet) {
              return <div className="loader" />;
            }
            return render(resultSet);
          }}
        />
      </CardText>
    </CardBody>
  </Card>
);

export default DashboardItem;
