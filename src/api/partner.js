import { http } from "@/utils/http";

export function updateCluePartnerInfoApi(data) {
	return http.request({
		url: "/storm/agentapi/api/clue/updateCluePartnerInfo",
		method: "post",
		data
	});
}

export function updateCluePartnerSiteInfoApi(data) {
	return http.request({
		url: "/storm/agentapi/api/clue/store/updateStoreSiteInfo",
		method: "post",
		data
	});
}
