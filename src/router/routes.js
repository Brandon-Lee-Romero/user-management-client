import UserPage from "../pages/UserPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import HomePage from "../pages//HomePage.vue";

const routes = [
  {
    path: "/users",
    component: UserPage,
    name: "users",
    meta: {
      auth: true,
    },
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/",
    component: HomePage,
    name: "home",
  },
  {
    path: "/:notFound(.*)",
    component: NotFoundErrorPage,
    name: "error.404",
  },
];

export default routes;
