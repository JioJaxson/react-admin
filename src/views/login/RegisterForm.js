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
import { validate_pass } from "../../utils/validate";
// 组件
import GetCode from "../../components/getCode/index";
// 加密
import CryptoJs from "crypto-js";
// API
import { RegisterAPI } from "../../api/account";
class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      code: "",
      module: "register",
    };
  }
  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: CryptoJs.MD5(this.state.password).toString(),
      code: this.state.code,
    };
    console.log(requestData);
    RegisterAPI(requestData)
      .then((res) => {
        console.log(res);
        const resMsg = res.data.message;
        const resCode = res.data.resCode;
        if (resCode === 0) {
          message.success(resMsg);
          this.toggleForm();
        } else {
          message.error(resMsg);
        }
      })
      .catch((err) => {
        const errMsg = err.data.message;
        message.error(errMsg);
        console.log(err);
      });
  };
  /** input输入处理 */
  inputChangeUsername = (e) => {
    let value = e.target.value;
    this.setState({
      username: value,
    });
  };
  inputChangePassword = (e) => {
    let value = e.target.value;
    this.setState({
      password: value,
    });
  };
  inputChangeCode = (e) => {
    let value = e.target.value;
    this.setState({
      code: value,
    });
  };

  toggleForm = () => {
    // 调父级的方法
    this.props.switchForm("login");
  };

  render() {
    const { username, module } = this.state;
    return (
      <div className="body">
        <div className="form_wrap c_white">
          <p className="pt_15 form_title">
            <span>最</span>
            <LinkedinOutlined />
            <span>管理后台</span>
          </p>
          <p className="pt_20 pb_15 fja_sb_c">
            <span className="fs_20  pl_30 ">注册</span>
            <Button type="link" className="pr_30 " onClick={this.toggleForm}>
              去登陆
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
                prefix={<UserOutlined />}
                onChange={this.inputChangeUsername}
                placeholder="用户邮箱"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                ({ getFieldValue }) => ({
                  validator(role, value) {
                    let passwords_value = getFieldValue("passwords"); // 获取再次输入密码的值
                    if (!validate_pass(value)) {
                      return Promise.reject("请输入大于6位小于20位数字+字母");
                    }
                    if (passwords_value && value !== passwords_value) {
                      return Promise.reject("两次密码不一致");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
                onChange={this.inputChangePassword}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[
                { required: true, message: "再次确认密码不能为空！！" },
                ({ getFieldValue }) => ({
                  validator(role, value) {
                    if (value !== getFieldValue("password")) {
                      return Promise.reject("两次密码不一致");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认密码"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入长度为6位的字符", len: 6 },
              ]}
            >
              <Row gutter={15}>
                <Col span={15}>
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="请输入验证码"
                    size="large"
                    onChange={this.inputChangeCode}
                  />
                </Col>
                <Col span={9}>
                  <GetCode username={username} module={module} />
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
                注册
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
