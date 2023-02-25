import React, { Component, Fragment } from "react";
//css
import "./aside.scss";
// icons
import { LinkedinOutlined } from "@ant-design/icons";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <h1 className="logo">
          <span>最 <LinkedinOutlined />管理后台</span>
        </h1>
      </Fragment>
    );
  }
}

export default Index;
