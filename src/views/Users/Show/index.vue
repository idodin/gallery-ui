<template>
  <div class="userOverview">
    <v-container class="my-5" v-if="!user.username">
      <v-row align="center" class="mr-3">
        <v-col cols="12" sm="8">
          <h1 class="my-5 display-1 black--text text-uppercase">
            No User Found
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="my-5" v-if="user.username">
      <v-row align="center" class="mr-3">
        <v-col cols="12" sm="8">
          <h1 class="my-5 display-1 font-weight-light">
            <b>User:</b> {{ user.username }}
          </h1>
          <h2 class="my-5  font-weight-light">
            <b>Email:</b> {{ user.email }}
          </h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="8">
          <h1 class="my-5 display-1 font-weight-light">
            Images
            <v-btn
              text
              :loading="refreshLoading"
              @click="reloadImages()"
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
                <v-btn text small @click="sortBy('title', 'asc', 'string')"
                  >title</v-btn
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
          v-for="(user, index) in filteredImages"
          :key="index"
        >
          <image-card :data="user" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Image from "@/components/Images/Index/Image";
import { eventBus } from "vue";

export default {
  name: "Overview",

  components: {
    "image-card": Image
  },

  data() {
    return {
      user: {},
      images: [],
      search: "",
      refreshLoading: false
    };
  },

  async created() {
    const users = this.$store.state.users.filter(user => {
      return user.username === this.$route.params.id;
    });

    this.user = users && users.length > 0 ? users[0] : {};
    this.images = this.user
      ? this.$store.state.images.filter(image => {
          return image.username === this.$route.params.id;
        })
      : [];
  },

  methods: {
    async reloadImages() {
      this.refreshLoading = true;
      try {
        eventBus.$emit("REFRESH_IMAGES");
        eventBus.$on("REFRESH_IMAGES_SUCCESS", () => {
          this.images = this.$store.state.images;
        });
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
  },

  computed: {
    filteredImages() {
      return this.images.filter(image => {
        let tagSearch = false;
        for (const tag of image.tags) {
          if (tag.toLowerCase().includes(this.search)) tagSearch = true;
        }

        return (
          tagSearch ||
          image.title.toLowerCase().includes(this.search.toLowerCase()) ||
          image.description.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  }
};
</script>
