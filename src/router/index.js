import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Login from "../views/Login";
import SignUp from "../views/SignUp";
import Profile from "../views/Profile";
import Users from "../views/Users/Index";
import User from "../views/Users/Show";
import Images from "../views/Images/Index";
import Image from "../views/Images/Show";
import Submit from "../views/Submit/Index";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      guest: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      guest: false
    }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      guest: false
    }
  },
  {
    path: "/users/:id",
    name: "User",
    component: User,
    meta: {
      guest: false
    }
  },
  {
    path: "/images",
    name: "Images",
    component: Images,
    meta: {
      guest: false
    }
  },
  {
    path: "/submit",
    name: "Submit",
    component: Submit,
    meta: {
      guest: false
    }
  },
  {
    path: "/images/:id",
    name: "Image",
    component: Image,
    meta: {
      guest: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => !record.meta.guest) &&
    !store.state.isLoggedIn
  ) {
    router.push("/login");
    next();
  } else {
    next();
  }
});

export default router;
