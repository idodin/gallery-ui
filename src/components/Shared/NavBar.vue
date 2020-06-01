<!-- TODO: Implement logout functionality + conditional sign up and login buttons -->
<template>
  <nav>
    <v-app-bar app class="background">
      <v-app-bar-nav-icon
        v-if="mobileView"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-btn icon router to="/" color="white" class="ml-3">
        <v-icon x-large>$vuetify.icons.shopify-logo</v-icon>
      </v-btn>

      <v-toolbar-title class="black--text">
        <span class="font-weight-light display-1">Shopify Application</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-if="!mobileView">
        <v-btn
          text
          tile
          router
          to="/"
          min-height="115%"
          class="offset-y primary--text"
          >home</v-btn
        >

        <v-btn
          text
          tile
          router
          to="/submit"
          min-height="115%"
          v-if="$store.state.isLoggedIn"
          class="offset-y primary--text"
          >submit</v-btn
        >

        <v-btn
          text
          tile
          router
          to="/users"
          min-height="115%"
          v-if="$store.state.isLoggedIn"
          class="offset-y primary--text"
          >users</v-btn
        >

        <v-btn
          text
          tile
          router
          to="/images"
          min-height="115%"
          v-if="$store.state.isLoggedIn"
          class="offset-y primary--text"
          >images</v-btn
        >

        <v-btn
          text
          tile
          router
          to="/login"
          min-height="115%"
          v-if="!$store.state.isLoggedIn"
          class="offset-y primary--text"
          >login</v-btn
        >

        <v-btn
          text
          tile
          router
          to="/signup"
          min-height="115%"
          v-if="!$store.state.isLoggedIn"
          class="offset-y primary--text"
          >register</v-btn
        >
      </template>
      <v-menu offset-y v-if="$store.state.isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
            min-height="115%"
            class="offset-y primary--text"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in profileDropdownItems"
            :key="index"
            class="ma-0 pa-0"
          >
            <v-btn router text block :to="item.link" class="primary--text">
              {{ item.title }}
            </v-btn>
          </v-list-item>
          <v-list-item class="ma-0 pa-0">
            <v-btn text block @click="logout()" class="primary--text"
              >Logout</v-btn
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense nav>
        <v-list-item-group active-class="offset-y primary--text">
          <v-list-item to="/">
            <v-list-item-title class="offset-y primary--text"
              >HOME</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="$store.state.isLoggedIn" to="/submit">
            <v-list-item-title class="offset-y primary--text"
              >SUBMIT</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="$store.state.isLoggedIn" to="/users">
            <v-list-item-title class="offset-y primary--text"
              >USERS</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="$store.state.isLoggedIn" to="/images">
            <v-list-item-title class="offset-y primary--text"
              >IMAGES</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="!$store.state.isLoggedIn" to="/login">
            <v-list-item-title class="offset-y primary--text"
              >LOGIN</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="!$store.state.isLoggedIn" to="/signup">
            <v-list-item-title class="offset-y primary--text"
              >REGISTER</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "NavBar",

  data() {
    return {
      drawer: false,
      profileDropdownItems: [
        {
          title: "profile",
          link: "/profile"
        }
      ]
    };
  },

  watch: {
    group() {
      this.drawer = false;
    }
  },

  computed: {
    mobileView() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    }
  }
};
</script>
