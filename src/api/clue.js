import { http } from "@/utils/http";

export function getClueInfoApi(params) {
	return http.request({
		url: "/storm/agentapi/api/clue/getClueInfo",
		method: "get",
		params
	});
}

export function getClueStoreInfoApi(params) {
	return http.request({
		url: "/storm/agentapi/api/clue/store/getClueStoreInfo",
		method: "get",
		params
	});
}
export function getContactByClueApi(params) {
	return http.request({
		url: "/storm/agentapi/api/clue/getContactPhone",
		method: "get",
		params
	});
}
