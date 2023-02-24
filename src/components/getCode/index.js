import React, { Component } from "react";
// API
import { GetCodeAPI } from "../../api/account";
// scss
import "./index.scss";
// antd
import { Button, message } from "antd";
// 验证
import { validate_email } from "../../utils/validate";
// 定时器
let timer = null;
// class 组件
class GetCode extends Component {
  constructor(props) {
    super(props); // 初始化默认值
    this.state = {
      username: props.username,
      button_text: "获取验证码",
      button_loading: false,
      button_disabled: false,
      module: props.module,
    };
  }
  // this.props.username 每次都会去获取
  componentWillReceiveProps({ username }) {
    this.setState({
      username, // 数据的变量和key是相同情况，只用一个就可以
    });
  }
  /** 销毁组件 */
  componentWillUnmount() {
    clearInterval(timer);
  }
  /**
   * 获取验证码
   */
  getCodeFn = () => {
    const username = this.state.username;
    if (!username) {
      message.warning("用户名不能为空！！", 1);
      return false;
    }
    if (!validate_email(username)) {
      message.warning("邮箱格式不正解", 1);
      return false;
    }
    this.setState({
      button_loading: true,
      button_text: "发送中",
    });
    const requestData = {
      username,
      module: this.state.module,
    };
    GetCodeAPI(requestData)
      .then((res) => {
        console.log(res);
        const resMsg = res.data.message;
        message.success(resMsg);
        // 执行倒计时
        this.countDown();
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          button_loading: false,
          button_text: "重新获取",
        });
      
      });
  };
  /**
   * 倒计时
   */
  countDown = () => {
    // 倒计时时间
    let sec = 60;
    // 修改状态
    this.setState({
      button_loading: false,
      button_disabled: true,
      button_text: `倒计时${sec}秒`,
    });
    timer = setInterval(() => {
      sec--;
      this.setState({
        button_text: `倒计时${sec}秒`,
      });
      if (sec <= 0) {
        this.setState({
          button_text: `重新获取`,
          button_disabled: false,
        });
        clearInterval(timer);
        return false;
      }
    }, 1000);
  };

  render() {
    return (
      <Button
        type="primary"
        disabled={this.state.button_disabled}
        loading={this.state.button_loading}
        block
        size="large"
        onClick={this.getCodeFn}
        className="code_button"
      >
        {this.state.button_text}
      </Button>
    );
  }
}

export default GetCode;
