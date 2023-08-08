import { createRouter, createWebHistory } from "vue-router";

import CoachDetails from "./components/coaches/CoachDetails.vue";
import CoachesList from "./components/coaches/CoachesList.vue";
import CoachRegister from "./components/coaches/CoachRegister.vue";
import RequestsList from "./components/requests/RequestsList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/coaches",
      name: "coaches",
      component: CoachesList,
    },
    {
      name: "coach",
      path: "/coaches/:coachId",
      component: CoachDetails,
      props: true,
    },
    {
      path: "/register",
      name: "register",
      component: CoachRegister,
    },
    {
      path: "/requests",
      name: "requests",
      component: RequestsList,
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/coaches",
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  }
});

export default router;
