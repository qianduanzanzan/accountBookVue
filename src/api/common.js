import { http } from "@/utils/http";

export function verificationed(data) {
	return http.request({
		url: "/storm/agentapi/api/clue/merchant/validateSmsCode",
		method: "post",
		data
	});
}

export function sendSmsCode(data) {
	return http.request({
		url: "/storm/agentapi/api/clue/merchant/sendSmsCode",
		method: "post",
		data
	});
}

export function getOptionsApi(params) {
	return http.request({
		url: `/storm/agentapi/api/sys/dict/merchant/list/${params}`,
		method: "get"
	});
}

export function getCitysApi(queryStr){
	return http.request({
		url: `/storm/agentapi/api/common/region/city/getLevelsCitys?queryStr=${queryStr}&levels=4`,
		method: "get"
	});
}

export function getPositionByLocalApi(params){
	return http.request({
		url: `/storm/agentapi/api/common/getRegionId`,
		method: "get",
		params
	});
}
