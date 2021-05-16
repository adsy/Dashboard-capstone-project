import React, { useState } from "react";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, DollarOutlined } from "@ant-design/icons";

const { Sider } = Layout;

// Create Sidebar component to be added onto page
function SideBar() {

  // create inital state of the sidebar component
  const [isCollpased, setCollapse] = useState(true);

  return (
    <Sider
      onMouseEnter={() => setCollapse(false)}
      onMouseLeave={() => setCollapse(true)}
      width={160}
      length={100}
      className="site-layout-background"
      collapsible={true}
      defaultCollapsed={true}
      collapsed={isCollpased}
      theme="dark"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "94vh", borderRight: 0 }}
      >
        <Menu.Item key="5" icon={<HomeOutlined />}>
          <Link style={{ all: "unset" }} to="/listings">
            Listings
          </Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<DollarOutlined />}>
          <Link style={{ all: "unset" }} to="/commissions">
            Commissions
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
