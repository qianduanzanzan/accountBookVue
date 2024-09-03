import { http } from "@/utils/http";

export function getProductDetailApi(data) {
	return http.request({
		url: "/storm/agentapi/api/vacation/product/detail",
		method: "post",
		data
	});
}

export function getNavigableCityListApi(data) {
	return http.request({
		url: "/storm/agentapi/api/vacation/product/navigable/city/list",
		method: "post",
		data
	});
}

export function getPriceCalendarApi(data) {
	return http.request({
		url: "/storm/agentapi/api/vacation/product/calendar/list",
		method: "post",
		data
	});
}

export function getNearStoreApi(data) {
	return http.request({
		url: "/storm/agentapi/api/store/near/list",
		method: "post",
		data
	});
}

export function getProductTripsApi(data) {
	return http.request({
		url: "/storm/agentapi/api/vacation/product/trip",
		method: "post",
		data
	});
}

export function getProductExplainApi(data) {
	return http.request({
		url: "/storm/agentapi/api/vacation/product/explain",
		method: "post",
		data
	});
}

export function submitIntentionApi(data) {
	return http.request({
		url: "/storm/agentapi/api/store/add/intention",
		method: "post",
		data
	});
}
