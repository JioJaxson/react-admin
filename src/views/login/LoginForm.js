import React, { Component } from "react";
// antd_icon
import {
  LinkedinOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
// antd
import { Button, Checkbox, Form, Input, Row, Col, message } from "antd";
// scss
import "./index.scss";
// svg
import github_icon from "../../static/imgs/github_icon.svg";
import weixin_icon from "../../static/imgs/weixin_icon.svg";
import bilibili_icon from "../../static/imgs/bilibili_icon.svg";
import qq_icon from "../../static/imgs/qq_icon.svg";
// validate
import { validate_password } from "../../utils/validate";
// API
import { LoginAPI, GetCodeAPI } from "../../api/account";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      code_button_loading: false,
      code_button_disabled: false,
      code_button_text: "获取验证码",
    };
  }
  // 登陆
  onFinish = (values) => {
    LoginAPI()
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Received values of form: ", values);
  };
  // 获取验证码
  getCodeFn = () => {
    if (!this.state.username) {
      message.warning("用户名不能为空!", 1);
      return false;
    }
    const requestData = {
      username: this.state.username,
      module: "login",
    };
    this.setState({
      code_button_loading: true,
      code_button_text: "发送中",
    });
    GetCodeAPI(requestData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.setState({
          code_button_loading: false,
          code_button_text: "重新获取",
        });
      });
    console.log(88888);
  };

  /** input输入处理 */
  inputChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({
      username: value,
    });
  };
  toggleForm = () => {
    // 调父级的方法
    this.props.switchForm("register");
  };

  render() {
    const {
      username,
      code_button_loading,
      code_button_disabled,
      code_button_text,
    } = this.state;

    return (
      <div className="body">
        <div className="form_wrap c_white">
          <p className="pt_15 form_title">
            <span>最</span>
            <LinkedinOutlined />
            <span>管理后台</span>
          </p>
          <p className="pt_20 pb_15 fja_sb_c">
            <span className="fs_20  pl_30 ">登陆</span>
            <Button type="link" className="pr_30 " onClick={this.toggleForm}>
              立即注册
            </Button>
          </p>

          <Form
            name="normal_login"
            className="login-form pl_30 pr_30"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
                {
                  type: "email",
                  message: "邮箱格式不正确!",
                },
              ]}
            >
              <Input
                value={username}
                onChange={this.inputChange}
                prefix={<UserOutlined />}
                placeholder="用户邮箱"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
                {
                  pattern: validate_password,
                  message: "请输入大于6位小于20位数字+字母!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码!" },
                {
                  len: 6,
                  message: "请输入6位数验证码!",
                },
              ]}
            >
              <Row gutter={15}>
                <Col span={15}>
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="验证码"
                    size="large"
                  />
                </Col>
                <Col span={9}>
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={this.getCodeFn}
                    disabled={code_button_disabled}
                    loading={code_button_loading}
                  >
                    {code_button_text}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item className="fja_sb_c">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="c_white">记住密码</Checkbox>
              </Form.Item>

              <Button type="link" className="pr_20 ">
                忘记密码?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="button_w_100"
                size="large"
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
          <div className="other_login">
            <p>其他登陆方式</p>
            <div>
              <img src={qq_icon} alt=""></img>
              <img src={weixin_icon} alt=""></img>
              <img src={github_icon} alt=""></img>
              <img src={bilibili_icon} alt=""></img>

              {/* <img
                src={require("../../static/imgs/weixin_qs.jpg")}
                alt=""
              ></img> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
