import React, { Component } from "react";
// antd_icon
import {
  LinkedinOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
// antd
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
// scss
import "./index.scss";
// svg
import github_icon from "../../static/imgs/github_icon.svg";
import weixin_icon from "../../static/imgs/weixin_icon.svg";
import bilibili_icon from "../../static/imgs/bilibili_icon.svg";
import qq_icon from "../../static/imgs/qq_icon.svg";
// 组件

class RigisterForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  toggleForm = () => {
    // 调父级的方法
    this.props.switchForm("login");
  };
  render() {
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
            onFinish={() => this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input
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
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入确认密码!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="确认密码"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[{ required: true, message: "请输入验证码!" }]}
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
                  <Button type="primary" size="large" block>
                    获取验证码
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

export default RigisterForm;
