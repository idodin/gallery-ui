<template>
  <v-app>
    <app-navbar />
    <v-content class="ma-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { api } from "@/gateways/gallery-api";
import { eventBus } from "@/store/eventBus";
import Navbar from "@/components/Shared/NavBar";

export default {
  name: "App",

  components: {
    "app-navbar": Navbar
  },

  async created() {
    if (this.$store.state.token) {
      await Promise.all([this.getUsers(), this.getUserData()]);
      await this.getImages();
      eventBus.$emit("GLOBAL_DATA_FETCH_SUCCESS");
    }

    eventBus.$on("LOGIN_SUCCESS", async () => {
      await Promise.all([this.getUsers(), this.getImages()]);
      eventBus.$emit("GLOBAL_DATA_FETCH_SUCCESS");
    });

    eventBus.$on("REFRESH_USERS", async () => {
      await this.getUsers();
      eventBus.$emit("REFRESH_USERS_SUCCESS");
    });

    eventBus.$on("REFRESH_IMAGES", async () => {
      await this.getUsers();
      await this.getImages();
      eventBus.$emit("REFRESH_IMAGES_SUCCESS");
    });
  },

  methods: {
    async getUsers() {
      const { data } = await api.get("/users", {
        headers: {
          Authorization: this.$store.state.token
        }
      });

      this.$store.dispatch("setUsers", data);
    },

    async getImages() {
      await this.getUsers();
      const { data } = await api.get("/images", {
        headers: {
          Authorization: this.$store.state.token
        }
      });

      for (let image of data) {
        let author = this.$store.state.users.find(
          user => user._id === image.author
        );
        image.username = author.username;
      }

      this.$store.dispatch("setImages", data);
    },

    async getUserData() {
      const { data } = await api.get(
        `/users/${this.$store.state.user.username}`,
        {
          headers: {
            Authorization: this.$store.state.token
          }
        }
      );

      this.$store.dispatch("setUser", data);
    }
  }
};
</script>
