import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes:RouteRecordRaw[]=[
    {
        path: "/",
        name: "Home",
        component: () => import("../pages/TrackerPage.vue"),
    },
    {
        path: "/paises",
        name: "Paises",
        component: () => import("../pages/CountryPage.vue"),
    },
    {
        path: "/por-fecha",
        name: "PorFecha",
        component: () => import("../pages/DatePage.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../pages/NotFound.vue"),
    },
    
]

const router=createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router