/**
 * 账户类
 */
 import service from "../../src/utils/request";

/**
 * 登陆接口
 */
export function LoginAPI(data) {
  return service.request({
    url: "/login/",
    method: "POST",
    data,
  });
}
