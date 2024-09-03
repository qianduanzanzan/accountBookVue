import Layout from "@/layout/index.vue";

const routes = [
	{
		path: "/",
		name: "root",
		component: Layout,
		redirect: { name: "homePage" },
		children: [
			{
				path: "homePage",
				name: "homePage",
				redirect: { name: "details" },
				component: () => import(/* webpackChunkName: "homePage" */ "@/views/homePage/index.vue"),
				children: [
					{
						path: "details",
						name: "details",
						component: () => import(/* webpackChunkName: "details" */ "@/views/details/index.vue"),
						meta: {
							title: "明细"
						}
					},
					{
						path: "chart",
						name: "chart",
						component: () => import(/* webpackChunkName: "chart" */ "@/views/chart/index.vue"),
						meta: {
							title: "图表"
						}
					},
					{
						path: "current",
						name: "current",
						component: () => import(/* webpackChunkName: "current" */ "@/views/current/index.vue"),
						meta: {
							title: "本月"
						}
					},
					{
						path: "mine",
						name: "mine",
						component: () => import(/* webpackChunkName: "mine" */ "@/views/mine/index.vue"),
						meta: {
							title: "我的"
						}
					}
				]
			}
		]
	}
];

export default routes;
