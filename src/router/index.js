import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useCachedViewStore } from "@/store/modules/cachedView";
import setPageTitle from "@/utils/set-page-title";

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	if(!to.meta.noCache){
		useCachedViewStore().addCachedView(to);
	}
	setPageTitle(to.meta.title);
	next();
});

router.afterEach(() => {
});

export default router;
