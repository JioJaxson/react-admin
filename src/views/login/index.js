import React, { Component } from "react";

// scss
import "./index.scss";

// 组件
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formType: "login",
    };
  }
  switchForm = (value) => {
    this.setState({
      formType: value,
    });
  };
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };



  render() {
    return (
      <div className="body">
        <div>
          {this.state.formType === "login" ? (
            <LoginForm switchForm={this.switchForm}></LoginForm>
          ) : (
            <RegisterForm switchForm={this.switchForm}></RegisterForm>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
