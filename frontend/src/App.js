import React from "react";
import { Layout } from "antd";
import AccountTable from "./components/AccountTable";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./App.css"; // Your custom styles

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <h1 style={{ color: "white" }}>Spring Bank</h1>
      </Header>
      <Content style={{ padding: "50px" }}>
        <AccountTable />
      </Content>
    </Layout>
  );
}

export default App;
