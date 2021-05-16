import React, { useState, useContext, useCallback } from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { AuthContext } from "../App";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

function HeaderItem(state) {
  const { dispatch } = useContext(AuthContext);
  return (
    <Header className="header">
      <Row justify="space-between">
        <Col span={2}>
          <img className="dashboard-logo" src="/rex-icon.svg" alt="image" />
        </Col>
        <Col span={2} offset={12}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item icon={<UserOutlined />} key="login">
              <Link
                to="/logout"
                style={{ all: "unset" }}
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
}

export default HeaderItem;
