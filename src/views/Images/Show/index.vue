<template>
  <div class="imageOverview">
    <v-container class="my-5" v-if="!image.title">
      <v-row align="center" class="mr-3">
        <v-col cols="12" sm="8">
          <h1 class="my-5 display-1 black--text text-uppercase">
            No Image Found
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="my-5" v-if="image.title">
      <v-card class="pa-2">
        <v-row>
          <v-col align="center" cols="12" sm="12">
            <h1 class="my-5 display-1 font-weight-light">
              <b>Title:</b> {{ image.title }} <span style="color: red" v-if="!image.isPublic">(Private)</span>
            </h1>
            <h2 class="my-5  font-weight-light">
              <b>Description:</b> {{ image.description }} <br />
              <b>By:</b> {{ user.username }}
            </h2>
            <img style="max-height: 400px" :src="image.link" />
          </v-col>
        </v-row>
        <v-row :v-if="image.tags.length > 0">
          <v-col align="center" cols="12" sm="12">
            <v-chip
              label
              v-for="(tag, index) in image.tags.filter(
                tag => tag.trim().length > 0
              )"
              :key="index"
            >
              {{ tag }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container> </v-container>
  </div>
</template>

<script>
export default {
  name: "ImageOverview",

  data() {
    return {
      image: {},
      user: {},
      search: "",
      refreshLoading: false
    };
  },

  created() {
    const images = this.$store.state.images.filter(image => {
      return image._id === this.$route.params.id;
    });

    this.image = images && images.length > 0 ? images[0] : {};

    const users = this.$store.state.users.filter(user => {
      return user._id === this.image.author;
    });
    this.user = users && users.length > 0 ? users[0] : {};
  }
};
</script>
