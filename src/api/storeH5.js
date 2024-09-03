import { http } from "@/utils/http";

export function getBannerProdsApi(data) {
	return http.request({
		url: "/storm/agentapi/api/banner/products",
		method: "post",
		data
	});
}