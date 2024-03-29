<template>
  <div class="Users">
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="8">
          <h1 class="my-5 display-1 font-weight-light">
            Users
            <v-btn
              text
              :loading="refreshLoading"
              @click="reloadUsers()"
              class="primary--text mb-2"
            >
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </h1>
        </v-col>

        <v-col cols="0" sm="1"></v-col>

        <v-col cols="12" sm="2">
          <v-text-field
            name="search"
            label="Search"
            v-model="search"
            prepend-icon="mdi-magnify"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="1" class="text-right">
          <v-menu offset-y v-if="$store.state.isLoggedIn">
            <template v-slot:activator="{ on }">
              <v-btn
                small
                v-on="on"
                depressed
                class="incomplete white--text mt-5 mr-3"
              >
                sort
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn text small @click="sortBy('username', 'asc', 'string')"
                  >username</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn text small @click="sortBy('createdAt', 'des', 'date')"
                  >newest</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn text small @click="sortBy('createdAt', 'asc', 'date')"
                  >oldest</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(user, index) in filteredUsers"
          :key="index"
        >
          <user :data="user" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { api } from "@/gateways/gallery-api";
import { eventBus } from "@/store/eventBus";
import User from "@/components/Users/Index/User";

export default {
  name: "Users",

  components: {
    user: User
  },

  data() {
    return {
      users: this.$store.state.users,
      search: "",
      refreshLoading: false
    };
  },

  created() {
    eventBus.$on("REFRESH_USERS_SUCCESS", () => {
      this.users = this.$store.state.users;
    });
  },

  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        return (
          user.username.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },

  methods: {
    async reloadUsers() {
      this.refreshLoading = true;
      try {
        const { data } = await api.get("/users", {
          headers: {
            Authorization: this.$store.state.token
          }
        });

        this.users = data;
        this.$store.dispatch("setUsers", data);
      } catch (err) {
        console.log(err);
      } finally {
        this.refreshLoading = false;
      }
    },

    sortBy(prop, order, type) {
      switch (order) {
        case "asc":
          this.users.sort((a, b) =>
            this.parseSortType(a[prop], type) <
            this.parseSortType(b[prop], type)
              ? -1
              : 1
          );
          break;
        case "des":
          this.users.sort((a, b) =>
            this.parseSortType(a[prop], type) >
            this.parseSortType(b[prop], type)
              ? -1
              : 1
          );
          break;
        default:
          this.users.sort((a, b) =>
            this.parseSortType(a[prop], type) <
            this.parseSortType(b[prop], type)
              ? -1
              : 1
          );
      }
    },

    parseSortType(prop, type) {
      switch (type) {
        case "string":
          return prop.toUpperCase();
        case "date":
          return new Date(prop);
        default:
          return prop;
      }
    }
  }
};
</script>
