import Axios from "axios";
import { showFailToast } from "vant";
import "vant/es/toast/style";

// 默认 axios 实例请求配置
const configDefault = {
	headers: {
		"Content-Type": "application/json;charset=UTF-8"
	},
	timeout: 60000,
	baseURL: '',
	data: {}
};

class Http {
	constructor(config) {
		Http.axiosConfigDefault = config;
		Http.axiosInstance = Axios.create(config);
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}
	// 当前实例
	static axiosInstance;
	// 请求配置
	static axiosConfigDefault;

	// 请求拦截
	httpInterceptorsRequest() {
		Http.axiosInstance.interceptors.request.use(
			config => {
				// 发送请求前，可在此携带 token
				// if (token) {
				//   config.headers['token'] = token
				// }
				return config;
			},
			error => {
				showFailToast(error.message);
				return Promise.reject(error);
			}
		);
	}

	// 响应拦截
	httpInterceptorsResponse() {
		Http.axiosInstance.interceptors.response.use(
			response => {
				const { status } = response;
				if (status === 200) {
					return response.data;
				} else {
					// 处理请求错误
					// showFailToast(message);
					console.log(msg);
					return Promise.reject(response);
				}
			},
			error => {
				let message = "";
				const status = error.response?.status;
				switch (status) {
					case 400:
						message = "请求错误";
						break;
					case 401:
						message = "未授权，请登录";
						break;
					case 403:
						message = "拒绝访问";
						break;
					case 404:
						message = `请求地址出错: ${error.response?.config?.url}`;
						break;
					case 408:
						message = "请求超时";
						break;
					case 500:
						message = "服务器内部错误";
						break;
					case 501:
						message = "服务未实现";
						break;
					case 502:
						message = "网关错误";
						break;
					case 503:
						message = "服务不可用";
						break;
					case 504:
						message = "网关超时";
						break;
					case 505:
						message = "HTTP版本不受支持";
						break;
					default:
						message = "网络连接故障";
				}

				showFailToast(message);
				return Promise.reject(error);
			}
		);
	}

	// 通用请求函数
	request(paramConfig) {
		const config = { ...Http.axiosConfigDefault, ...paramConfig };
		return new Promise((resolve, reject) => {
			Http.axiosInstance
				.request(config)
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	}
}

export const http = new Http(configDefault);
